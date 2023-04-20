// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_FOeBVjA_PBreuVb5vmrAbX2FiIcK1ds",
  authDomain: "mirador-tayrona-park-auth.firebaseapp.com",
  projectId: "mirador-tayrona-park-auth",
  storageBucket: "mirador-tayrona-park-auth.appspot.com",
  messagingSenderId: "282543250341",
  appId: "1:282543250341:web:9d8abbf6c6c5cfa4c0264c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
