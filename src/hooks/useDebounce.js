import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates (e.g., search queries).
 * @param {any} value - value to debounce
 * @param {number} delay - delay in milliseconds
 * @returns {any} debounced value
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
