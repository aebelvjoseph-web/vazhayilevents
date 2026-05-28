import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), 'src/data/submissions.json');

async function readLocalSubmissions() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    return [];
  }
}

async function deleteLocalSubmission(id: string) {
  try {
    const list = await readLocalSubmissions();
    const filtered = list.filter((sub: any) => sub.id !== id);
    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2), 'utf8');
  } catch (err) {
    console.error("Local delete failed:", err);
  }
}

export async function GET() {
  try {
    // 1. Try Firebase Firestore
    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const submissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(submissions, { status: 200 });
  } catch (error: any) {
    console.warn("Firestore fetch failed, falling back to local database:", error.message || error);
    
    // 2. Fallback to Local JSON Database
    const localData = await readLocalSubmissions();
    return NextResponse.json(localData, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
  }

  try {
    // Try deleting from Firestore
    const docRef = doc(db, "submissions", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn("Firestore delete failed, trying local delete:", error);
  }

  // Always ensure it is deleted from the local database fallback too
  await deleteLocalSubmission(id);

  return NextResponse.json({ success: true, message: "Submission deleted successfully" }, { status: 200 });
}
