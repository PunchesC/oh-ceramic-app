// Import Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getStorage, ref, list,listAll, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, ref, list,listAll, getDownloadURL, app };