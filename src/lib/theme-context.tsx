'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { themes, defaultThemeId, getTheme, type ThemeDefinition } from './themes';

const STORAGE_KEY = 'abs-theme';

interface ThemeContextValue {
  themeId: string;
  theme: ThemeDefinition;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(defaultThemeId);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && themes.some((t) => t.id === stored)) {
        setThemeIdState(stored);
        applyTheme(getTheme(stored));
      }
    } catch {
      // ignore (private browsing, etc.)
    }
  }, []);

  const setThemeId = useCallback((id: string) => {
    const theme = getTheme(id);
    setThemeIdState(theme.id);
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeId, theme: getTheme(themeId), setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useSiteTheme must be used within ThemeProvider');
  return ctx;
}
