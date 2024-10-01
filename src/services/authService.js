import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { app } from "../config/firebase.js";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error logging in with Google:", error);
        throw error;
    }
};

export const loginAnonymously = async () => {
    const auth = getAuth();

    try {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;

        console.log("Anonymous User ID:", user.uid); // Unique ID for the anonymous user
        return user; // Return user for further use if needed
    } catch (error) {
        console.error("Error logging in anonymously:", error);
        throw error; // Propagate the error for handling in the calling function
    }
};


export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};
