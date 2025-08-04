import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBiz4sqFqWTGKFvaOAErq24RQ_wuyjvY8E",
  authDomain: "url-port-blocker.firebaseapp.com",
  projectId: "url-port-blocker",
  storageBucket: "url-port-blocker.firebasestorage.app",
  messagingSenderId: "322890529621",
  appId: "1:322890529621:web:c1100622ab57390612cddc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, signInWithEmailAndPassword, db };