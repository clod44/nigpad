import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { notify } from "../context/ToastContext";

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (email, password) => {
    try {
        const userCredential = await notify("Signing up...", {
            promise: createUserWithEmailAndPassword(auth, email, password),
            pending: {
                render() {
                    return "Signing up with email...";
                }
            },
            success: {
                render({ data }) {
                    return `Signed up with email: ${data.user.email}`;
                }
            },
            error: {
                render({ data }) {
                    return `Error signing up: ${data.message}`;
                }
            }

        });
        return userCredential?.user;
    } catch (error) {
        console.error("Error signing up:", error);
        notify(`Failed to sign up: ${error.message}`, { type: "error" });
    }
};

export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await notify("Logging in...", {
            promise: signInWithEmailAndPassword(auth, email, password),
            pending: {
                render() {
                    return "Logging in with email...";
                }
            },
            success: {
                render({ data }) {
                    return `Logged in with email: ${data.user.email}`;
                }
            },
            error: {
                render({ data }) {
                    return `Error logging in: ${data.message}`;
                }
            }
        })
        return userCredential?.user;
    } catch (error) {
        console.error("Error logging in:", error);
        notify(`Failed to login: ${error.message}`, { type: "error" });
    }
};

export const loginWithGoogle = async () => {
    try {
        const result = await notify("Logging in...", {
            promise: signInWithPopup(auth, googleProvider),
            pending: {
                render() {
                    return "Logging in with Google...";
                }
            },
            success: {
                render({ data }) {
                    return `Logged in with Google: ${data.user.email}`;
                }
            },
            error: {
                render({ data }) {
                    return `Error logging in: ${data.message}`;
                }
            }
        })
        return result?.user;
    } catch (error) {
        console.error("Error logging in with Google:", error);
        notify(`Failed to login with Google: ${error.message}`, { type: "error" });
    }
};



export const loginAnonymously = async () => {
    try {
        const userCredential = await notify("Logging in...", {
            promise: signInAnonymously(auth),
            pending: {
                render() {
                    return "Logging in anonymously...";
                }
            },
            success: {
                render({ data }) {
                    return `You are Anonymous: If you log out, you won't be able to log in again! Feel free to test the application`;
                }
            },
            error: {
                render({ data }) {
                    return `Error logging in: ${data.message}`;
                }
            }
        }, {
            autoClose: 7000
        });

        //this return ignores the async i couldnt figure out why and then throws user of undefined error so this fixes it (idk)
        return userCredential?.user;
    } catch (error) {
        console.error("Error logging in anonymously:", error);
        notify(`Failed to login anonymously: ${error.message}`, { type: "error" });
    }
};


export const logout = async () => {
    try {
        await notify("Logging out...", {
            promise: signOut(auth),
            pending: {
                render() {
                    return "Logging out...";
                }
            },
            success: {
                render() {
                    return `Logged out`;
                }
            },
            error: {
                render({ data }) {
                    return `Error logging out: ${data.message}`;
                }
            }
        });
    } catch (error) {
        console.error("Error logging out:", error);
        notify(`Failed to log out: ${error.message}`, { type: "error" });
    }
};