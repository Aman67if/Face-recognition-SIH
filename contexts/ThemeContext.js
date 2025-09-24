"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';



const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  const useSystemTheme = () => {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      // Set the initial theme based on the system setting
      setTheme(getSystemTheme());

      // Listen for changes to the system's theme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleThemeChange);

      // Cleanup event listener when component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleThemeChange);
      };
    }
  }, []); // This effect runs once after the component mounts

  return theme;
};

  const actualTheme = theme === 'system' ? useSystemTheme() : theme;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
  }, [actualTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}