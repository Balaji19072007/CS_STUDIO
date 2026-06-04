// frontend/src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';
import * as feather from 'feather-icons';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // 1. Manage Body Classes (Legacy/Custom CSS support)
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');

    // 2. Manage HTML Classes (Standard Tailwind support)
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);

    // Initialize feather icons immediately
    if (typeof feather !== 'undefined' && feather.replace) {
      feather.replace();
    }

    // Also initialize after a short delay to catch any dynamically added icons
    const timer = setTimeout(() => {
      if (typeof feather !== 'undefined' && feather.replace) {
        feather.replace();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

