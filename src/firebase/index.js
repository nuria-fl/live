import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: `${process.env.FIREBASE_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_ID}.firebaseio.com`,
  projectId: process.env.FIREBASE_ID,
  storageBucket: `${process.env.FIREBASE_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGINGID
}

firebase.initializeApp(config)

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { db }
