import { useState, useEffect, createContext } from 'react';
import { updateNote, deleteNote, getNoteById } from '../services/noteService';
import useAuth from '../hooks/useAuth';
import { notify } from "../context/ToastContext";

export const CurrentNoteContext = createContext();

export const CurrentNoteProvider = ({ children }) => {
    const [currentNote, setCurrentNote] = useState(null);
    const [showMarkdown, setShowMarkdown] = useState(false);
    const [OwnerIsUser, setOwnerIsUser] = useState(false);
    const { user } = useAuth();

    const SetNewCurrentNoteWithId = async (id) => {
        setOwnerIsUser(false);
        const fetchedNote = await getNoteById(id);
        if (fetchedNote) {
            if (user?.uid !== fetchedNote?.userId) {
                setOwnerIsUser(false);
                setShowMarkdown(true);
                notify("You are viewing a stranger's public note.");
            } else {
                setOwnerIsUser(true);
            }
            setCurrentNote(fetchedNote);
        } else {
            notify("Note not found", { type: "error" });
        }
    };

    const UpdateCurrentNote = (data) => {
        setCurrentNote((prevNote) => ({
            ...prevNote,
            ...data,
        }));
    };

    useEffect(() => {
        if (!currentNote) return;
        UpdateServerNote();
    }, [currentNote]);

    const UpdateServerNote = async () => {
        if (!currentNote || !user) return;
        await updateNote(currentNote?.id, currentNote);
    };

    const DeleteCurrentNote = async () => {
        if (!currentNote || !user) return;
        await deleteNote(currentNote?.id);
    };

    return (
        <CurrentNoteContext.Provider value={{
            currentNote,
            setCurrentNote,
            UpdateCurrentNote,
            UpdateServerNote,
            DeleteCurrentNote,
            showMarkdown,
            setShowMarkdown,
            SetNewCurrentNoteWithId,
            OwnerIsUser
        }}>
            {children}
        </CurrentNoteContext.Provider>
    );
};
