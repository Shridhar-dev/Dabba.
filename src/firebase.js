import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDXe57RdurCdu6akSnK8SFkpVWb7FUhOo0",
    authDomain: "littlebrocolli-783c0.firebaseapp.com",
    projectId: "littlebrocolli-783c0",
    storageBucket: "littlebrocolli-783c0.appspot.com",
    messagingSenderId: "594856567781",
    appId: "1:594856567781:web:a27c6b2b99fc46b963c50c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)  
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth , provider} 