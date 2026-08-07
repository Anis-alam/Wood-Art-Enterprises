import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Dark Mode"
      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" size={22} />
      ) : (
        <Moon className="text-[#3E2723]" size={22} />
      )}
    </button>
  );
}
