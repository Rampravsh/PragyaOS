import { useEffect, useRef, useState } from "react";

// Hook to detect clicks outside a specific element
export const useClickOutside = <T extends HTMLElement>(
  callback: () => void
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback]);

  return ref;
};

// Hook to track window inner dimensions
export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Hook to persist and synchronize state in local storage
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// ─── useScrollY ───────────────────────────────────────────────────────────────
// Tracks window.scrollY with a passive event listener.
// Used by MarketingHeader to transition from transparent → frosted glass.
// Returns current vertical scroll position in pixels.
export const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState<number>(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

// ─── useMediaQuery ────────────────────────────────────────────────────────────
// Evaluates a CSS media query string reactively.
// Used by MarketingHeader to switch between desktop nav and mobile hamburger.
//
// Example:
//   const isMobile = useMediaQuery("(max-width: 767px)");
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);
    if (mediaList.addEventListener) {
      mediaList.addEventListener("change", handleChange);
      return () => mediaList.removeEventListener("change", handleChange);
    } else {
      mediaList.addListener(handleChange);
      return () => mediaList.removeListener(handleChange);
    }
  }, [query]);

  return matches;
};
