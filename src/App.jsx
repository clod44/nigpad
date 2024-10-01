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

import { v4 as uuidv4 } from 'uuid';

import { createNote, updateNote, deleteNote, getNoteById, getAllNotes } from './services/noteService';
import useAuth from './hooks/useAuth';

function App() {

    const [notes, setNotes] = useState([]);
    const { user, userLoading } = useAuth();

    const updateNotes = async () => {
        if (!user) return;
        const _notes = await getAllNotes(user.uid);
        setNotes(_notes || []);
    }
    useEffect(() => {
        async function fetchData() {
            await updateNotes();
        }
        fetchData();
    }, [user, userLoading]);


    const addNote = async () => {
        console.log(user)
        const noteId = createNote({ userId: user.uid });
        await updateNotes();
        return noteId;
    };
    const deleteNote = (id) => {
        deleteNote(id);
        updateNotes();
    };
    const updateNote = (id, data) => {
        updateNote(id, data);
        updateNotes();
    };

    //TODO:cloud-sync tags
    const [tags, setTags] = useState(() => {
        return;
        const savedTags = localStorage.getItem('tags');
        return savedTags ? JSON.parse(savedTags) : [];
    });
    const addTag = (title) => {
        return;
        const timestamp = Date.now();
        const newTag = {
            id: uuidv4(),
            title: title || "New category",
            timestamp: timestamp
        };
        setTags((prevTags) => {
            const updatedTags = [...prevTags, newTag];
            localStorage.setItem('tags', JSON.stringify(updatedTags));
            return updatedTags;
        });
        return newTag;
    };
    const deleteTag = (id) => {
        return;
        const notesWithTag = notes.filter((note) => note.tags.includes(id));
        //remove that tag from those notes
        notesWithTag.forEach((note) => {
            note.tags = note.tags.filter((tag) => tag !== id);
            updateNote(note.id, { tags: note.tags });
        })

        setTags((prevTags) => {
            const updatedTags = prevTags.filter((tag) => tag.id !== id);
            localStorage.setItem('tags', JSON.stringify(updatedTags));
            return updatedTags;
        });
    };
    const updateTag = (id, title) => {
        return;
        setTags((prevTags) => {
            const updatedTags = prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, title };
                }
                return tag;
            });
            localStorage.setItem('tags', JSON.stringify(updatedTags));
            return updatedTags;
        });
    };

    return (
        <main className={`text-foreground bg-background`}>
            <div className='w-full h-dvh overflow-hidden flex flex-col bg-gradient-to-b from-background to-primary-50'>
                <Router>
                    <AuthListener>
                        <NavbarComponent addNote={addNote} />
                        <Routes>
                            <Route path="/" element={<Home notes={notes} updateNote={updateNote} deleteNote={deleteNote} />} />
                            <Route path="/note/:id" element={<Edit notes={notes} updateNote={updateNote} tags={tags} />} />
                            <Route path="/tags" element={<Tags notes={notes} tags={tags} addTag={addTag} updateTag={updateTag} deleteTag={deleteTag} />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <StatusBar />
                    </AuthListener>
                </Router>
            </div>
        </main >
    );
}

export default App;
