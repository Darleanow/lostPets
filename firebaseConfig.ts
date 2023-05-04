// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiPzCPCJEOEg3AG3UWtUpHZzVpFI3_F_U",
  authDomain: "losting-pet.firebaseapp.com",
  databaseURL: "https://losting-pet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "losting-pet",
  storageBucket: "losting-pet.appspot.com",
  messagingSenderId: "393380661272",
  appId: "1:393380661272:web:1218801164dbdce6895b6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);