import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeContextProps, ThemeVariant } from '@/core/theme/theme.types';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/core/theme/theme.constants';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider controls application theme states and coordinates sync with localStorage and system styles.
 */
export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  // 1. System preference detection helper
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme());

  // 2. Initial state resolution with localStorage -> system -> default fallback
  const [theme, setThemeState] = useState<ThemeVariant>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeVariant;
    if (stored) return stored;

    // Resolve system preferences into semantic variants (default is marketing)
    return getSystemTheme() === 'dark' ? 'marketing-dark' : 'marketing-light';
  });

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  // 3. Sync theme class/attribute to the DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);

    // Synchronize Tailwind standard .dark class selector for dark-mode plugins/primitives compatibility
    const isDark = theme === 'marketing-dark' || theme === 'workspace-dark';
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // 4. Listen to system preference shifts dynamically
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const systemMode = e.matches ? 'dark' : 'light';
      setSystemTheme(systemMode);
      
      // Auto-switch theme if the user hasn't explicitly set a preference in local storage
      const hasPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!hasPreference) {
        setThemeState(systemMode === 'dark' ? 'marketing-dark' : 'marketing-light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemPreference: systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Access context parameters of Theme state management.
 */
export function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
