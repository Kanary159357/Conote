import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIfPpETDoX6d4on1-U7h0oCITfjNn-eLQ",
    authDomain: "conote-2f915.firebaseapp.com",
    databaseURL: "https://conote-2f915-default-rtdb.firebaseio.com",
    projectId: "conote-2f915",
    storageBucket: "conote-2f915.appspot.com",
    messagingSenderId: "864822554844",
    appId: "1:864822554844:web:33ec98e24bcbaf1dbc4419",
    measurementId: "G-JRS4LYP7D1"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export default firestore;
