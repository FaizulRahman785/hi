import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'card' | 'text'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }
    
    setIsTouch(false);
    document.body.classList.add('has-custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setCursorState('pointer');
      } else if (target.closest('[data-cursor="card"]')) {
        setCursorState('card');
      } else if (target.tagName.toLowerCase() === 'h1' || target.tagName.toLowerCase() === 'h2') {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseOut = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  const getRingVariants = () => {
    switch (cursorState) {
      case 'pointer':
        return { width: 48, height: 48, backgroundColor: 'transparent', border: '2px solid hsl(var(--primary))', scale: 1.1 };
      case 'card':
        return { width: 64, height: 64, backgroundColor: 'transparent', border: '2px dashed hsl(var(--primary))', scale: 1 };
      case 'text':
        return { width: 2, height: 32, backgroundColor: 'hsl(var(--primary))', border: 'none', borderRadius: '0', y: 16 };
      default:
        return { width: 32, height: 32, backgroundColor: 'transparent', border: '1px solid hsl(var(--primary))', borderRadius: '50%', scale: 1, y: 0 };
    }
  };

  const getDotVariants = () => {
    switch (cursorState) {
      case 'pointer':
        return { width: 8, height: 8 };
      case 'text':
        return { opacity: 0 };
      default:
        return { width: 12, height: 12, opacity: 1 };
    }
  };

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getDotVariants()}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getRingVariants()}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full blur-[20px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
          backgroundColor: 'var(--glow-color)',
          opacity: cursorState === 'pointer' ? 0.8 : 0.3
        }}
      />
    </>
  );
}
