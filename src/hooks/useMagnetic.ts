import { useRef, useEffect } from 'react';

export function useMagnetic<T extends HTMLElement>(strength: number = 0.35) {
  const ref = useRef<T>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      node.style.transform = `translate3d(0px, 0px, 0)`;
      node.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    const handleMouseEnter = () => {
      node.style.transition = 'transform 0.1s ease-out';
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);
    node.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
}

