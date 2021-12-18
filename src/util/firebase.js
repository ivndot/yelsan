// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6UrClurJgVbjCKx_2cqwNeNW7KVK1x4Q",
  authDomain: "yelsan-1e60c.firebaseapp.com",
  projectId: "yelsan-1e60c",
  storageBucket: "yelsan-1e60c.appspot.com",
  messagingSenderId: "1086753076563",
  appId: "1:1086753076563:web:101e289233c316d0575da6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initizalize firestore
const db = getFirestore(app);

export default db;
