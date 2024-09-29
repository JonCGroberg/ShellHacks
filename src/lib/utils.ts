import { navigate } from "astro:transitions/client";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import {app} from 'src/firebase/client'

import Cookies from "js-cookie";

export const logout = async (app:any) => {
  const auth = getAuth(app)
  // Clear the cookie
  document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // Sign out of Firebase
  await signOut(auth);
  // Redirect to the login page
  navigate('/login');
}

//reads user id from cookies
export const getUserId = async () => {
  const userId = Cookies.get('uid');
  return userId;
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}