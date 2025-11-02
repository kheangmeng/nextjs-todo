'use client'

import React, { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}): [boolean, React.RefObject<HTMLDivElement| null>] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update the state based on whether the target is currently intersecting
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to unobserve and disconnect
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [options.root, options.rootMargin, options.threshold]); // eslint-disable-line react-hooks/exhaustive-deps

  return [isIntersecting, targetRef];
};
