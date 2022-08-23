// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5drbCr9kKd0r0z_QC9tXM8sB71Q5FPKk",
  authDomain: "profile-picture-f29a8.firebaseapp.com",
  projectId: "profile-picture-f29a8",
  storageBucket: "profile-picture-f29a8.appspot.com",
  messagingSenderId: "287977253805",
  appId: "1:287977253805:web:4619029bfd4cabdce9cf24",
  measurementId: "G-WD54LLEP6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)