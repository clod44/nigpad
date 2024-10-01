import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthListener = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

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
