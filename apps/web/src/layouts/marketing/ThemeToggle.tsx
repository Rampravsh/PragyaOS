import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { THEME_STORAGE_KEY } from '@/core/theme/theme.constants';
import { cn } from '@pragyaos/utils';

/**
 * Custom ThemeToggle sliding switch matching the design's premium aesthetic.
 * A rounded pill containing a yellow sun icon and a purple moon icon,
 * with a white circle sliding knob indicating the active mode.
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme, systemPreference } = useTheme();

  const isSystemActive = !window.localStorage.getItem(THEME_STORAGE_KEY);
  const isDark =
    (!isSystemActive && theme === 'marketing-dark') ||
    (isSystemActive && systemPreference === 'dark');

  const toggleTheme = () => {
    if (isDark) {
      setTheme('marketing-light');
    } else {
      setTheme('marketing-dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-14 h-7 rounded-full p-1 bg-stone-200 border border-stone-300/80 cursor-pointer flex items-center justify-between transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 select-none',
        isDark && 'bg-[#1e1b4b] border-indigo-950'
      )}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      {/* Sun Icon (Left) */}
      <span className="flex items-center justify-center w-5 h-5 z-10 pl-0.5">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isDark ? '#94A3B8' : '#F59E0B'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        >
          <circle cx="12" cy="12" r="5" fill={isDark ? 'none' : '#F59E0B'} />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Moon Icon (Right) */}
      <span className="flex items-center justify-center w-5 h-5 z-10 pr-0.5">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={isDark ? '#C084FC' : 'none'}
          stroke={isDark ? '#C084FC' : '#94A3B8'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sliding white knob */}
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        aria-hidden="true"
      >
        {/* Subtle inner center dot on the knob for a 3D dial effect */}
        <span className="w-1.5 h-1.5 rounded-full bg-stone-100/50" />
      </motion.div>
    </button>
  );
}

export default ThemeToggle;
