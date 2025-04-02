import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  mousePosition: { x: number | null; y: number | null };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosition }) => {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Listen for mouseover on clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };
    
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  // Define cursor variants
  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      x: mousePosition.x ? mousePosition.x - 16 : 0,
      y: mousePosition.y ? mousePosition.y - 16 : 0,
      backgroundColor: "rgba(120, 0, 255, 0.15)",
      mixBlendMode: "screen" as const,
      borderColor: "rgba(120, 0, 255, 0.5)",
      borderWidth: "2px",
      boxShadow: "0 0 15px rgba(120, 0, 255, 0.3)",
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x ? mousePosition.x - 32 : 0,
      y: mousePosition.y ? mousePosition.y - 32 : 0,
      backgroundColor: "rgba(75, 192, 192, 0.15)",
      mixBlendMode: "screen" as const,
      borderColor: "rgba(75, 192, 192, 0.7)",
      borderWidth: "2px",
      boxShadow: "0 0 20px rgba(75, 192, 192, 0.5)",
      scale: 1.1,
    }
  };
  
  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {isVisible && mousePosition.x !== null && mousePosition.y !== null && (
        <>
          {/* Main cursor */}
          <motion.div
            className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 border-2 flex items-center justify-center"
            initial={cursorVariants.default}
            animate={cursorVariant}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 28, 
              mass: 0.5 
            }}
          >
            {cursorVariant === 'hover' && (
              <motion.div 
                className="h-2 w-2 bg-accent rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
          
          {/* Trailing cursor effect */}
          <motion.div
            className="custom-cursor-trail fixed top-0 left-0 rounded-full pointer-events-none z-50 opacity-30"
            style={{
              height: cursorVariant === 'hover' ? 20 : 10,
              width: cursorVariant === 'hover' ? 20 : 10,
              backgroundColor: cursorVariant === 'hover' ? "rgba(75, 192, 192, 0.3)" : "rgba(120, 0, 255, 0.3)",
              boxShadow: cursorVariant === 'hover' ? "0 0 10px rgba(75, 192, 192, 0.5)" : "0 0 10px rgba(120, 0, 255, 0.3)",
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: mousePosition.x ? mousePosition.x - (cursorVariant === 'hover' ? 10 : 5) : 0,
              y: mousePosition.y ? mousePosition.y - (cursorVariant === 'hover' ? 10 : 5) : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20, 
              mass: 1,
              delay: 0.05
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
