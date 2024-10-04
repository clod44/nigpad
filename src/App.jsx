import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthListener from './components/AuthListener.jsx';
import Home from './pages/Home.jsx';
import Edit from './pages/Edit.jsx';
import Tags from './pages/Tags.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';

import NavbarComponent from './components/NavbarComponent';
import StatusBar from './components/StatusBar.jsx';

import { createNote, updateNote, deleteNote, getNoteById, getAllNotes } from './services/noteService';
import { createTag, updateTag, deleteTag, getTagById, getAllTags } from './services/tagService';
import useAuth from './hooks/useAuth';

function App() {
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const { user, userLoading } = useAuth();

    const updateNotes = async () => {
        if (!user) return;
        const _notes = await getAllNotes(user?.uid);
        const _tags = await getAllTags(user?.uid);
        setTags(_tags || []);
        setNotes(_notes || []);
    }
    useEffect(() => {
        async function fetchData() {
            await updateNotes();
        }
        fetchData();
    }, [user, userLoading]);


    const handleCreateNote = async () => {
        const noteId = await createNote(user?.uid);
        await updateNotes();
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

    const handleCreateTag = async (title = "New Tag") => {
        const tagId = await createTag(user?.uid, title);
        await updateNotes();
        return tagId;
    };
    const handleDeleteTag = async (id) => {
        await deleteTag(id);
        await updateNotes();
    };
    const handleUpdateTag = async (id, data) => {
        await updateTag(id, data);
        await updateNotes();
    };

    return (
        <main className={`text-foreground bg-background`}>
            <div className='w-full h-dvh overflow-hidden flex flex-col bg-gradient-to-b from-background to-primary-50'>
                <Router>
                    <AuthListener>
                        <NavbarComponent handleCreateNote={handleCreateNote} />
                        <Routes>
                            <Route path="/" element={
                                <Home
                                    notes={notes}
                                    handleUpdateNote={handleUpdateNote}
                                    handleDeleteNote={handleDeleteNote}
                                    tags={tags}
                                />
                            } />

                            <Route path="/note/:id" element={
                                <Edit
                                    notes={notes}
                                    handleUpdateNote={handleUpdateNote}
                                    tags={tags}
                                />
                            } />
                            <Route path="/tags" element={
                                <Tags
                                    notes={notes}
                                    tags={tags}
                                    handleCreateTag={handleCreateTag}
                                    handleUpdateTag={handleUpdateTag}
                                    handleDeleteTag={handleDeleteTag}
                                />
                            } />
                            <Route path="/profile" element={
                                <Profile />
                            } />
                            <Route path="/login" element={
                                <Login />
                            } />
                            <Route path="*" element={
                                <NotFound />
                            } />

                        </Routes>
                        <StatusBar />
                    </AuthListener>
                </Router>
            </div>
        </main >
    );
}

export default App;
