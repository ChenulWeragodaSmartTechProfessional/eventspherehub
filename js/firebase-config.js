import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZZXH7fmQqoGvP1LfcOkB6HmwtNsxaUiw",
  authDomain: "eventspherehub-f13ae.firebaseapp.com",
  projectId: "eventspherehub-f13ae",
  storageBucket: "eventspherehub-f13ae.firebasestorage.app",
  messagingSenderId: "1034755917946",
  appId: "1:1034755917946:web:a2340eba116581f2c093c3",
  measurementId: "G-SCZD6PVP8Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);