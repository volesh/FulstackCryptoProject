import { useState, useLayoutEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'dark');

    useLayoutEffect(() => {
        document.documentElement.setAttribute('dataTheme', theme);
    }, [theme]);

    return { theme, setTheme };
};

export { useTheme };
