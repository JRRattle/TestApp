// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Add Firebase configuration here: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDn0CMO9GrAg3Q536acGXkU09tcl9DIwmM",
    authDomain: "https://accounts.google.com/o/saml2/idp?idpid=C00zn5w3i",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);