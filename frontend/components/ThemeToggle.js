import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <FaMoon className="text-gray-600" />
            ) : (
                <FaSun className="text-yellow-400" />
            )}
        </button>
    );
}
