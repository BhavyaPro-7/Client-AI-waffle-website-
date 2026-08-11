import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#1D120D] z-[100] overflow-hidden pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#D48C29] via-[#F3A83B] to-[#FAF4EC] transition-all duration-150 ease-out shadow-[0_0_12px_#F3A83B]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
