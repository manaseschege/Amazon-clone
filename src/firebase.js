// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDKbJaEx51-xW8b9I3DSW5fPwIIw7VSUZU",
  authDomain: "clone-a49c2.firebaseapp.com",
  projectId: "clone-a49c2",
  storageBucket: "clone-a49c2.appspot.com",
  messagingSenderId: "580494421922",
  appId: "1:580494421922:web:ab1a5ce8cc5feece9a4cfb",
  measurementId: "G-4Z6RV39G05",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
