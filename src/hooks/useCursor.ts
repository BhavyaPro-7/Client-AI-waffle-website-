import { useState, useEffect } from 'react';
import { CursorMode } from '../types';

export function useCursor() {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setCursor = (mode: CursorMode, text: string = '') => {
    setCursorMode(mode);
    setCursorText(text);
    if (mode !== 'default') {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  const resetCursor = () => {
    setCursorMode('default');
    setCursorText('');
    setIsHovered(false);
  };

  return {
    cursorPos,
    cursorMode,
    cursorText,
    isHovered,
    setCursor,
    resetCursor,
  };
}
