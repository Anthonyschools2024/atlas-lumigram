import { initializeApp } from "firebase/app";
// Import necessary functions directly from 'firebase/auth'
import { 
    getAuth, 
    initializeAuth, // Keep for potential future use if needed, but getAuth is primary now
    getReactNativePersistence, // Keep import even if direct call failed
    browserLocalPersistence, // Import the browser persistence type
    setPersistence // Import setPersistence function
} from "firebase/auth"; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration - VERIFIED
const firebaseConfig = {
  apiKey: "AIzaSyDvZ8Mi13KxYOSqCU7ImaD9HckD8KzSPVo",
  authDomain: "atlas-lumigram-ad1ef.firebaseapp.com", 
  projectId: "atlas-lumigram-ad1ef",
  storageBucket: "atlas-lumigram-ad1ef.appspot.com", 
  messagingSenderId: "591841160813",
  appId: "1:591841160813:web:ff4800cf1ec27a17dd1964" 
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// --- MODIFIED AUTH INITIALIZATION ---
// 1. Get the Auth instance first
const auth = getAuth(app); 

// 2. Then, try to set persistence asynchronously.
//    We use browserLocalPersistence which Firebase maps to AsyncStorage on React Native.
//    getReactNativePersistence might still be needed *internally* by Firebase, 
//    but we aren't calling it directly during initialization.
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to AsyncStorage (via browserLocalPersistence).");
  })
  .catch((error) => {
    console.error("Firebase Auth: Error setting persistence:", error);
    // Handle error - maybe fall back to session persistence or inform user
  });
// --- END MODIFIED AUTH INITIALIZATION ---


export { auth };