import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { clientName, phoneNumber, eventType, eventDate, additionalDetails } = payload;

    if (!clientName || !phoneNumber || !eventType || !eventDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to Firebase Firestore collection "submissions" (Catching permission errors)
    let docId = "local-" + Math.random().toString(36).substr(2, 9);
    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        clientName,
        phoneNumber,
        eventType,
        eventDate: new Date(eventDate).toISOString(),
        additionalDetails: additionalDetails || "",
        createdAt: new Date().toISOString(),
      });
      docId = docRef.id;
    } catch (fbError) {
      console.warn("Firebase Firestore save skipped (likely permissions):", fbError);
    }

    // 1.5 Write to local JSON database fallback
    try {
      const dataFilePath = path.join(process.cwd(), 'src/data/submissions.json');
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
      
      let localList = [];
      try {
        const fileContent = await fs.readFile(dataFilePath, 'utf8');
        localList = JSON.parse(fileContent);
      } catch (e) {}

      const newEntry = {
        id: docId,
        clientName,
        phoneNumber,
        eventType,
        eventDate: new Date(eventDate).toISOString(),
        additionalDetails: additionalDetails || "",
        createdAt: new Date().toISOString()
      };

      localList.unshift(newEntry);
      await fs.writeFile(dataFilePath, JSON.stringify(localList, null, 2), 'utf8');
    } catch (localError) {
      console.error("Local database save failed:", localError);
    }

    // 2. Forward to Google Sheets Webhook
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const sheetPayload = {
          "CLIENT NAME": clientName,
          "PHONE NUMBER": phoneNumber,
          "EVENT TYPE": eventType,
          "EVENT DATE": eventDate,
          "ADDITIONAL DETAILS": additionalDetails || "",
          // extra keys for compatibility
          clientName, phoneNumber, eventType, eventDate,
          additionalDetails: additionalDetails || "",
          name: clientName,
          phone: phoneNumber,
          date: eventDate,
          message: additionalDetails || "",
        };
        console.log("Sending to webhook:", webhookUrl);
        const sheetRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
        });
        const sheetText = await sheetRes.text();
        console.log("Webhook response:", sheetRes.status, sheetText);
      } catch (wsError) {
        console.error("Google Sheets forwarding failed:", wsError);
      }
    } else {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL is not set in environment variables");
    }

    // 3. Send Email notification via Nodemailer (Optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Vazhayil Events Booking" <${process.env.EMAIL_USER}>`,
          to: "vazhayiluniqueevents@gmail.com",
          subject: `New Event Booking: ${eventType} - ${clientName}`,
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Client Name:</strong> ${clientName}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Event Date:</strong> ${eventDate}</p>
            <br/>
            <h3>Additional Details:</h3>
            <p>${additionalDetails || "None provided"}</p>
          `,
        };
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.warn("Nodemailer email notification failed:", emailError);
      }
    }

    return NextResponse.json({ success: true, id: docId, email: "vazhayiluniqueevents@gmail.com" }, { status: 201 });
  } catch (err) {
    console.error('Error in submission endpoint:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
