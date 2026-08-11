import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Gift, ArrowRight, Clock, Percent, ShieldCheck } from 'lucide-react';
import { useMenuAndOffers } from '../../context/MenuAndOffersContext';
import { useAudioSound } from '../../hooks/useAudioSound';

export const OffersSection: React.FC = () => {
  const { offers, loadingOffers } = useMenuAndOffers();
  const { playClickSound, playSuccessSound } = useAudioSound();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.active);

  const handleCopyCode = (code: string) => {
    playSuccessSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (loadingOffers || activeOffers.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-[#120B08] border-y border-[#2C1810] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D48C29]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D48C29]/20 border border-[#D48C29]/40 text-[#F3A83B] text-xs font-syne font-bold uppercase tracking-wider mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>Exclusive Deals & Promo Offers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-syne font-extrabold text-[#FAF4EC]">
              Hot Offers & Discount Codes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A89083] max-w-md">
            Apply these special codes at checkout or mention them at our Malad food truck to enjoy instant savings!
          </p>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeOffers.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="group relative bg-[#1C120C] border border-[#2C1810] hover:border-[#D48C29]/60 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-syne font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#D48C29] text-[#120B08] shadow-xs">
                    {offer.badgeText || 'SPECIAL OFFER'}
                  </span>
                  {offer.discountPercentage && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                      <Percent className="w-3 h-3" /> {offer.discountPercentage}% OFF
                    </span>
                  )}
                  {offer.discountAmount && (
                    <span className="text-xs font-bold text-amber-400">
                      ₹{offer.discountAmount} OFF
                    </span>
                  )}
                </div>

                {/* Offer Details */}
                <div className="mb-4">
                  <h3 className="text-base font-syne font-bold text-[#FAF4EC] mb-1.5 group-hover:text-[#F3A83B] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#A89083] leading-relaxed line-clamp-3">
                    {offer.description}
                  </p>
                </div>

                {/* Code Box & Validity */}
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-[#A89083] mb-2 font-mono">
                    <Clock className="w-3 h-3 text-[#D48C29]" />
                    <span>Valid: {offer.validTill || 'Ongoing'}</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-[#120B08] border border-dashed border-[#D48C29]/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 pl-1">
                      <Tag className="w-3.5 h-3.5 text-[#D48C29]" />
                      <span className="font-mono font-extrabold text-sm text-[#F3A83B] tracking-wider">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-[#2C1810] hover:bg-[#D48C29] text-[#FAF4EC] hover:text-[#120B08]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
