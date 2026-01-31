import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWMVMruhPHhAM4RCvkTVxBFAs66rARu2M",
  authDomain: "reactjs-5c56f.firebaseapp.com",
  projectId: "reactjs-5c56f",
  storageBucket: "reactjs-5c56f.firebasestorage.app",
  messagingSenderId: "503098997606",
  appId: "1:503098997606:web:94da70e4e0f13672cae6a7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
