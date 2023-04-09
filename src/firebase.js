// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqm-5Xrb1M0JXib-vXMurVhAePgN0c3qI",
  authDomain: "react-study-5a117.firebaseapp.com",
  databaseURL: "https://react-study-5a117-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-study-5a117",
  storageBucket: "react-study-5a117.appspot.com",
  messagingSenderId: "160247684877",
  appId: "1:160247684877:web:2f1a57f4138f17c53c9a44"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
export const databaseRef = getDatabase(db);