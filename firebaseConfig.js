import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs8RnRqTVQrJS59nhBeEpduAViB-kz2XA",
  authDomain: "aulanativebosch.firebaseapp.com",
  projectId: "aulanativebosch",
  storageBucket: "aulanativebosch.firebasestorage.app",
  messagingSenderId: "213231716060",
  appId: "1:213231716060:web:979529d36aa7ab6f24d619",
  measurementId: "G-PBBMJ5JHVZ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)