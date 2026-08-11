import React from 'react';
import { PRODUCTS } from '../../constants/data';
import { CardTilt } from '../ui/CardTilt';
import { Badge } from '../ui/Badge';
import { TextReveal } from '../ui/TextReveal';
import { Star } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

export const FeaturedProducts: React.FC = () => {
  const { playHoverSound } = useAudioSound();
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <section className="py-24 bg-[#FFFBF5] relative overflow-hidden border-b border-[#E8DCC9]">
      
      {/* Soft Warm Glow Backing */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F3A83B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D48C29] font-syne block mb-2">
              CURATED DESSERT MASTERPIECES
            </span>
            <TextReveal
              text="The Featured Collection"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810]"
            />
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#5C4538] leading-relaxed">
            Every item in our featured gallery is hand-assembled live inside our mobile truck, utilizing 24-hour slow-fermented dough and single-origin cocoa.
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <CardTilt key={product.id} className="h-full">
              <div
                className="group relative h-full bg-white border border-[#EAE0D2] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D48C29] hover:shadow-[0_15px_35px_rgba(212,140,41,0.15)]"
                onMouseEnter={playHoverSound}
              >
                {/* Image Stage */}
                <div className="relative h-72 overflow-hidden bg-[#FAF4EB]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                    {product.dietary.map((tag) => (
                      <Badge key={tag} tag={tag} />
                    ))}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#120B08]/85 border border-[#3A2318] backdrop-blur-md text-xs font-bold text-[#F3A83B] flex items-center gap-1 z-10 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#F3A83B]" />
                    {product.rating}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2C1810] group-hover:text-[#D48C29] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5C4538] line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8C7063] font-syne uppercase tracking-wider block">Portion</span>
                      <span className="font-serif text-2xl font-bold text-[#D48C29]">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </CardTilt>
          ))}
        </div>

      </div>
    </section>
  );
};
