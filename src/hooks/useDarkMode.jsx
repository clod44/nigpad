import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('dark-mode') === 'true');
    const [currentThemeIconName, setCurrentThemeIcon] = useState(isDarkMode ? 'Moon' : 'Sun');

    useEffect(() => {
        setCurrentThemeIcon(isDarkMode ? 'Moon' : 'Sun');
    }, [isDarkMode]);
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
        toggleDarkMode,
        currentThemeIconName
    };
};
export default useDarkMode;
