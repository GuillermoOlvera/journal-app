// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8XJL4Tj_s976BprtdBz59Hw1XWYoebbg",
  authDomain: "journal-app-6a8db.firebaseapp.com",
  projectId: "journal-app-6a8db",
  storageBucket: "journal-app-6a8db.appspot.com",
  messagingSenderId: "143180906702",
  appId: "1:143180906702:web:f8153a288f52b9b79d909f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);