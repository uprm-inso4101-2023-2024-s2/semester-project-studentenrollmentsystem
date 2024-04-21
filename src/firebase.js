// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALq9ZaCveync7L6MG2R1k1sBuXl5MIzqM",
  authDomain: "studentenrollmentsystem-89846.firebaseapp.com",
  projectId: "studentenrollmentsystem-89846",
  storageBucket: "studentenrollmentsystem-89846.appspot.com",
  messagingSenderId: "3501973170",
  appId: "1:3501973170:web:30e6a542a61888df31f3ab"
};


// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);

export default fbapp; // Export the initialized app