import { auth, db } from "./firebase-config.js";
import { 
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  doc, 
  getDoc,
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const roleCards = document.querySelectorAll(".role-card");
  const selectedRole = document.getElementById("selectedRole");
  const loginForm = document.getElementById("loginForm");
  const password = document.getElementById("password");
  const passwordToggle = document.getElementById("passwordToggle") || document.getElementById("togglePassword");
  const googleButton = document.getElementById("googleButton");
  const forgotPassword = document.getElementById("forgotPassword");
  const loginButton = document.getElementById("loginButton") || document.getElementById("submitBtn");

  // Helper function to handle role-based navigation
  async function handleUserRedirect(user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          window.location.href = "admin.html";
          return;
        }
      }
      // Default page for student, teacher, or parent
      window.location.href = "../index.html";
    } catch (err) {
      console.error("Error checking user role:", err);
      window.location.href = "../index.html";
    }
  }

  // Role Selection Toggle
  roleCards.forEach(card => {
    card.addEventListener("click", () => {
      roleCards.forEach(item => item.classList.remove("active"));
      card.classList.add("active");

      if (selectedRole) {
        selectedRole.value = card.dataset.role;
      }
    });
  });

  // Password Visibility Toggle
  if (passwordToggle && password) {
    passwordToggle.addEventListener("click", () => {
      if (password.type === "password") {
        password.type = "text";
        passwordToggle.textContent = "Hide";
      } else {
        password.type = "password";
        passwordToggle.textContent = "Show";
      }
    });
  }

  // Email / Password Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const email = emailInput ? emailInput.value.trim() : "";
      const passwordValue = password ? password.value : "";
      const role = selectedRole ? selectedRole.value : "student";
      const rememberMe = document.getElementById("rememberMe");

      if (!email || !passwordValue) {
        alert("Please enter your email and password.");
        return;
      }

      try {
        if (loginButton) {
          loginButton.disabled = true;
          loginButton.textContent = "Signing in...";
        }

        await setPersistence(
          auth, 
          rememberMe && rememberMe.checked ? browserLocalPersistence : browserSessionPersistence
        );

        const userCredential = await signInWithEmailAndPassword(auth, email, passwordValue);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role && userData.role !== role) {
            alert(`Note: Logging in as registered role (${userData.role}).`);
          }
        }

        await handleUserRedirect(user);

      } catch (error) {
        alert("Login failed: " + error.message);
      } finally {
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = "Sign In →";
        }
      }
    });
  }

  // Google Sign-In Handler
  if (googleButton) {
    googleButton.addEventListener("click", async () => {
      const provider = new GoogleAuthProvider();
      const role = selectedRole ? selectedRole.value : "student";

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            fullName: user.displayName || "User",
            email: user.email,
            role: role,
            createdAt: new Date().toISOString()
          });
        }

        await handleUserRedirect(user);

      } catch (error) {
        alert("Google Sign-In failed: " + error.message);
      }
    });
  }

  // Password Reset Handler
  if (forgotPassword) {
    forgotPassword.addEventListener("click", async (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const email = emailInput ? emailInput.value.trim() : "";

      if (!email) {
        alert("Enter your email address first.");
        if (emailInput) emailInput.focus();
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email);
        alert(`Password reset email sent to ${email}. Please check your inbox.`);
      } catch (error) {
        alert("Failed to send reset email: " + error.message);
      }
    });
  }
});
