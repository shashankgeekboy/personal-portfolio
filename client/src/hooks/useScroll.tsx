import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollPercent: number;
  direction: 'up' | 'down' | null;
}

export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollPercent: 0,
    direction: null,
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;
    
    setScrollPosition({
      scrollY: currentScrollY,
      scrollPercent: scrollPercent,
      direction: currentScrollY > lastScrollY ? 'down' : 'up',
    });
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return scrollPosition;
};
