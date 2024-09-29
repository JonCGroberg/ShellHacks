// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWY7JVT8SXo0_ROK1wRO5aw55cs1iBcsA",
  authDomain: "shellhacks-go.firebaseapp.com",
  projectId: "shellhacks-go",
  storageBucket: "shellhacks-go.appspot.com",
  messagingSenderId: "1037212198068",
  appId: "1:1037212198068:web:b3541842a649dc87b6a3e1"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
