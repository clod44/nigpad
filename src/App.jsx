import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home.jsx';
import Edit from './pages/Edit.jsx';
import StatusBar from './components/StatusBar.jsx';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

function App() {
    const [currentNote, setCurrentNote] = useState(null);
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const addNote = (title, content) => {
        const newNote = {
            id: uuidv4(),
            title: title || "",
            content: content || "",
            timestamp: Date.now(),
            lastUpdated: Date.now()
        };
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, newNote];
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
        console.log("aaa")
        return newNote.id;
    };

    const deleteNote = (id) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.filter((note) => note.id !== id);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    };

    const updateNote = (id, title, content) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === id) {
                    return { ...note, title, content, lastUpdated: Date.now() };
                }
                return note;
            });
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
        setCurrentNote(notes.find((note) => note.id === id));
    };


    const generateRandomNotes = () => {
        const newNotes = [];
        for (let i = 0; i < 5; i++) {
            const title = faker.lorem.words(2);
            const content = faker.lorem.paragraphs(2);
            newNotes.push({ id: uuidv4(), title, content, timestamp: Date.now() });
        }
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, ...newNotes];
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    };

    useEffect(() => {
        if (notes.length === 0) {
            generateRandomNotes();
        }
    }, [notes]);

    return (
        <div className='w-full h-dvh overflow-hidden flex flex-col bg-gradient-to-b from-background to-primary-50'>
            <Router>
                <NavbarComponent addNote={addNote} />
                <Routes>
                    <Route path="/" element={<Home notes={notes} deleteNote={deleteNote} setCurrentNote={setCurrentNote} />} />
                    <Route path="/note/:id" element={<Edit notes={notes} updateNote={updateNote} setCurrentNote={setCurrentNote} />} />
                </Routes>
                <StatusBar currentNote={currentNote} setCurrentNote={setCurrentNote} />
            </Router>
        </div>
    );
}

export default App;
