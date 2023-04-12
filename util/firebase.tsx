// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdfjOtFbiWDHXjbgVcSMoFqzc2TRRKmSk",
  authDomain: "greatdebaters-7e807.firebaseapp.com",
  projectId: "greatdebaters-7e807",
  storageBucket: "greatdebaters-7e807.appspot.com",
  messagingSenderId: "7254889027",
  appId: "1:7254889027:web:78f7983a0f0419185b3af6",
  databaseURL: "https://greatdebaters-7e807-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);