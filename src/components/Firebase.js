import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBBvduUogeiJNtlLcy8r633KkTA5xtTPGo",
  authDomain: "fairbas-auth-1.firebaseapp.com",
  projectId: "fairbas-auth-1",
  storageBucket: "fairbas-auth-1.appspot.com",
  messagingSenderId: "112235738442",
  appId: "1:112235738442:web:0547076fcf108d1611fdb3",
  measurementId: "G-YVQEEYJME1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();


export{
    app,
    auth,
    provider,
    database
}