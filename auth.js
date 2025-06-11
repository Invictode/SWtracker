// --- YOUR FIREBASE CONFIGURATION ---
// IMPORTANT: This must be the same config object as in script.js
const firebaseConfig = {
    apiKey: "AIzaSyC4gBqQlYh3vQ2wbfySpG-4z6Dk4dJ5hoc",
    authDomain: "er-handover-c245b.firebaseapp.com",
    projectId: "er-handover-c245b",
    storageBucket: "er-handover-c245b.appspot.com",
    messagingSenderId: "867309153832",
    appId: "1:867309153832:web:a3a915736ac98709080f1d",
    measurementId: "G-0TGFDX9CWN"
};

// --- INITIALIZE FIREBASE ---
try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.error("Firebase initialization failed in auth.js.", e);
}

const auth = firebase.auth();

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// --- EVENT LISTENER FOR LOGIN FORM ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            window.location.href = 'index.html'; // Redirect to the main tracker page
        })
        .catch((error) => {
            // Handle Errors here.
            console.error("Login Error:", error);
            errorMessage.textContent = "Invalid email or password. Please try again.";
        });
});

// --- CHECK IF USER IS ALREADY LOGGED IN ---
// This prevents logged-in users from seeing the login page again.
// If they are logged in, it redirects them straight to the tracker.
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect them to the main page.
        // We check the current page to prevent a redirect loop.
        if (!window.location.href.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
    }
});
