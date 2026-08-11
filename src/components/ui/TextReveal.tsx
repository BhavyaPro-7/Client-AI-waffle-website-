import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerMs?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as = 'h2',
  staggerMs = 30,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  const Component = as as React.ElementType;

  return (
    <div ref={ref} className="overflow-hidden inline-block">
      <Component className={className}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span
              className="inline-block transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
                transitionDelay: `${wIdx * staggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    </div>
  );
};
