// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB1nztUmrUQuI4uALXrVRITD1WQsxkrjo",
  authDomain: "authtication-dc3c9.firebaseapp.com",
  projectId: "authtication-dc3c9",
  storageBucket: "authtication-dc3c9.firebasestorage.app",
  messagingSenderId: "566161001691",
  appId: "1:566161001691:web:54d479c64252afa54350fe",
  measurementId: "G-8BMVB9PQWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;