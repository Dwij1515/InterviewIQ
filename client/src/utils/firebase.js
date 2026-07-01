
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-1515.firebaseapp.com",
  projectId: "interviewiq-1515",
  storageBucket: "interviewiq-1515.firebasestorage.app",
  messagingSenderId: "191934950632",
  appId: "1:191934950632:web:8b2f297c6ed42c4159ad5d"
};

let app;
let auth;
let provider;

try {
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase API Key is missing. Please configure VITE_FIREBASE_APIKEY in your environment variables.");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth, provider }