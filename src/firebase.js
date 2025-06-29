import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyABmJ-PSHhOlWDfV1D3hEDsDZIUPhLx_ow",
  authDomain: "golffleetapp.firebaseapp.com",
  projectId: "golffleetapp",
  storageBucket: "golffleetapp.appspot.com",
  messagingSenderId: "989120491177",
  appId: "1:989120491177:web:2db8e4536bdee184ccc3b8",
  measurementId: "G-HDM978REQH",
  databaseURL: "https://golffleetapp-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
