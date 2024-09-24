// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD12gmFhTBbhMTfNXeC1i7kaOmk77FYoKc",
  authDomain: "online-store-6cd3b.firebaseapp.com",
  projectId: "online-store-6cd3b",
  storageBucket: "online-store-6cd3b.appspot.com",
  messagingSenderId: "863847066570",
  appId: "1:863847066570:web:ad75759b1114a5dbd4bd33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
