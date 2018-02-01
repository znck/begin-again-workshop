import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD1uFXoNtk4tK4HIX3ikgg7EoFCphAWRaE",
  authDomain: "begin-again-workshop.firebaseapp.com",
  databaseURL: "https://begin-again-workshop.firebaseio.com",
  projectId: "begin-again-workshop",
  storageBucket: "begin-again-workshop.appspot.com",
  messagingSenderId: "436845609512"
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export const db = firebase.database()
export const auth = firebase.auth()
export const authProvider = new firebase.auth.GoogleAuthProvider()
