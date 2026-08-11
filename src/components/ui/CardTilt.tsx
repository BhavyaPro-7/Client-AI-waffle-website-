import React, { useRef, useEffect } from 'react';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = '',
  maxTilt = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.1s ease-out';
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${glowX.toFixed(1)}% ${glowY.toFixed(1)}%, rgba(243, 168, 59, 0.12), transparent 40%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu preserve-3d will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Dynamic Hover Glow Overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 opacity-0 hover:opacity-100"
      />
    </div>
  );
};

