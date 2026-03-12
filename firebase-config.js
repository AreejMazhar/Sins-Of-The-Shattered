// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// Optional: import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaoT4qI7BNoST0N6jC1TLv3cJ9djL9CIs",
  authDomain: "sins-of-the-shattered.firebaseapp.com",
  projectId: "sins-of-the-shattered",
  storageBucket: "sins-of-the-shattered.firebasestorage.app",
  messagingSenderId: "733717372691",
  appId: "1:733717372691:web:5c591a46a6bec28fbf84e6",
  measurementId: "G-08LZPNY2P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("🔥 Firebase initialized successfully for Sins of the Shattered.");

// Export the app if other module scripts need to access it later (e.g. for Firestore)
export { app, analytics };
