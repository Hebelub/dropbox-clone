import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBbAaQDmfEGy-p6OqGAzCXtA6R18peYg9A",
    authDomain: "dropbox-clone-21101.firebaseapp.com",
    projectId: "dropbox-clone-21101",
    storageBucket: "dropbox-clone-21101.appspot.com",
    messagingSenderId: "967020585887",
    appId: "1:967020585887:web:53581ccabda7f4c650d3aa"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };