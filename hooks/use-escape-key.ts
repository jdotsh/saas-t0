import { useEffect } from 'react';

/**
 * useEscapeKey Hook
 *
 * Triggers callback when Escape key is pressed.
 * Useful for closing modals, dropdowns, mobile menus.
 *
 * Usage:
 * useEscapeKey(() => setIsOpen(false));
 */
export function useEscapeKey(handler: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler, enabled]);
}
