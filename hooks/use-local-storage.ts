/**
 * useLocalStorage Hook
 *
 * Persist state to localStorage with TypeScript type safety.
 * Adapted from next-money-main for professional state management.
 *
 * Usage:
 * const [theme, setTheme] = useLocalStorage<string>("theme", "dark");
 * setTheme("light"); // Persists to localStorage automatically
 */

import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
