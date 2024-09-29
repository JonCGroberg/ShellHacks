// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXqG2p17gLYBJy2Zut4g_Tk3Cau4OTYEM",
  authDomain: "test-9c0b2.firebaseapp.com",
  projectId: "test-9c0b2",
  storageBucket: "test-9c0b2.appspot.com",
  messagingSenderId: "879933081787",
  appId: "1:879933081787:web:4713947e29b62f04f4019e",
  measurementId: "G-H1QTBFN00L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
