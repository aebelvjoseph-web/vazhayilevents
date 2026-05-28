import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPYKLP4HLzPIJdbrTHtc1QtwmrBSOt2Mw",
  authDomain: "events-and-decoration.firebaseapp.com",
  projectId: "events-and-decoration",
  storageBucket: "events-and-decoration.firebasestorage.app",
  messagingSenderId: "141268093656",
  appId: "1:141268093656:web:3217f8d6af9a7007ab65ad",
  measurementId: "G-FY6N2Y13ZD"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
