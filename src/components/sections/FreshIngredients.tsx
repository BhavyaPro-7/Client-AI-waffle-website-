import React from 'react';
import { BRAND_INFO } from '../../constants/data';
import { TextReveal } from '../ui/TextReveal';
import { Leaf, Flame, ShieldCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

export const FreshIngredients: React.FC = () => {
  const { playClickSound } = useAudioSound();

  const PILLARS = [
    {
      id: 'veg',
      title: '100% Pure Veg 🌱',
      subtitle: 'Zero Compromise On Purity',
      desc: 'Every single waffle batter, pancake, shake, brownie, and cheesecake is 100% eggless and vegetarian. Enjoy complete peace of mind with every bite.',
      icon: Leaf,
      badge: '100% Vegetarian',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'fresh',
      title: 'Made Fresh To Order 🧇',
      subtitle: 'Hot & Crispy Off The Press',
      desc: 'No pre-cooked waffles or stale reheating. We pour our fresh batter onto hot waffle irons the second you place your order for maximum crunch and melt.',
      icon: Flame,
      badge: 'Freshly Prepared',
      image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'value',
      title: 'Starting @ ₹60 💰',
      subtitle: 'Unbeatable Value In Every Bite',
      desc: 'Quality desserts shouldn\'t break the bank. With Mini Waffles starting at just ₹60 and full Loaded Bowls up to ₹250, get maximum happiness at friendly prices.',
      icon: ShieldCheck,
      badge: 'Under ₹250',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'hours',
      title: 'Open Till 2:00 AM 🌙',
      subtitle: 'Malad East\'s Favorite Night Spot',
      desc: 'Craving waffles at midnight? We are open 4:30 PM to 2:00 AM every single day opposite Gol Garden, Malad East with comfortable outdoor seating.',
      icon: Clock,
      badge: 'Late Night Spot',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <section id="highlights" className="py-24 bg-[#120B08] relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D48C29]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#4A2818]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#F3A83B] block mb-2">
            THE WAFFLES ON WHEELS DIFFERENCE
          </span>
          <TextReveal
            text="Why Foodies Love Us"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF4EC] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#D1C5B6]">
            {BRAND_INFO.description} Rated 4.6★ by dessert lovers across Malad East.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="h-full">
                <div
                  onClick={playClickSound}
                  className="group h-full bg-[#1D120D] border border-[#3A2318] hover:border-[#D48C29]/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#2C1810] border border-[#3A2318] flex items-center justify-center text-[#F3A83B] group-hover:scale-105 transition-transform shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#120B08] text-[#F3A83B] text-[10px] font-bold font-syne uppercase tracking-widest border border-[#3A2318]">
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold font-syne uppercase text-[#F3A83B] tracking-widest block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#FAF4EC] mb-3 group-hover:text-[#F3A83B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D1C5B6] leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#3A2318] shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120B08]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-syne text-[#FAF4EC] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Verified Quality Promise
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Location Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#2C1810] via-[#1D120D] to-[#2C1810] border border-[#3A2318] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D48C29] text-[#120B08] flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl text-[#FAF4EC]">
                Visit Us at Gol Garden, Malad East
              </h4>
              <p className="text-xs text-[#D1C5B6] mt-0.5">
                Sheetal Vaibhav Kutir, Opposite Gol Garden, Malad East, Mumbai – 400097
              </p>
            </div>
          </div>
          <a
            href="#location"
            onClick={playClickSound}
            className="px-6 py-3 rounded-full bg-[#D48C29] text-[#120B08] font-bold text-xs font-syne uppercase tracking-wider hover:bg-[#F3A83B] transition-colors whitespace-nowrap shadow-md"
          >
            Location & Timings
          </a>
        </div>

      </div>
    </section>
  );
};

