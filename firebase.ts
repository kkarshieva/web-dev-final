// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFZ2TOBNupQ3g8Zv5BEhDB1uHv3vMFV_E",
  authDomain: "web-dev-final-63be5.firebaseapp.com",
  projectId: "web-dev-final-63be5",
  storageBucket: "web-dev-final-63be5.firebasestorage.app",
  messagingSenderId: "781266451137",
  appId: "1:781266451137:web:653b97bb9ea439c786b240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();

