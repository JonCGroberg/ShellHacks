// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAWY7JVT8SXo0_ROK1wRO5aw55cs1iBcsA",
    authDomain: "shellhacks-go.firebaseapp.com",
    projectId: "shellhacks-go",
    storageBucket: "shellhacks-go.appspot.com",
    messagingSenderId: "1037212198068",
    appId: "1:1037212198068:web:b3541842a649dc87b6a3e1"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
