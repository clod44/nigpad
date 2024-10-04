import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthListener = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const isLoggedIn = Boolean(user);

            if (isLoggedIn) {
                if (location.pathname === '/login') {
                    navigate('/profile');
                }
            } else {
                if (location.pathname === '/profile') {
                    navigate('/login');
                }
            }
        });

        return () => unsubscribe();
    }, [auth, navigate, location.pathname]);

    return <>{children}</>;
};

export default AuthListener;
