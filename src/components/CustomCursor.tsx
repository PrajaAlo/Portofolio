import { useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorX = useSpring(mousePosition.x - 16, springConfig);
  const cursorY = useSpring(mousePosition.y - 16, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        width: 32,
        height: 32,
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full border border-white/50 flex items-center justify-center"
        animate={{ scale: isHovering ? 1.5 : 1, opacity: isHovering ? 0.3 : 1 }}
        transition={{ duration: 0.2 }}
      >
         <motion.div 
           className="w-1.5 h-1.5 bg-white rounded-full" 
           animate={{ scale: isHovering ? 0 : 1 }}
         />
      </motion.div>
    </motion.div>
  );
}
