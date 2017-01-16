import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: process.env.apiKey,
  authDomain: "live-dc941.firebaseapp.com",
  databaseURL: "https://live-dc941.firebaseio.com",
  storageBucket: "live-dc941.appspot.com",
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);
