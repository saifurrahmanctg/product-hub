'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) return (
        <div className="size-9 p-2"></div>
    );

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#4c669a] dark:text-gray-400 hover:text-primary dark:hover:text-white"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {theme === 'dark' ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>
    );
}
