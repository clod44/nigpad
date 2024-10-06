import { useState, useEffect, createContext } from 'react';
import { updateNote, deleteNote } from '../services/noteService';
import useAuth from '../hooks/useAuth';

export const CurrentNoteContext = createContext();

export const CurrentNoteProvider = ({ children }) => {
    const [currentNote, setCurrentNote] = useState(null);
    const [showMarkdown, setShowMarkdown] = useState(false);
    const { user, userLoading } = useAuth();

    const SetCurrentNoteId = (id) => {
        if (!id) return;
        const note = user?.notes?.find((note) => note.id === id);
        setCurrentNote(note);
    };

    const UpdateCurrentNote = async (data) => {
        if (!currentNote || !user) return;
        await updateNote(currentNote?.id, data);
    };

    const DeleteCurrentNote = async () => {
        if (!currentNote || !user) return;
        await deleteNote(currentNote?.id);
    };

    return (
        <CurrentNoteContext.Provider value={{ currentNote, setCurrentNote, UpdateCurrentNote, DeleteCurrentNote, showMarkdown, setShowMarkdown }}>
            {children}
        </CurrentNoteContext.Provider>
    );
};
