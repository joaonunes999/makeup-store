import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYjKWPfOUfPFdv6TxSEzWiLxJTeRgHPVk",
    authDomain: "makeupstore-bff0c.firebaseapp.com",
    databaseURL: "https://makeupstore-bff0c-default-rtdb.firebaseio.com",
    projectId: "makeupstore-bff0c",
    storageBucket: "makeupstore-bff0c.appspot.com",
    messagingSenderId: "731209948169",
    appId: "1:731209948169:web:624e7f8b0ccb7c2328ecd8",
    measurementId: "G-4YSY4XKTEG"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;