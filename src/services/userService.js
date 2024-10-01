import { getAuth, updateProfile } from 'firebase/auth';

const updateDisplayName = async (newName) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        try {
            await updateProfile(user, { displayName: newName });
            console.log('Display name updated to:', newName);
        } catch (error) {
            console.error('Failed to update display name:', error);
        }
    }
};

export { updateDisplayName };
