import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc, query, where, Timestamp } from 'firebase/firestore';
const db = getFirestore();

export const createTag = async (userId, title = "New Tag") => {
    if (!userId) {
        console.error('No user ID provided');
        return;
    }
    const now = Timestamp.now();
    const newData = {
        title: title,
        created: now,
        color: "#333333",
        userId: userId
    };

    try {
        const docRef = await addDoc(collection(db, 'tags'), newData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating tag:', error);
    }
};

export const updateTag = async (id, tag = {
    title: 'Untitled',
    color: '#333333'
}) => {
    const noteRef = doc(db, 'tags', id);
    const updatedData = {
        title: tag?.title || 'Untitled',
        color: tag?.color || '#333333',
    };
    try {
        await updateDoc(noteRef, updatedData);
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

export const deleteTag = async (id) => {
    const tagRef = doc(db, 'tags', id);
    try {
        await deleteDoc(tagRef);
    } catch (error) {
        console.error('Error deleting tag:', error);
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
    }
};
