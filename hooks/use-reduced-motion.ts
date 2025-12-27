import { useState, useEffect } from 'react';

/**
 * useReducedMotion Hook
 *
 * Detects if user prefers reduced motion (accessibility setting).
 * Returns true if animations should be disabled/simplified.
 *
 * Usage:
 * const shouldReduce = useReducedMotion();
 * const transition = shouldReduce ? { duration: 0 } : springConfig;
 */
export function useReducedMotion() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setShouldReduce(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduce(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return shouldReduce;
}
