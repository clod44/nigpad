import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('dark-mode') === 'true');

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('dark-mode', newMode);
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, []); // Runs once to sync mode on load

    return {
        isDarkMode,
        toggle: toggleDarkMode
    };
};

export default useDarkMode;
