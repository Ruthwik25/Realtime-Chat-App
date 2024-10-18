// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQybTlEEfEFBJ7bUrSkcs1VGm66IRYnbw",
  authDomain: "chatto-6608e.firebaseapp.com",
  projectId: "chatto-6608e",
  storageBucket: "chatto-6608e.appspot.com",
  messagingSenderId: "275852036994",
  appId: "1:275852036994:web:f34b71ad41c901c08e5d9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
