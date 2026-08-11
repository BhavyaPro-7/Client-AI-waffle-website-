import React from 'react';
import { BRAND_INFO } from '../../constants/data';
import { MapPin, Instagram, Phone, Clock } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useAudioSound } from '../../hooks/useAudioSound';

export const Footer: React.FC = () => {
  const { playClickSound } = useAudioSound();

  return (
    <footer className="relative bg-[#0C0705] border-t border-[#3A2318] pt-16 pb-12 overflow-hidden text-[#D1C5B6]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#D48C29]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Typography Statement */}
        <div className="pb-12 border-b border-[#3A2318] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#F3A83B] block mb-2">
              100% VEG 🌱 • FRESH TO ORDER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF4EC] leading-none tracking-tight">
              A Bite Of <span className="gold-gradient-text">Happiness.</span>
            </h2>
            <p className="text-xs text-[#D1C5B6]/80 mt-2">
              {BRAND_INFO.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#menu"
              onClick={playClickSound}
              className="px-6 py-3 rounded-full bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#F3A83B] transition-colors text-center"
            >
              Explore Full Menu
            </a>
            <a
              href="#location"
              onClick={playClickSound}
              className="px-6 py-3 rounded-full bg-[#1D120D] border border-[#3A2318] text-[#FAF4EC] font-syne font-bold text-xs uppercase tracking-wider hover:border-[#D48C29] transition-colors text-center"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[#3A2318]">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="mb-4">
              <BrandLogo size="lg" />
            </div>
            <p className="text-xs text-[#D1C5B6]/80 leading-relaxed mb-4">
              {BRAND_INFO.description} Rated 4.6★ by dessert lovers in Malad East.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-syne font-bold text-[#F3A83B] bg-[#120B08] px-3.5 py-2 rounded-xl border border-[#3A2318]">
              <span>100% Veg 🌱</span>
            </div>
          </div>

          {/* Col 2: Hours & Status */}
          <div>
            <h5 className="text-xs font-bold font-syne uppercase tracking-widest text-[#FAF4EC] mb-4">
              OPENING HOURS
            </h5>
            <div className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#F3A83B] font-bold">
                <Clock className="w-4 h-4" />
                <span>Monday to Sunday</span>
              </div>
              <div className="text-[#FAF4EC] font-serif font-bold text-sm">
                4:30 PM – 2:00 AM
              </div>
              <p className="text-[10px] text-[#D1C5B6]/70">
                Perfect spot for late night waffle & shake cravings!
              </p>
            </div>
          </div>

          {/* Col 3: Location */}
          <div>
            <h5 className="text-xs font-bold font-syne uppercase tracking-widest text-[#FAF4EC] mb-4">
              OUR LOCATION
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F3A83B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif font-bold text-[#FAF4EC]">Sheetal Vaibhav Kutir</div>
                  <div className="text-[#D1C5B6]/80">Opposite Gol Garden, Malad East, Mumbai – 400097</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div>
            <h5 className="text-xs font-bold font-syne uppercase tracking-widest text-[#FAF4EC] mb-4">
              CONTACT & SOCIALS
            </h5>
            <div className="space-y-3 text-xs mb-4">
              {BRAND_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-[#FAF4EC] hover:text-[#F3A83B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F3A83B]" />
                  <span>{phone}</span>
                </a>
              ))}
            </div>

            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#120B08] border border-[#3A2318] hover:border-[#D48C29] text-xs text-[#FAF4EC] hover:text-[#F3A83B] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#F3A83B]" />
              <span>{BRAND_INFO.instagram}</span>
            </a>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D1C5B6]/60 gap-4 font-syne text-center sm:text-left">
          <div>
            {BRAND_INFO.copyright}
          </div>
          <div className="text-[11px] text-[#F3A83B]">
            All items under ₹250 • Made fresh every time
          </div>
        </div>

      </div>
    </footer>
  );
};
