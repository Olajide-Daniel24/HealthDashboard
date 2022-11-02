
import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

//config for connecting with the DB
const firebaseConfig = {
  apiKey: "AIzaSyAVsV9mtgJOiE8oXi11HSLiMtW244bkuRk",
  authDomain: "ehealth-16698.firebaseapp.com",
  projectId: "ehealth-16698",
  storageBucket: "ehealth-16698.appspot.com",
  messagingSenderId: "299316578313",
  appId: "1:299316578313:web:19ab11653ac3da0de390d8",
  measurementId: "G-VK5W6QJB2H"
};





export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
