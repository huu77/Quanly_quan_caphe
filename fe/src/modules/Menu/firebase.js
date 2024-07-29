// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBdrD0pOF1N2Dr0-ruIxblc5WMhEPAxqxs",
    authDomain: "otp-project-c7436.firebaseapp.com",
    projectId: "otp-project-c7436",
    storageBucket: "otp-project-c7436.appspot.com",
    messagingSenderId: "741507010056",
    appId: "1:741507010056:web:093bcab7f629e4eabd0bbd",
    measurementId: "G-P6TP3NR5YN"
};
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;