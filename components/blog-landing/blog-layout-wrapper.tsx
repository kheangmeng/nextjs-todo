'use client'

import React, { useCallback, useState, useEffect } from 'react';
import ScrollPopup from '@/components/scroll-popup';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function BlogLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMarkerIntersecting, targetRef] = useIntersectionObserver({
    // Threshold 0.01: Trigger as soon as 1% of the target element is visible
    threshold: 0.01,
  });

  // Effect to manage popup visibility based on the marker intersection
  useEffect(() => {
    if (isMarkerIntersecting && !hasScrolledToEnd) {
      // When the marker is hit for the first time
      setIsPopupVisible(true);
      setHasScrolledToEnd(true); // Prevent it from showing again on subsequent scrolls
    }
  }, [isMarkerIntersecting, hasScrolledToEnd]);

  // Reset the state for demo purposes (optional)
  const resetDemo = useCallback(() => {
    window.scrollTo(0, 0);
    setHasScrolledToEnd(false);
    setIsPopupVisible(false);
  }, []);

  return (
    <>
      {children}
      <div
        ref={targetRef}
        className="h-1 bg-transparent"
      >
      </div>
      <ScrollPopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
    </>
  )
}
