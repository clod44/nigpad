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
import { ToastProvider } from './context/ToastContext.jsx';
import { NoteProvider } from './context/NoteContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

export default function App() {
    return (
        <main className='text-foreground bg-background'>
            <div className='w-full h-dvh overflow-hidden flex flex-col from-foreground-300 dark:from-background to-primary-100 dark:to-primary-50 bg-gradient-to-br'>
                <Router>
                    <ToastProvider>
                        <AuthListener>
                            <NoteProvider>
                                <SearchProvider>
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
                                </SearchProvider>
                            </NoteProvider>
                        </AuthListener>
                    </ToastProvider>
                </Router>
            </div>
        </main>
    );
}
