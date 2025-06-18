import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCAp7VzmtwUbtOadowElpPcqEV8-K5hZt8",
  authDomain: "career-guidance-system-304cc.firebaseapp.com",
  projectId: "career-guidance-system-304cc",
  storageBucket: "career-guidance-system-304cc.firebasestorage.app",
  messagingSenderId: "196260445760",
  appId: "1:196260445760:web:7acd7155c71dcd82ab29a5",
  measurementId: "G-DQ1BE02LRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Firestore
const storage = getStorage(app); // Firebase Storage

// Export the services
export { auth, googleProvider, db, storage }; // Export the storage
