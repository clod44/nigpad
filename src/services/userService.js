import { getAuth, updateProfile } from 'firebase/auth';
import { notify } from "../context/ToastContext";

const updateDisplayName = async (newName) => {
    if (!newName || newName.trim().length == 0) {
        notify("Please enter a valid new name", { type: "error" });
        return;
    }
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        try {
            await notify("Updating profile...", {
                promise: updateProfile(user, { displayName: newName }),
                pending: {
                    render() {
                        return "Updating profile...";
                    }
                },
                success: {
                    render() {
                        return `Display name updated to: ${newName}`;
                    }
                },
                error: {
                    render({ data }) {
                        console.error('Failed to update display name:', data);
                        return `Failed to update display name: ${data.message}`;
                    }
                }
            });
        } catch (error) {
            console.error('Failed to update display name:', error);
        }
    } else {
        console.error('No user is signed in');
        notify("Not user is signed in", { type: "error" });
    }
};

export { updateDisplayName };
