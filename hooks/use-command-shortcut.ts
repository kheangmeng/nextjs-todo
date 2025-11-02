'use client'

import { useCallback, useEffect } from 'react';

export const useCommandShortcut = ({key, modifier, callback}: {key: string, modifier: string, callback: () => void}) => {
  const handler = useCallback((event: KeyboardEvent) => {
    // Check if the primary key matches (case-insensitive for 'k')
    if (event.key.toLowerCase() !== key.toLowerCase()) return;

    // Determine if the required modifier (Cmd/Win or Ctrl) is pressed
    const isModifierPressed = event.metaKey || event.ctrlKey;

    if (isModifierPressed) {
      event.preventDefault(); // Prevent browser defaults (like bookmarking)
      callback();
    }
  }, [key, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [handler]);
};
