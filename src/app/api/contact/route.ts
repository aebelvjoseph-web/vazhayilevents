import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, eventType, date, message } = body;

    if (!name || !phone || !eventType || !date || !message) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // 1. Save inquiry to Firestore collection "contacts" (if firebase is configured)
    let docId = "email-only";
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        phone,
        eventType,
        date: new Date(date).toISOString(),
        message,
        createdAt: new Date().toISOString(),
      });
      docId = docRef.id;
    } catch (fbError) {
      console.warn("Firebase save skipped/failed. Proceeding with email.", fbError);
    }

    // 1.5 Forward to Google Sheets Webhook for dual redundancy
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Columns matching exact headers from user's sheet image
            "DATA SUBMITTED": timestamp,
            "CLIENT NAME": name,
            "PHONE NUMBER": phone,
            "EVENT TYPE": eventType,
            "EVENT DATE": date,
            "ADDITIONAL DETAILS": message,
            
            // Backwards compatibility key variations
            dataSubmitted: timestamp,
            createdAt: timestamp,
            clientName: name,
            phoneNumber: phone,
            eventDate: date,
            additionalDetails: message,
            name,
            phone,
            date,
            message
          }),
        });
      } catch (wsError) {
        console.warn("Google Sheets contact forwarding failed:", wsError);
      }
    }

    // 2. Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g. your gmail address
        pass: process.env.EMAIL_PASS, // e.g. your gmail app password
      },
    });

    const mailOptions = {
      from: `"Vazhayil Events Website" <${process.env.EMAIL_USER}>`,
      to: "vazhayiluniqueevents@gmail.com",
      subject: `New Event Inquiry: ${eventType} from ${name}`,
      html: `
        <h2>New Inquiry from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${date}</p>
        <br/>
        <h3>Message/Details:</h3>
        <p>${message}</p>
      `,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
    } else {
        console.warn("Email credentials missing. Please set EMAIL_USER and EMAIL_PASS in .env.local");
    }

    return NextResponse.json(
      { success: true, id: docId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
