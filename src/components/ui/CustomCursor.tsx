import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { CursorMode } from '../../types';

interface CustomCursorProps {
  cursorMode?: CursorMode;
  cursorText?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorMode: externalMode,
  cursorText: externalText,
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverMode, setHoverMode] = useState<CursorMode>('default');
  const [hoverText, setHoverText] = useState<string>('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer luxury aura ring
  const smoothOptions = { damping: 30, stiffness: 380, mass: 0.4 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    // Disable custom cursor on touch devices (phones/tablets)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Auto-detect interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor], [data-cursor-text]'
      ) as HTMLElement | null;

      if (clickable) {
        const customText = clickable.getAttribute('data-cursor-text');
        const customMode = clickable.getAttribute('data-cursor') as CursorMode | null;

        if (customText) {
          setHoverText(customText);
          setHoverMode(customMode || 'explore');
        } else if (customMode) {
          setHoverText('');
          setHoverMode(customMode);
        } else {
          setHoverText('');
          setHoverMode('hover');
        }
      } else {
        setHoverText('');
        setHoverMode('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  const currentMode = externalMode || hoverMode;
  const currentText = externalText || hoverText;

  if (currentMode === 'hidden') return null;

  // Visual variants for the outer luxury ring
  const getVariants = () => {
    const scaleFactor = isClicking ? 0.85 : 1;

    if (currentText) {
      return {
        width: 72,
        height: 72,
        scale: scaleFactor,
        backgroundColor: 'rgba(212, 140, 41, 0.92)',
        borderColor: '#FAF4EC',
        borderWidth: '1.5px',
        boxShadow: '0 0 25px rgba(243, 168, 59, 0.45)',
      };
    }

    switch (currentMode) {
      case 'hover':
      case 'magnetic':
        return {
          width: 52,
          height: 52,
          scale: scaleFactor,
          backgroundColor: 'rgba(212, 140, 41, 0.22)',
          borderColor: 'rgba(243, 168, 59, 0.95)',
          borderWidth: '1.5px',
          boxShadow: '0 0 20px rgba(212, 140, 41, 0.35)',
        };
      case 'drag':
      case 'explore':
        return {
          width: 76,
          height: 76,
          scale: scaleFactor,
          backgroundColor: 'rgba(212, 140, 41, 0.88)',
          borderColor: '#FAF4EC',
          borderWidth: '1px',
          boxShadow: '0 0 30px rgba(243, 168, 59, 0.5)',
        };
      default:
        return {
          width: 28,
          height: 28,
          scale: scaleFactor,
          backgroundColor: 'rgba(212, 140, 41, 0.12)',
          borderColor: 'rgba(212, 140, 41, 0.65)',
          borderWidth: '1px',
          boxShadow: '0 0 10px rgba(212, 140, 41, 0.15)',
        };
    }
  };

  return (
    <>
      {/* Outer Luxury Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center backdrop-blur-[2px] transition-opacity duration-300"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={getVariants()}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      >
        {currentText && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#120B08] px-2 text-center select-none font-syne drop-shadow-xs">
            {currentText}
          </span>
        )}

        {/* Corner luxury accent notches on hover */}
        {(currentMode === 'hover' || currentMode === 'magnetic') && !currentText && (
          <div className="absolute inset-0 rounded-full border border-dashed border-[#F3A83B]/40 animate-[spin_10s_linear_infinite] pointer-events-none" />
        )}
      </motion.div>

      {/* Center Precision Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#F3A83B] rounded-full pointer-events-none z-[100000] shadow-[0_0_12px_#F3A83B] transition-opacity duration-300"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.6 : currentMode === 'hover' ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </>
  );
};
