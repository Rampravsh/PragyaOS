import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useClickOutside } from '@pragyaos/hooks';
import { THEME_STORAGE_KEY } from '@/core/theme/theme.constants';
import { cn } from '@pragyaos/utils';

/**
 * ThemeToggle dropdown component.
 * Allows switching between Marketing Light, Marketing Dark, and System Preferences.
 * Uses useClickOutside from @pragyaos/hooks to manage popup toggling.
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme, systemPreference } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const isSystemActive = !window.localStorage.getItem(THEME_STORAGE_KEY);

  const handleSelect = (mode: 'light' | 'dark' | 'system') => {
    if (mode === 'system') {
      // Clear cache so ThemeProvider defaults to prefers-color-scheme dynamically
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      setTheme(systemPreference === 'dark' ? 'marketing-dark' : 'marketing-light');
    } else if (mode === 'light') {
      setTheme('marketing-light');
    } else {
      setTheme('marketing-dark');
    }
    setIsOpen(false);
  };

  // Determine active visual state label
  const getActiveLabel = () => {
    if (isSystemActive) return 'System';
    return theme === 'marketing-dark' ? 'Dark' : 'Light';
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border/80 hover:border-foreground/40 rounded-sm text-xs font-sans font-medium tracking-wide uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 text-foreground bg-background"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change theme. Current theme is ${getActiveLabel()}`}
      >
        <span>Theme: {getActiveLabel()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={cn(
            'transition-transform duration-normal ease-in-out',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-1.5 w-32 bg-background border border-border rounded-sm shadow-md py-1 z-[1010] text-xs font-sans"
          role="listbox"
          aria-label="Theme options"
        >
          <li>
            <button
              onClick={() => handleSelect('light')}
              className={cn(
                'w-full text-left px-3 py-2 hover:bg-muted text-foreground transition-colors font-medium',
                !isSystemActive && theme === 'marketing-light' && 'text-primary font-semibold bg-muted/60'
              )}
              role="option"
              aria-selected={!isSystemActive && theme === 'marketing-light'}
            >
              Light
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelect('dark')}
              className={cn(
                'w-full text-left px-3 py-2 hover:bg-muted text-foreground transition-colors font-medium',
                !isSystemActive && theme === 'marketing-dark' && 'text-primary font-semibold bg-muted/60'
              )}
              role="option"
              aria-selected={!isSystemActive && theme === 'marketing-dark'}
            >
              Dark
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelect('system')}
              className={cn(
                'w-full text-left px-3 py-2 hover:bg-muted text-foreground transition-colors font-medium',
                isSystemActive && 'text-primary font-semibold bg-muted/60'
              )}
              role="option"
              aria-selected={isSystemActive}
            >
              System
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ThemeToggle;
