// ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animating, setAnimating] = useState(false);
  const [clipPath, setClipPath] = useState<string>('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hs_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = stored || (systemDark ? 'dark' : 'light');
    setTheme(defaultTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
    setClipPath(`circle(0px at ${clientX}px ${clientY}px)`);
    setAnimating(true);

    requestAnimationFrame(() => {
      setClipPath(`circle(${maxRadius}px at ${clientX}px ${clientY}px)`);

      setTimeout(() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('hs_theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        setAnimating(false);
      }, 500);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="relative">
        {animating && (
          <div
            ref={overlayRef}
            className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            }`}
            style={{
              clipPath,
              WebkitClipPath: clipPath,
              pointerEvents: 'none'
            }}
          />
        )}
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider');
  return ctx;
};
