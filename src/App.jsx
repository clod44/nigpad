import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Edit from './pages/Edit.jsx';
import Tags from './pages/Tags.jsx';
import NotFound from './pages/NotFound.jsx';
import NavbarComponent from './components/NavbarComponent';
import StatusBar from './components/StatusBar.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

function App() {


    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [tags, setTags] = useState(() => {
        const savedTags = localStorage.getItem('tags');
        return savedTags ? JSON.parse(savedTags) : [];
    });


    const addNote = (title, content, tags = []) => {
        const timestamp = Date.now();
        const newNote = {
            id: uuidv4(),
            title: title || "Untitled",
            content: content || "",
            timestamp: timestamp,
            lastUpdated: timestamp,
            tags: tags,
        };
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, newNote];
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
        return newNote;
    };
    const addTag = (title) => {
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

    const deleteNote = (id) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.filter((note) => note.id !== id);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    };
    const deleteTag = (id) => {
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

    const updateNote = (id, data) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === id) {
                    return { ...note, ...data, lastUpdated: Date.now() };
                }
                return note;
            });
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    };
    const updateTag = (id, title) => {
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
    const generateRandomNotes = () => {
        const getRandomTags = () => {
            const selectedTags = [];
            for (let i = 0; i < tags.length; i++) {
                if (Math.random() < 0.3) {
                    selectedTags.push(tags[i].id);
                }
            }
            return selectedTags;
        };

        const newNotes = [];
        for (let i = 0; i < 5; i++) {
            const title = faker.lorem.words(Math.floor(Math.random() * 3) + 1);
            const content = faker.lorem.paragraphs(Math.floor(Math.random() * 10) + 1);
            const newTags = getRandomTags();

            addNote(title, content, newTags);
        }
    };

    const generateRandomTags = () => {
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            const title = faker.lorem.words(Math.floor(Math.random() * 3) + 1);
            addTag(title);
        }
    };

    useEffect(() => {
        if (tags.length === 0) {
            //generateRandomTags();
        }
        //console.log("tags", tags)
    }, []);
    useEffect(() => {
        if (notes.length === 0) {
            //generateRandomNotes();
        }
        //console.log("notes", notes)
    }, [notes]);

    return (
        <main className={`text-foreground bg-background`}>
            <div className='w-full h-dvh overflow-hidden flex flex-col bg-gradient-to-b from-background to-primary-50'>
                <Router>
                    <NavbarComponent addNote={addNote} />
                    <Routes>
                        <Route path="/" element={<Home notes={notes} deleteNote={deleteNote} tags={tags} />} />
                        <Route path="/note/:id" element={<Edit notes={notes} updateNote={updateNote} tags={tags} />} />
                        <Route path="/Tags" element={<Tags notes={notes} tags={tags} addTag={addTag} updateTag={updateTag} deleteTag={deleteTag} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <StatusBar />
                </Router>
            </div>
        </main >
    );
}

export default App;
