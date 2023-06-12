import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsFpy6WKyf9sOF0ENmXTXAm5z-6fAEJMY",
  authDomain: "rn-project-f3b98.firebaseapp.com",
  databaseURL: "https://rn-project-f3b98.firebaseio.com",
  projectId: "rn-project-f3b98",
  storageBucket: "rn-project-f3b98.appspot.com",
  messagingSenderId: "738939601284",
  appId: "1:738939601284:web:275d2c1c7a703eeed71dd1",
  measurementId: "G-XMV1W7CJDG",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const storage = firebase.storage();

export { auth, db, storage };
