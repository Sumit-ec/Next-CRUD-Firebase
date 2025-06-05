import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAbMTMM8Mwxki6XMKizsFFgSlw5MH7hQr0",
  authDomain: "crud-next-app-8c13e.firebaseapp.com",
  projectId: "crud-next-app-8c13e",
  storageBucket: "crud-next-app-8c13e.firebasestorage.app",
  messagingSenderId: "183314561886",
  appId: "1:183314561886:web:c861f053ebc3ec38ededcf"
};

const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()