import React, { useState } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Flame, Clock, Thermometer, ShieldCheck, Play } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

export const MakingProcess: React.FC = () => {
  const { playCrunchSound, playClickSound } = useAudioSound();
  const [isPlaying, setIsPlaying] = useState(false);

  const STEPS = [
    {
      num: '01',
      title: 'Precision Temperature Iron Pre-Heat',
      desc: 'Our heavy Belgian cast iron plates are calibrated to exactly 210°C (410°F), ensuring immediate caramelization without burning.',
      metric: '210°C Iron Temp'
    },
    {
      num: '02',
      title: 'Dough Placement & Sugar Press',
      desc: 'A dense 110g portion of slow-fermented yeast dough folded with imported Belgian pearl sugar is pressed for exactly 180 seconds.',
      metric: '180 Sec Cook Time'
    },
    {
      num: '03',
      title: 'Liquid Cocoa Drizzle Bath',
      desc: 'Freshly emerged golden Liege is immediately drizzled with 70% single-origin dark Belgian cocoa kept warm in Bain-Marie containers.',
      metric: '70% Valrhona Dark'
    }
  ];

  return (
    <section className="py-24 bg-[#FFFBF5] border-y border-[#E8DCC9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-2">
            THE ART OF LIVE PRESSING
          </span>
          <TextReveal
            text="The 180-Second Golden Transformation"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#5C4538] leading-relaxed">
            Every portion is pressed live upon order. Experience the crunch of hot caramelized pearl sugar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Video Preview Box */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#120B08] border border-[#EAE0D2] h-96 sm:h-[460px] group shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200"
              alt="Live Iron Pressing"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-110 brightness-75' : 'brightness-50 group-hover:scale-105'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B08] via-transparent to-transparent opacity-80" />

            {/* Play Trigger */}
            <button
              onClick={() => {
                playCrunchSound();
                setIsPlaying(!isPlaying);
              }}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-[0_0_30px_rgba(212,140,41,0.6)] cursor-pointer animate-pulse-subtle"
            >
              <Play className="w-8 h-8 fill-[#120B08] ml-1" />
            </button>

            {/* Live Meter Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#120B08]/85 border border-[#3A2318] backdrop-blur-md flex items-center justify-between text-xs text-[#FAF4EC]">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#F3A83B]" />
                <span>Cast Iron: <strong className="text-[#F3A83B]">210°C</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3A83B]" />
                <span>Timer: <strong className="text-[#F3A83B]">03:00 mins</strong></span>
              </div>
            </div>
          </div>

          {/* Process Timeline Steps */}
          <div className="lg:col-span-6 space-y-6">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="p-6 rounded-2xl bg-white border border-[#EAE0D2] hover:border-[#D48C29] transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-black text-xl text-[#D48C29]">
                    {s.num}. {s.title}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#FFF8EE] text-[#D48C29] text-[10px] font-mono font-semibold border border-[#E8D0B3]">
                    {s.metric}
                  </span>
                </div>
                <p className="text-xs text-[#5C4538] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
