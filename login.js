// Importing Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3mziy91utbxO45OdnhjNejxdYEwpVIr8",
    authDomain: "food-hut-ca41d.firebaseapp.com",
    projectId: "food-hut-ca41d",
    storageBucket: "food-hut-ca41d.appspot.com",
    messagingSenderId: "240614073501",
    appId: "1:240614073501:web:ab7e83234aa1a67c896074"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Auth instance

// Function to handle user login
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful!', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
    }
};

// Export loginUser function to use in other scripts
export { loginUser };
