import React, { useState } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { ChevronRight } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

const CRAFT_STEPS = [
  {
    step: '01',
    title: '100% Pure Veg Batter',
    subtitle: 'Freshly Prepared Daily',
    description: 'Our proprietary batter recipe is 100% vegetarian & eggless. Mixed fresh every single day with top-grade ingredients to ensure lightweight, airy waffle interiors with maximum golden crunch on the outside.',
    accentText: 'Eggless Batter • Zero Preservatives',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800',
  },
  {
    step: '02',
    title: 'Hot Iron Pressing',
    subtitle: 'Baked To Order On High Heat',
    description: 'We pour batter onto Belgian-style waffle irons heated up to 210°C the moment you order. No pre-cooked waffles or stale reheating — every waffle is served piping hot with signature deep pocket ridges.',
    accentText: '210°C Precision Iron • Baked Fresh',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
  },
  {
    step: '03',
    title: 'Generous Drizzle & Toppings',
    subtitle: 'Premium Chocolates & Spreads',
    description: 'Generously loaded with authentic Nutella, Lotus Biscoff, melted dark & milk chocolates, Kitkat crunch, crushed Oreos, or fresh brownie crumbs based on your craving.',
    accentText: 'Nutella • Biscoff • Kitkat • Brownie',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
  },
  {
    step: '04',
    title: 'Bite Of Happiness',
    subtitle: 'Served Hot At Gol Garden',
    description: 'Handed to you warm and fresh right off the press. Enjoy late-night street dessert perfection opposite Gol Garden, Malad East, open daily till 2:00 AM.',
    accentText: 'Late Night Destination • Open Till 2 AM',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
  },
];

export const InteractiveStory: React.FC = () => {
  const { playCrunchSound, playClickSound } = useAudioSound();
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = CRAFT_STEPS[activeStep];

  return (
    <section id="story" className="py-24 bg-[#120B08] relative overflow-hidden perspective-1000">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D48C29]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#F3A83B] block mb-2">
            MADE FRESH EVERY SINGLE TIME
          </span>
          <TextReveal
            text="How Your Waffle Comes To Life"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF4EC] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#D1C5B6]">
            From 100% pure veg batter to the sizzle of iron presses and generous chocolate toppings.
          </p>
        </div>

        {/* Story Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1D120D] border border-[#3A2318] rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A2318] text-[#F3A83B] text-[10px] font-bold font-syne uppercase tracking-widest shadow-md">
              {currentStep.subtitle}
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF4EC] leading-tight">
              {currentStep.title}
            </h3>

            <p className="text-sm text-[#D1C5B6] leading-relaxed">
              {currentStep.description}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => {
                  playClickSound();
                  const nextIdx = (activeStep + 1) % CRAFT_STEPS.length;
                  if (nextIdx === 1) playCrunchSound();
                  setActiveStep(nextIdx);
                }}
                className="px-6 py-3 rounded-full bg-[#2C1810] hover:bg-[#3A2318] text-[#FAF4EC] hover:text-[#F3A83B] border border-[#D48C29]/40 text-xs font-bold font-syne uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Next Step ({activeStep + 1}/{CRAFT_STEPS.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Stage */}
          <div className="lg:col-span-7 relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-[#120B08] border border-[#3A2318] group shadow-xl">
            <img
              key={currentStep.image}
              src={currentStep.image}
              alt={currentStep.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B08]/90 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="font-display font-black text-4xl text-[#D48C29]/40 select-none">
                {currentStep.step}
              </span>
              <span className="text-xs text-[#FAF4EC] bg-[#120B08]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3A2318] font-syne uppercase shadow-md">
                {currentStep.title}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
