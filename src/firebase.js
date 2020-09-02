

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBrtYD1IHp_pPIDDbCOPPXiKKGvuBDwkDI",
    authDomain: "todo-app-cp-bbb9f.firebaseapp.com",
    databaseURL: "https://todo-app-cp-bbb9f.firebaseio.com",
    projectId: "todo-app-cp-bbb9f",
    storageBucket: "todo-app-cp-bbb9f.appspot.com",
    messagingSenderId: "328745433338",
    appId: "1:328745433338:web:e77b3a28078e4539877143",
    measurementId: "G-Q7CW2ZLLC8"
  });

  const db = firebaseApp.firestore();

  export default db;