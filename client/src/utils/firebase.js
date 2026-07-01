
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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }