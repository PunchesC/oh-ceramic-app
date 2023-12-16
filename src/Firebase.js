// Import Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getStorage, ref, list,listAll, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuydredI9wg1XB9N2mRaLQpfvtqP95S-0",
  authDomain: "olivia-hoffman-ceramics-8720e.firebaseapp.com",
  projectId: "olivia-hoffman-ceramics-8720e",
  storageBucket: "olivia-hoffman-ceramics-8720e.appspot.com",
  messagingSenderId: "178282382461",
  appId: "1:178282382461:web:a7933db8dd31dfef9b1d14",
  measurementId: "G-R1628XPRYF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, ref, list,listAll, getDownloadURL, app };