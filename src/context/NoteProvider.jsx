import { useState, useEffect, createContext } from 'react';
import { createNote, updateNote, deleteNote, getAllNotes } from '../services/noteService';
import { createTag, updateTag, deleteTag, getAllTags } from '../services/tagService';
import useAuth from '../hooks/useAuth';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const { user, userLoading } = useAuth();

    // Fetch notes and tags when user is available
    const updateNotes = async () => {
        if (!user) return;
        const _notes = await getAllNotes(user.uid);
        const _tags = await getAllTags(user.uid);
        setNotes(_notes || []);
        setTags(_tags || []);
    };

    useEffect(() => {
        if (!userLoading && user) {
            updateNotes();
        }
    }, [user, userLoading]);

    // Handlers for notes
    const [canCreateNote, setCanCreateNote] = useState(true);
    const handleCreateNote = async () => {
        if (!canCreateNote) return;
        setCanCreateNote(false);
        const noteId = await createNote(user.uid);
        await updateNotes();
        setCanCreateNote(true);
        return noteId;
    };

    const handleUpdateNote = async (id, data) => {
        await updateNote(id, data);
        await updateNotes();
    };

    const handleDeleteNote = async (id) => {
        await deleteNote(id);
        await updateNotes();
    };

    // Handlers for tags
    const handleCreateTag = async (title = 'New Tag') => {
        const tagId = await createTag(user.uid, title);
        await updateNotes();
        return tagId;
    };

    const handleUpdateTag = async (id, data) => {
        await updateTag(id, data);
        await updateNotes();
    };

    const handleDeleteTag = async (id) => {
        await deleteTag(id);
        await updateNotes();
    };

    return (
        <NoteContext.Provider value={{ notes, tags, handleCreateNote, handleUpdateNote, handleDeleteNote, handleCreateTag, handleUpdateTag, handleDeleteTag }}>
            {children}
        </NoteContext.Provider>
    );
};
