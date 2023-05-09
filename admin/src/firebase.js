import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.APP_KEY,
    authDomain: "pegacine-897de.firebaseapp.com",
    projectId: "pegacine-897de",
    storageBucket: "pegacine-897de.appspot.com",
    messagingSenderId: "572782303198",
    appId: "1:572782303198:web:e72f25cd7c1b38c1da6f4f",
    measurementId: "G-JTKHD6K36F"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const storageRef = ref(storage);

export default storage;