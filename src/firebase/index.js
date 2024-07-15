// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChsLNUgwSyPnGylNyw1LqTw7ovB59SH6s",
  authDomain: "ido-detai-2.firebaseapp.com",
  projectId: "ido-detai-2",
  storageBucket: "ido-detai-2.appspot.com",
  messagingSenderId: "423722241293",
  appId: "1:423722241293:web:0c6fffa1273d476d0af444",
  measurementId: "G-PPD0F85LEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);