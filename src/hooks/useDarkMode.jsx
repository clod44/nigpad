import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('dark-mode') === 'true');
    const [currentThemeIconName, setCurrentThemeIcon] = useState(isDarkMode ? 'Moon' : 'Sun');

    useEffect(() => {
        setCurrentThemeIcon(isDarkMode ? 'Moon' : 'Sun');
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('dark-mode', newMode);
    };

    return {
        isDarkMode,
        toggleDarkMode,
        currentThemeIconName
    };
};

export default useDarkMode;
