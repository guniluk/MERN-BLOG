// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mean-blog-53182.firebaseapp.com',
  projectId: 'mean-blog-53182',
  storageBucket: 'mean-blog-53182.firebasestorage.app',
  messagingSenderId: '1043609418056',
  appId: '1:1043609418056:web:90e9c42ed3721804c89b7d',
  measurementId: 'G-WEM9TNG9G2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
