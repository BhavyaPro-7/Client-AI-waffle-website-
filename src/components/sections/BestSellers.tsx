import React from 'react';
import { PRODUCTS } from '../../constants/data';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { Star, Award } from 'lucide-react';

interface BestSellersProps {
  onOpenCustomizer: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onOpenCustomizer }) => {
  const bestsellers = PRODUCTS.filter((p) => p.bestseller);

  return (
    <section id="bestsellers" className="py-24 bg-[#180E09] border-y border-[#3A2318] relative perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D48C29]/20 text-[#F3A83B] text-xs font-bold font-syne uppercase tracking-widest mb-4 shadow-3d card-3d-hover">
            <Award className="w-3.5 h-3.5" /> Iconic Crowd Favorites
          </div>
          <TextReveal
            text="Our Award-Winning Best Sellers"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF4EC] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#D1C5B6]">
            Over 50,000 portions served live in Malad East. Tested and perfected with authentic Belgian chocolates.
          </p>
        </div>

        {/* Bestseller Grid with 3D CardTilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <CardTilt key={product.id} maxTilt={14} className="h-full">
              <div
                className="group h-full bg-[#1D120D] border border-[#3A2318] hover:border-[#D48C29] rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between shadow-3d hover:shadow-3d-lg preserve-3d"
              >
                <div className="preserve-3d">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-[#120B08] shadow-inner translate-z-12">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 translate-z-20">
                      <Badge tag="BESTSELLER" size="sm" />
                    </div>
                    <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-[#120B08]/80 text-[#F3A83B] text-[10px] font-bold font-mono flex items-center gap-1 backdrop-blur-md translate-z-20 shadow-md">
                      <Star className="w-3 h-3 fill-[#F3A83B]" /> {product.rating}
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#FAF4EC] group-hover:text-[#F3A83B] transition-colors mb-1 line-clamp-1 translate-z-20">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#D1C5B6]/80 line-clamp-2 mb-4 translate-z-12">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3A2318] flex items-center justify-between translate-z-20">
                  <span className="font-serif text-xl font-bold text-[#F3A83B]">
                    ₹{product.price}
                  </span>
                </div>

              </div>
            </CardTilt>
          ))}
        </div>

        {/* Customizer Callout Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#2C1810] via-[#3A2318] to-[#2C1810] border border-[#D48C29]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF4EC] mb-2">
              Desire Something Custom?
            </h3>
            <p className="text-xs sm:text-sm text-[#D1C5B6] max-w-xl">
              Mix and match waffle bases, warm Belgian dips, gourmet sprinkles, and rich ice cream in our live 3D customizer.
            </p>
          </div>
          <MagneticButton variant="gold" size="lg" onClick={onOpenCustomizer}>
            Open Waffle Atelier
          </MagneticButton>
        </div>

      </div>
    </section>
  );
};
