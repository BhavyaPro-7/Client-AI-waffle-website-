import React, { useRef, useEffect } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // e.g. -20 to 20
  className?: string;
  containerClassName?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 15,
  className = '',
  containerClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
        const offsetY = progress * speed * -1;
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          if (imgRef.current) {
            imgRef.current.style.transform = `translate3d(0, ${offsetY.toFixed(1)}px, 0) scale(1.1)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${containerClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-75 ease-out scale-110 will-change-transform ${className}`}
        style={{ transform: `translate3d(0, 0px, 0) scale(1.1)` }}
      />
    </div>
  );
};

