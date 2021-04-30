import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_Y2m229YWUmdcr6fpM3MAp01OrkiaJSg",
    authDomain:"nwitter-cfd13.firebaseapp.com",
    projectId: "nwitter-cfd13",
    storageBucket: "nwitter-cfd13.appspot.com",
    messagingSenderId: "523573858721",
    appId: "1:523573858721:web:5dce0a05bf10a1beb63be0",

  };


firebase.initializeApp(firebaseConfig);

export const firebaseInstance=firebase;

export const authService=firebase.auth();

export const dbService=firebase.firestore();