import React from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useAudioSound } from '../../hooks/useAudioSound';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magneticStrength?: number;
  className?: string;
  onCursorHover?: (text?: string) => void;
  onCursorLeave?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.35,
  className = '',
  onCursorHover,
  onCursorLeave,
  onClick,
  ...props
}) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(magneticStrength);
  const { playHoverSound, playClickSound } = useAudioSound();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider',
    md: 'px-6 py-3 text-sm font-bold tracking-wider',
    lg: 'px-8 py-4 text-base font-bold tracking-widest',
    xl: 'px-10 py-5 text-lg font-extrabold tracking-widest',
  };

  const variantClasses = {
    primary: 'bg-[#D48C29] text-[#120B08] hover:bg-[#F3A83B] shadow-[0_4px_20px_rgba(212,140,41,0.35)] hover:shadow-[0_6px_30px_rgba(243,168,59,0.5)]',
    secondary: 'bg-[#3A2318] text-[#FAF4EC] hover:bg-[#4A2818] border border-[#D48C29]/30 hover:border-[#D48C29]',
    outline: 'bg-transparent text-[#FAF4EC] border border-[#D48C29]/50 hover:border-[#F3A83B] hover:text-[#F3A83B] hover:bg-[#D48C29]/10',
    ghost: 'bg-transparent text-[#FAF4EC] hover:text-[#F3A83B]',
    gold: 'bg-gradient-to-r from-[#F3A83B] via-[#D48C29] to-[#9E5F12] text-[#120B08] font-black shadow-[0_4px_25px_rgba(212,140,41,0.4)] hover:brightness-110',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHoverSound();
    if (onCursorHover) onCursorHover('CLICK');
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onCursorLeave) onCursorLeave();
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={magneticRef}
      className={`relative inline-flex items-center justify-center rounded-full uppercase transition-all duration-300 transform active:scale-95 cursor-pointer font-syne ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
