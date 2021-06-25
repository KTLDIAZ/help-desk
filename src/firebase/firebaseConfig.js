import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBas_8po9QW10c9IhbZR3SxwJBog9Si9I0",
  authDomain: "help-desk-8ec1d.firebaseapp.com",
  projectId: "help-desk-8ec1d",
  storageBucket: "help-desk-8ec1d.appspot.com",
  messagingSenderId: "298611288105",
  appId: "1:298611288105:web:a8b65f3d36741b254dd438",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, firebase, googleAuthProvider };
