import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[250] pointer-events-none">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-gradient-to-r from-[#D48C29] via-[#F3A83B] to-[#FFE8A3] shadow-[0_1px_8px_rgba(243,168,59,0.7)]"
      />
    </div>
  );
};
