import { useEffect } from 'react';

// Global hook to clear the value of the currently focused input field on 'Escape'.
const useClearOnEscape = () => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const activeElement = (document.activeElement) as HTMLInputElement;

        const isTextInput =
          (activeElement?.tagName === 'INPUT' && activeElement.type !== 'submit' && activeElement.type !== 'button') ||
          activeElement?.tagName === 'TEXTAREA';

        if (isTextInput) {
          if (activeElement.value && activeElement.value.length > 0) {
            // Clear the value directly via DOM (works reliably for controlled/uncontrolled in this global hook)
            activeElement.value = '';

            // Stop propagation to prevent this 'Escape' from triggering other global listeners
            event.stopPropagation();
            event.preventDefault();
          }
        }
      }
    };

    // Use the capture phase (third argument: true) to ensure this listener fires before
    // others, giving it priority to stop the event if an input is cleared.
    window.addEventListener('keydown', handleKeydown, true);

    return () => window.removeEventListener('keydown', handleKeydown, true);
  }, []);
};

export default useClearOnEscape;
