import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDGQ3lshrcYV-F1KsmWaXvsdMb3Gtwhyk",
    authDomain: "expense-management-app-d9a44.firebaseapp.com",
    databaseURL: "https://expense-management-app-d9a44.firebaseio.com",
    projectId: "expense-management-app-d9a44",
    storageBucket: "expense-management-app-d9a44.appspot.com",
    messagingSenderId: "160335986587",
    appId: "1:160335986587:web:8da47be459e9f9335c6b3e",
    measurementId: "G-0DDQSDNJJJ"
};

export default firebase.initializeApp(firebaseConfig);