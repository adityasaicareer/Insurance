// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRZGZ2H7G90ft4xuxV_TGsNg2YBsVUZcg",
  authDomain: "insurance-89982.firebaseapp.com",
  projectId: "insurance-89982",
  storageBucket: "insurance-89982.firebasestorage.app",
  messagingSenderId: "506616615688",
  appId: "1:506616615688:web:e2bb4dc23e0690266b92bd",
  measurementId: "G-NLWXLNTWWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);

export {auth,app};