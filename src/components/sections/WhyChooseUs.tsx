import React from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Truck, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { CardTilt } from '../ui/CardTilt';
import { useAudioSound } from '../../hooks/useAudioSound';

export const WhyChooseUs: React.FC = () => {
  const { playHoverSound } = useAudioSound();

  const PILLARS = [
    {
      icon: Flame,
      title: '24H Slow Fermentation',
      desc: 'We never use artificial baking powder. Real Liege brioche dough requires 24 hours of cold slow fermentation to develop rich butter and yeast complexity.',
      stat: '24 HRS',
      statLabel: 'Fermentation Time'
    },
    {
      icon: Sparkles,
      title: '100% Belgian Pearl Sugar',
      desc: 'Imported directly from Liège. These thick beet sugar crystals withstand initial iron heat, melting into crunchy glass-caramel pockets as you bite.',
      stat: '100%',
      statLabel: 'Authentic Liege Sugar'
    },
    {
      icon: ShieldCheck,
      title: 'Single-Origin Valrhona Cocoa',
      desc: '70% dark single-origin dark cocoa melted in temperature-controlled Bain-Marie baths, creating an unforgettable silky dark chocolate cascade.',
      stat: '70%',
      statLabel: 'Dark Cacao Content'
    },
    {
      icon: Truck,
      title: 'Luxury Mobile Kitchen Lab',
      desc: 'Equipped with heavy Belgian cast-iron presses and brass fittings. Freshly pressed within 180 seconds right in front of your eyes.',
      stat: '180 SEC',
      statLabel: 'Pressing Speed'
    }
  ];

  return (
    <section className="py-24 bg-[#FFFBF5] border-y border-[#E8DCC9] relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#F9E2C7]/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#F9E2C7]/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-2">
            THE UNCOMPROMISING WOW STANDARD
          </span>
          <TextReveal
            text="Why Waffles On Wheels?"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#5C4538] leading-relaxed">
            Four core pillars that elevate street waffles into an award-winning luxury culinary experience.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <CardTilt key={p.title} className="h-full">
                <div
                  className="bg-white border border-[#EAE0D2] hover:border-[#D48C29] rounded-3xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_30px_rgba(212,140,41,0.15)]"
                  onMouseEnter={playHoverSound}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-[#FFF8EE] text-[#D48C29] border border-[#E8D0B3]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-display text-2xl font-black text-[#D48C29]/40">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#2C1810] mb-2">
                      {p.title}
                    </h3>

                    <p className="text-xs text-[#5C4538] leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  {/* Pillar Stat */}
                  <div className="pt-4 border-t border-[#EAE0D2]">
                    <div className="font-serif text-2xl font-extrabold text-[#D48C29]">
                      {p.stat}
                    </div>
                    <div className="text-[10px] text-[#8C7063] uppercase font-syne font-semibold">
                      {p.statLabel}
                    </div>
                  </div>

                </div>
              </CardTilt>
            );
          })}
        </div>

      </div>
    </section>
  );
};
