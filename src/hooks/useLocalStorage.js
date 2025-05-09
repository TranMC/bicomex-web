import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Optimized custom hook for localStorage to prevent memory leaks and excessive renders
 * @param {string} key - The key to store in localStorage
 * @param {any} initialValue - Initial value if no data exists in localStorage
 * @returns {Array} - [storedValue, setValue] similar to useState
 */
const useLocalStorage = (key, initialValue) => {
  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true);
  
  // Initialize state only once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Memoized setValue function to prevent unnecessary rerenders
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function for same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Set state
      setStoredValue(valueToStore);
      
      // Update localStorage without triggering another render
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Update localStorage only when storedValue changes and not on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;