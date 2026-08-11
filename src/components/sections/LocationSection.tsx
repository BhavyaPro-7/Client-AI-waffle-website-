import React from 'react';
import { BRAND_INFO } from '../../constants/data';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { MapPin, Navigation, Clock, Phone, CheckCircle2, Instagram, HeartHandshake } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

interface LocationSectionProps {
  onOpenCateringModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenCateringModal,
}) => {
  const { playClickSound } = useAudioSound();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Sheetal Vaibhav Kutir Opposite Gol Garden Malad East Mumbai 400097'
  )}`;

  return (
    <section id="location" className="py-24 bg-[#120B08] relative overflow-hidden perspective-1000">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D48C29]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C1810] border border-[#F3A83B]/40 text-[#F3A83B] text-[10px] font-bold font-syne uppercase tracking-widest mb-3 shadow-3d card-3d-hover">
            <MapPin className="w-3.5 h-3.5 text-[#4ADE80]" /> VISIT US IN MALAD EAST
          </div>
          <TextReveal
            text="Where To Find Us"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF4EC] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#D1C5B6]">
            Opposite Gol Garden, Malad East, Mumbai. Serving fresh hot waffles, shakes & pancakes every evening till 2:00 AM.
          </p>
        </div>

        {/* Location Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Location Details */}
          <div className="lg:col-span-5 h-full bg-[#1D120D] border border-[#3A2318] p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] shadow-md">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-syne text-xs uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Open Today 4:30 PM - 2:00 AM
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF4EC]">
                  {BRAND_INFO.name}
                </h3>
                <p className="text-xs text-[#D1C5B6] mt-1">
                  {BRAND_INFO.description}
                </p>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <div className="text-xs font-bold font-syne uppercase tracking-widest text-[#F3A83B]">
                  Exact Address:
                </div>
                <div className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] flex items-start gap-3 shadow-md">
                  <MapPin className="w-5 h-5 text-[#F3A83B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-sm text-[#FAF4EC]">
                      Sheetal Vaibhav Kutir
                    </div>
                    <div className="text-xs text-[#D1C5B6] mt-0.5 leading-relaxed">
                      Opposite Gol Garden, Malad East, Mumbai – 400097
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours & Dietary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#120B08] border border-[#3A2318]">
                  <div className="text-[10px] font-syne font-bold uppercase text-[#F3A83B]">Hours</div>
                  <div className="font-bold text-xs text-[#FAF4EC] mt-1">4:30 PM – 2:00 AM</div>
                  <div className="text-[10px] text-[#D1C5B6]/70">Monday to Sunday</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#120B08] border border-[#3A2318]">
                  <div className="text-[10px] font-syne font-bold uppercase text-[#F3A83B]">Dietary</div>
                  <div className="font-bold text-xs text-[#FAF4EC] mt-1">100% Pure Veg 🌱</div>
                  <div className="text-[10px] text-[#D1C5B6]/70">Eggless Recipes</div>
                </div>
              </div>

              {/* Phone Contacts */}
              <div className="space-y-2">
                <div className="text-xs font-bold font-syne uppercase tracking-widest text-[#F3A83B]">
                  Call / WhatsApp Orders:
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {BRAND_INFO.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      onClick={playClickSound}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#120B08] border border-[#3A2318] hover:border-[#F3A83B] text-xs font-bold text-[#FAF4EC] flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F3A83B]" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Private Events CTA */}
            <div className="mt-8 pt-6 border-t border-[#3A2318]">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCateringModal();
                }}
                className="w-full py-3 rounded-2xl bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" /> Party & Event Orders Inquiry
              </button>
            </div>

          </div>

          {/* Right Column: Embedded Interactive Google Map */}
          <div className="lg:col-span-7 h-full bg-[#120B08] border border-[#3A2318] rounded-3xl overflow-hidden relative min-h-[440px] flex flex-col justify-between shadow-2xl group">
            
            {/* Map Header Overlay */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between bg-[#1D120D] border-b border-[#3A2318]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#D48C29] text-[#120B08] flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#FAF4EC]">
                    Opposite Gol Garden
                  </div>
                  <div className="text-xs text-[#D1C5B6]">
                    Sheetal Vaibhav Kutir, Malad East, Mumbai – 400097
                  </div>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="px-3.5 py-2 rounded-xl bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] text-xs font-syne font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" /> Open Maps
              </a>
            </div>

            {/* Real Embedded Google Map iFrame */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#120B08]">
              <iframe
                title="Waffles On Wheels Google Map Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  'Sheetal Vaibhav Kutir Opposite Gol Garden Malad East Mumbai 400097'
                )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 filter contrast-105 saturate-110"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Highlights Bar */}
            <div className="relative z-10 p-4 sm:p-6 bg-[#1D120D] border-t border-[#3A2318] grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <span className="text-[10px] text-[#D1C5B6] font-syne uppercase tracking-wider block">Dietary</span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#4ADE80]">100% Veg 🌱</span>
              </div>
              <div>
                <span className="text-[10px] text-[#D1C5B6] font-syne uppercase tracking-wider block">Timings</span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#FAF4EC]">4:30 PM - 2:00 AM</span>
              </div>
              <div>
                <span className="text-[10px] text-[#D1C5B6] font-syne uppercase tracking-wider block">Ratings</span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#F3A83B]">4.9★ (500+ Reviews)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
