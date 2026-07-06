import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'blue' | 'emerald';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('blue');

  useEffect(() => {
    const stored = localStorage.getItem('mb-theme') as Theme;
    if (stored === 'blue' || stored === 'emerald') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('theme-blue', 'theme-emerald');
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('mb-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'blue' ? 'emerald' : 'blue'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
