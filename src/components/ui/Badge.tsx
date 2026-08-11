import React from 'react';
import { DietaryTag } from '../../types';

interface BadgeProps {
  tag: DietaryTag | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ tag, size = 'sm', className = '' }) => {
  const getBadgeStyle = (t: string) => {
    switch (t) {
      case 'BESTSELLER':
        return 'bg-gradient-to-r from-[#D48C29] to-[#F3A83B] text-[#120B08] font-black border-none shadow-[0_0_12px_rgba(212,140,41,0.5)]';
      case 'NEW':
        return 'bg-[#4A2818] text-[#F3A83B] border border-[#F3A83B]/40';
      case 'CHEF_SPECIAL':
        return 'bg-[#2C1810] text-[#FAF4EC] border border-[#D48C29]/60 font-semibold';
      case 'VEG':
        return 'bg-[#102B18] text-[#4ADE80] border border-[#4ADE80]/30';
      case 'EGGLESS':
        return 'bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/30';
      default:
        return 'bg-[#1D120D] text-[#D1C5B6] border border-[#3A2318]';
    }
  };

  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-syne uppercase tracking-wider ${sizeClass} ${getBadgeStyle(tag)} ${className}`}
    >
      {tag === 'VEG' && <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />}
      {tag === 'BESTSELLER' && <span className="text-[10px]">★</span>}
      {tag.replace('_', ' ')}
    </span>
  );
};
