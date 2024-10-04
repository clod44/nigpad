import React from 'react';
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
import { NoteProvider } from './context/NoteProvider';

export default function App() {
    return (
        <main className="text-foreground bg-background">
            <div className='w-full h-dvh overflow-hidden flex flex-col bg-gradient-to-b from-background to-primary-50'>
                <Router>
                    <AuthListener>
                        <NoteProvider>
                            <NavbarComponent />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/note/:id" element={<Edit />} />
                                <Route path="/tags" element={<Tags />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <StatusBar />
                        </NoteProvider>
                    </AuthListener>
                </Router>
            </div>
        </main>
    );
}
