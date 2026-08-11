import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../constants/data';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { Eye, X, Sparkles, Heart } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

export const Gallery: React.FC = () => {
  const { playClickSound } = useAudioSound();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const TABS = [
    { id: 'all', label: 'All Photos' },
    { id: 'waffles', label: 'Iron Waffles' },
    { id: 'truck', label: 'The Mobile Truck' },
    { id: 'events', label: 'Catering Events' },
  ];

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 bg-[#FFFBF5] relative overflow-hidden perspective-1000 border-t border-[#E8DCC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-2">
            VISUAL GALLERY
          </span>
          <TextReveal
            text="Moments Pressed in Golden Cocoa"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#5C4538] leading-relaxed">
            Take a look inside our live waffle truck kitchen, private catering setups, and hot freshly pressed creations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id);
              }}
              className={`px-5 py-2 rounded-full text-xs font-syne font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#D48C29] text-white shadow-sm'
                  : 'bg-white text-[#5C4538] border border-[#EAE0D2] hover:border-[#D48C29]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid in 3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <CardTilt key={item.id} maxTilt={14} className="h-80">
              <div
                onClick={() => {
                  playClickSound();
                  setLightboxImage(item);
                }}
                className="group relative h-full rounded-3xl overflow-hidden bg-white border border-[#EAE0D2] cursor-pointer shadow-sm hover:shadow-md transition-all duration-500 hover:border-[#D48C29] preserve-3d"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Overlay Content in 3D */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform translate-z-20">
                  <div>
                    <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#F3A83B] block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white">
                      {item.title}
                    </h4>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#D48C29] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md translate-z-30">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </CardTilt>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-[#120B08]/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1D120D] border border-[#3A2318] rounded-3xl overflow-hidden max-w-4xl w-full relative shadow-2xl animate-fade-in"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#120B08]/80 text-[#FAF4EC] flex items-center justify-center hover:bg-[#D48C29] hover:text-[#120B08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-96 sm:h-[480px]">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-[#120B08] flex items-center justify-between">
                <div>
                  <span className="text-xs font-syne uppercase tracking-widest text-[#F3A83B]">
                    {lightboxImage.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#FAF4EC]">
                    {lightboxImage.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#D1C5B6]">
                  <Sparkles className="w-4 h-4 text-[#F3A83B]" /> Freshly Captured
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
