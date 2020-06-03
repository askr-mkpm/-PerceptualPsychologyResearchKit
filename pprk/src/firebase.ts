import * as firebase from 'firebase/app';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDIbOJIldrGtE5ul03VXh9RPUo8IGZ5YrM",
    authDomain: "pprk-65ea0.firebaseapp.com",
    databaseURL: "https://pprk-65ea0.firebaseio.com",
    projectId: "pprk-65ea0",
    storageBucket: "pprk-65ea0.appspot.com",
    messagingSenderId: "562920005944",
    appId: "1:562920005944:web:84ac7955d324295de6e1cd",
    measurementId: "G-NXJXFQEJ3R"
};

firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore();