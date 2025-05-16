// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7xfBOwCOo17UsukT9lmnF3U1vf2vmWKw",
    authDomain: "vima-shoes.firebaseapp.com",
    projectId: "vima-shoes",
    storageBucket: "vima-shoes.appspot.com",
    messagingSenderId: "448456104122",
    appId: "1:448456104122:web:5165e26b72e9f3bb6a4a83",
    measurementId: "G-DJJ7JLY4YB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;