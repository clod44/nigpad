import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc, query, where, Timestamp } from 'firebase/firestore';
const db = getFirestore();

const createNote = async (userId) => {
    const now = Timestamp.now();
    const noteData = {
        title: "Untitled",
        content: "",
        createdAt: now,
        lastSynced: now,
        lastUpdated: now,
        userId: userId,
    };

    console.log('Creating note:', noteData);
    try {
        const docRef = await addDoc(collection(db, 'notes'), noteData);
        console.log('Note created:', noteData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating note:', error);
    }
};

const updateNote = async (id, note = {
    title: 'Untitled',
    content: '',
}) => {
    const noteRef = doc(db, 'notes', id);
    const now = Timestamp.now();

    const updatedData = {
        title: note.title,
        content: note.content,
        lastUpdated: now,
        lastSynced: now,
    };

    try {
        await updateDoc(noteRef, updatedData);
        console.log('Note updated:', id);
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

const deleteNote = async (id) => {
    const noteRef = doc(db, 'notes', id);
    try {
        await deleteDoc(noteRef);
        console.log('Note deleted:', id);
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};

const getAllNotes = async (userId) => {
    const notesCollection = collection(db, 'notes');
    const q = query(notesCollection, where('userId', '==', userId));

    try {
        const querySnapshot = await getDocs(q);
        const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Retrieved notes:', notes);
        return notes;
    } catch (error) {
        console.error('Error retrieving notes:', error);
    }
};

const getNoteById = async (id) => {
    const noteRef = doc(db, 'notes', id);

    try {
        const noteSnapshot = await getDoc(noteRef);
        if (noteSnapshot.exists()) {
            const noteData = { id: noteSnapshot.id, ...noteSnapshot.data() };
            console.log('Retrieved note:', noteData);
            return noteData;
        } else {
            console.log('No such note exists!');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
    }
};

export { createNote, updateNote, deleteNote, getAllNotes, getNoteById };
