import { useState, useEffect } from 'react';

/**
 * Custom hook to persist state in localStorage
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 * @returns A stateful value and a function to update it, just like useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get initial state from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if window is defined (SSR safety)
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);
      
      // Check if window is defined (SSR safety)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
