import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCsmOdDK47CMRNONDTh08HkMwFh3ZkxxLc",
  authDomain: "fir-a245d.firebaseapp.com",
  databaseURL: "https://fir-a245d.firebaseio.com",
  projectId: "fir-a245d",
  storageBucket: "fir-a245d.appspot.com",
  messagingSenderId: "109067328857",
  appId: "1:109067328857:web:2e1ecde5c8ed12b2d74048",
  measurementId: "G-BEW0XQM5NV",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const auth = firebase.auth();
export const storage = firebase.storage();
