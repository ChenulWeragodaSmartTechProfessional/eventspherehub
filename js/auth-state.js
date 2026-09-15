import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const authNavBtn = document.querySelector('.login-btn');

  if (authNavBtn) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authNavBtn.textContent = 'Log Out';
        authNavBtn.href = '#';
        authNavBtn.onclick = async (e) => {
          e.preventDefault();
          try {
            await signOut(auth);
            window.location.reload();
          } catch (error) {
            console.error('Sign out error:', error);
          }
        };
      } else {
        authNavBtn.textContent = 'Sign In';
        const isSubpage = window.location.pathname.includes('/pages/');
        authNavBtn.href = isSubpage ? 'login.html' : 'pages/login.html';
      }
    });
  }
});