import { auth, db } from "./firebase-config.js";
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const roleCards = document.querySelectorAll(".role-card");
const selectedRole = document.getElementById("selectedRole");
const registerForm = document.getElementById("registerForm");
const googleButton = document.getElementById("googleButton");
const submitButton = document.getElementById("submitBtn");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

roleCards.forEach(card => {
  card.addEventListener("click", () => {
    roleCards.forEach(item => item.classList.remove("active"));
    card.classList.add("active");
    if (selectedRole) {
      selectedRole.value = card.dataset.role;
    }
  });
});

function addPasswordToggle(buttonId, input) {
  const button = document.getElementById(buttonId);
  if (!button || !input) {
    return;
  }

  button.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    button.textContent = isPassword ? "Hide" : "Show";
  });
}

addPasswordToggle("togglePassword", password);
addPasswordToggle("toggleConfirmPassword", confirmPassword);

if (password) {
  password.addEventListener("input", () => {
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    const value = password.value;
    const score = [
      value.length >= 8,
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value)
    ].filter(Boolean).length;
    const labels = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];

    if (strengthBar) {
      strengthBar.style.width = `${score * 20}%`;
      strengthBar.dataset.strength = labels[score];
    }
    if (strengthText) {
      strengthText.textContent = value ? labels[score] : "";
    }
  });
}

async function saveUserProfile(user, role, fullName) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName: fullName || user.displayName || "User",
    email: user.email,
    role,
    createdAt: new Date().toISOString()
  }, { merge: true });
}

if (registerForm) {
  registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = selectedRole ? selectedRole.value : "student";

    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match.");
      confirmPassword.focus();
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Creating account...";
      const result = await createUserWithEmailAndPassword(auth, email, password.value);
      await updateProfile(result.user, { displayName: fullName });
      await saveUserProfile(result.user, role, fullName);
      await signOut(auth);
      alert("Registration successful! Please sign in to continue.");
      window.location.href = "login.html";
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Create Account →";
    }
  });
}

if (googleButton) {
  googleButton.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    const role = selectedRole ? selectedRole.value : "student";

    try {
      googleButton.disabled = true;
      googleButton.textContent = "Signing up...";
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await saveUserProfile(user, role);
      }

      await signOut(auth);
      alert("Registration successful! Please sign in to continue.");
      window.location.href = "login.html";

    } catch (error) {
      alert("Google Sign-Up failed: " + error.message);
    } finally {
      googleButton.disabled = false;
      googleButton.textContent = "Sign up with Google";
    }
  });
}