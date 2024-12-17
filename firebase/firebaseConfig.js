//firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Add Firebase configuration here: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

  apiKey: "AIzaSyAHg9k9CIBvRI1yiVibd2lWil-00tyItJA",

  authDomain: "testapp-52f1e.firebaseapp.com",

  projectId: "testapp-52f1e",

  storageBucket: "testapp-52f1e.firebasestorage.app",

  messagingSenderId: "650017707801",

  appId: "1:650017707801:web:e29d7db3c5ef0c42b41788"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);


export { auth, db };
