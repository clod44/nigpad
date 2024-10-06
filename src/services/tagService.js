import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc, query, where, Timestamp } from 'firebase/firestore';
import { notify } from "../context/ToastContext";
const db = getFirestore();

export const createTag = async (userId, title = "New Tag") => {
    if (!userId) {
        console.error('No user ID provided');
        notify('No logged in user found', { type: "error" });
        return;
    }
    const now = Timestamp.now();
    const newData = {
        title: title,
        created: now,
        color: "default",
        userId: userId
    };

    try {
        const docRef = await notify("Creating tag...", {
            promise: addDoc(collection(db, 'tags'), newData),
            pending: {
                render() {
                    return "Creating tag...";
                }
            },
            success: {
                render({ data }) {
                    return `New tag created.`;
                }
            },
            error: {
                render({ data }) {
                    return `Failed to create tag: ${data}`;
                }
            }
        })
        return docRef.id;
    } catch (error) {
        console.error('Error creating tag:', error);
        notify(`Failed to create tag: ${error.message}`, { type: "error" });
    }
};

export const updateTag = async (id, tag = {
    title: 'Untitled',
    color: 'default'
}) => {
    const noteRef = doc(db, 'tags', id);
    const updatedData = {
        title: tag?.title || 'Untitled',
        color: tag?.color || 'default',
    };
    try {
        await notify("Updating Tag...", {
            promise: updateDoc(noteRef, updatedData),
            pending: {
                render() {
                    return "Updating tag...";
                }
            },
            success: {
                render() {
                    return `Tag updated.`;
                }
            },
            error: {
                render({ data }) {
                    return `Failed to update tag: ${data.message}`;
                }
            }
        })
    } catch (error) {
        console.error('Error updating note:', error);
        notify(`Failed to update tag: ${error.message}`, { type: "error" });
    }
};

export const deleteTag = async (id) => {
    const tagRef = doc(db, 'tags', id);
    try {
        await notify("Deleting tag...", {
            promise: deleteDoc(tagRef),
            pending: {
                render() {
                    return "Deleting tag...";
                }
            },
            success: {
                render() {
                    return `Tag deleted.`;
                }
            },
            error: {
                render({ data }) {
                    return `Failed to delete tag: ${data.message}`;
                }
            }
        })
    } catch (error) {
        console.error('Error deleting tag:', error);
        notify(`Failed to delete tag: ${error.message}`, { type: "error" });
    }
};

export const getAllTags = async (userId) => {
    if (!userId) {
        console.error('No user ID provided');
        return;
    }
    const tagsCollection = collection(db, 'tags');
    const q = query(tagsCollection, where('userId', '==', userId));

    try {
        const querySnapshot = await getDocs(q);
        const tags = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tags;
    } catch (error) {
        console.error('Error retrieving tags:', error);
        notify(`Failed to retrieve tags: ${error.message}`, { type: "error" });
    }
};


export const getTagById = async (id) => {
    const ref = doc(db, 'tags', id);

    try {
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            const tag = { id: snapshot.id, ...snapshot.data() };
            return tag;
        } else {
            console.log('No such tag exists!', id);
            return;
        }
    } catch (error) {
        console.error('Error retrieving tag:', error);
        notify(`Failed to retrieve tag: ${error.message}`, { type: "error" });
    }
};
