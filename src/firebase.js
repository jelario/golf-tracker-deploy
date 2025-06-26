import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABmJ-PSHhOlWDfV1D3hEDsDZIUPhLx_ow",
  authDomain: "golffleetapp.firebaseapp.com",
  projectId: "golffleetapp",
  storageBucket: "golffleetapp.firebasestorage.app",
  messagingSenderId: "989120491177",
  appId: "1:989120491177:web:2db8e4536bdee184ccc3b8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
