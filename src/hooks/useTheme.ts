import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** The theme the visitor explicitly picked, or null if they never toggled it. */
const readSavedTheme = (): ThemeMode | null => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null; // storage blocked (private mode / sandboxed iframe)
  }
};

const systemTheme = (): ThemeMode => (window.matchMedia?.(DARK_QUERY).matches ? 'dark' : 'light');

const readInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return readSavedTheme() ?? systemTheme();
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);

  // Apply the theme to <html> (no storage write here: only an explicit toggle is remembered).
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#FAFAFA');
  }, [theme]);

  // Follow OS light/dark changes until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;
    const onChange = () => {
      if (!readSavedTheme()) setTheme(systemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
