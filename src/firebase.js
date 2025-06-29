import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyABmJ-PSHhOlWDfV1D3hEDsDZIUPhLx_ow",
  authDomain: "golffleetapp.firebaseapp.com",
  projectId: "golffleetapp",
  storageBucket: "golffleetapp.appspot.com",
  messagingSenderId: "989120491177",
  appId: "1:989120491177:web:2db8e4536bdee184ccc3b8",
  measurementId: "G-HDM978REQH",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
