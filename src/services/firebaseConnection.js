// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCU3gJrP7x0ypAyaPZ7h28vLozxUfeV_-s",
    authDomain: "meuapp-b2c61.firebaseapp.com",
    databaseURL: "https://meuapp-b2c61-default-rtdb.firebaseio.com",
    projectId: "meuapp-b2c61",
    storageBucket: "meuapp-b2c61.appspot.com",
    messagingSenderId: "333388131195",
    appId: "1:333388131195:web:381bb5dc97886dd8322bde",
    measurementId: "G-W18M2FTCEC"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;