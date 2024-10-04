import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc, query, where, Timestamp } from 'firebase/firestore';
const db = getFirestore();
//firebase rules:
//prevents anybody from creating, updating or deleting any note which is not their
//prevents altering other people's notes. only allow reading if public=true

export const createNote = async (userId) => {
    if (!userId) {
        console.error('No user ID provided');
        return;
    }
    const now = Timestamp.now();
    const noteData = {
        title: "Untitled",
        content: "",
        created: now,
        tags: [],
        lastSynced: now,
        lastUpdated: now,
        userId: userId,
        public: false,
    };

    console.log('Creating note:', noteData);
    try {
        const docRef = await addDoc(collection(db, 'notes'), noteData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating note:', error);
    }
};

export const updateNote = async (id, note = {
    title: 'Untitled',
    content: '',
    tags: [],
}) => {
    const noteRef = doc(db, 'notes', id);
    const now = Timestamp.now();

    const updatedData = {
        title: note.title,
        content: note.content,
        tags: note.tags || [],
        lastUpdated: now,
        lastSynced: now,
        public: note.public
    };

    try {
        await updateDoc(noteRef, updatedData);
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

export const deleteNote = async (id) => {
    const noteRef = doc(db, 'notes', id);
    try {
        await deleteDoc(noteRef);
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};
export const getAllNotes = async (userId) => {
    if (!userId) {
        console.error('No user ID provided');
        return;
    }
    const notesCollection = collection(db, 'notes');
    const q = query(notesCollection, where('userId', '==', userId));

    try {
        const querySnapshot = await getDocs(q);
        const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return notes;
    } catch (error) {
        console.error('Error retrieving notes:', error);
    }
};


export const getNoteById = async (id) => {
    const noteRef = doc(db, 'notes', id);
    try {
        const noteSnapshot = await getDoc(noteRef);
        if (noteSnapshot.exists()) {
            const noteData = { id: noteSnapshot.id, ...noteSnapshot.data() };
            return noteData;
        } else {
            console.log('No such note exists!');
            return;
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
    }
};
