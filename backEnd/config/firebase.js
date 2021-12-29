const { initializeApp } = require('firebase-admin/app');

const admin = require("firebase-admin");

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

const serviceAccount = require ('../serviceAccountKey.json');

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oktan-2e2b0.firebaseio.com"
});

module.exports = { app, admin, initializeApp };