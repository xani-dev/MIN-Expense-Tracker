const firebase = require("firebase/app").default;
require('firebase/auth')

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "oktan-2e2b0.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: "oktan-2e2b0.appspot.com",
  messagingSenderId: "549123278466",
  appId: process.env.FIREBASE_APPID,
});

module.exports = { app };