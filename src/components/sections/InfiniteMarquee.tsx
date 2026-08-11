import React from 'react';

export const InfiniteMarquee: React.FC = () => {
  const MARQUEE_TEXTS = [
    'ARTISANAL LIEGE WAFFLES',
    '70% BELGIAN VALRHONA COCOA',
    'SLOW-FERMENTED BRIOCHE',
    'CARAMELIZED PEARL SUGAR',
    'ITALIAN NUTELLA CASCADE',
    'ORGANIC STRAWBERRIES',
    '24K EDIBLE GOLD LEAF',
    'LUXURY MOBILE KITCHEN',
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#FFF8EE] via-[#FCEAD2] to-[#FFF8EE] border-y border-[#E8D0B3] py-5 overflow-hidden select-none shadow-inner">
      <div className="animate-marquee flex items-center whitespace-nowrap gap-12">
        {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="font-serif text-xl sm:text-2xl font-black uppercase tracking-widest text-[#2C1810] hover:text-[#D48C29] transition-colors cursor-default">
              {text}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D48C29] shadow-[0_0_8px_rgba(212,140,41,0.6)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
