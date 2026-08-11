import React, { useState } from 'react';
import { X, Star, Clock, Flame, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from './Badge';
import { MagneticButton } from './MagneticButton';
import { useAudioSound } from '../../hooks/useAudioSound';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCustomizer?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomizer,
}) => {
  const { playCrunchSound, playClickSound } = useAudioSound();
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedBag, setAddedBag] = useState(false);

  if (!product) return null;

  const handleAddToBag = () => {
    playCrunchSound();
    setAddedBag(true);
    setTimeout(() => {
      setAddedBag(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-[#120B08]/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#1D120D] border border-[#3A2318] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,140,41,0.25)] max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[70] w-10 h-10 rounded-full bg-[#120B08]/95 border-2 border-[#F3A83B] text-[#F3A83B] hover:bg-[#F3A83B] hover:text-[#120B08] flex items-center justify-center transition-all shadow-[0_0_20px_rgba(243,168,59,0.5)] cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Product Image Stage */}
        <div className="w-full md:w-1/2 relative bg-[#120B08] min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D120D] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1D120D]" />

          {/* Favorite Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 left-4 p-3 rounded-full bg-[#120B08]/80 border border-[#3A2318] text-[#FAF4EC] hover:text-[#F3A83B] transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#F3A83B] text-[#F3A83B]' : ''}`} />
          </button>

          {/* Quick Dietary Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {product.dietary.map((d) => (
              <Badge key={d} tag={d} />
            ))}
          </div>
        </div>

        {/* Product Details Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#F3A83B] uppercase tracking-widest font-syne">
                {product.category} COLLECTION
              </span>
              <div className="flex items-center gap-1 bg-[#120B08] px-3 py-1 rounded-full border border-[#3A2318] text-xs font-bold text-[#F3A83B]">
                <Star className="w-3.5 h-3.5 fill-[#F3A83B]" />
                {product.rating} ({product.reviewsCount} reviews)
              </div>
            </div>

            {/* Title & Tagline */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF4EC] leading-tight mb-2">
              {product.name}
            </h2>
            <p className="text-sm italic text-[#F3A83B]/90 mb-4 font-serif">
              "{product.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-[#D1C5B6] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Flavor Meters */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#120B08]/80 border border-[#3A2318] mb-6">
              <div>
                <div className="flex justify-between text-[11px] font-syne uppercase text-[#D1C5B6] mb-1">
                  <span>Sweetness Intensity</span>
                  <span className="font-bold text-[#F3A83B]">{product.sweetnessLevel}/5</span>
                </div>
                <div className="w-full h-1.5 bg-[#3A2318] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D48C29] to-[#F3A83B]"
                    style={{ width: `${(product.sweetnessLevel / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-syne uppercase text-[#D1C5B6] mb-1">
                  <span>Iron Crunch Index</span>
                  <span className="font-bold text-[#F3A83B]">{product.crunchLevel}/5</span>
                </div>
                <div className="w-full h-1.5 bg-[#3A2318] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D48C29] to-[#F3A83B]"
                    style={{ width: `${(product.crunchLevel / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Preparation Metrics */}
            <div className="flex items-center gap-6 text-xs text-[#D1C5B6] mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3A83B]" />
                <span>Cooked Live in {product.prepTimeMinutes} mins</span>
              </div>
              {product.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#F3A83B]" />
                  <span>{product.calories} kcal</span>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="text-xs font-bold text-[#FAF4EC] uppercase tracking-wider font-syne mb-2">
                Curated Ingredients:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 rounded-lg bg-[#2C1810] text-[#D1C5B6] text-[11px] border border-[#3A2318]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Order Action Bar */}
          <div className="pt-4 border-t border-[#3A2318] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#D1C5B6] font-syne uppercase tracking-widest block">Price per portion</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#F3A83B]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-serif text-sm text-[#D1C5B6] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {product.customizable && onOpenCustomizer && (
                <button
                  onClick={onOpenCustomizer}
                  className="px-4 py-3 rounded-full bg-[#2C1810] text-[#FAF4EC] hover:text-[#F3A83B] border border-[#3A2318] text-xs font-bold font-syne uppercase tracking-wider transition-colors"
                >
                  Customize
                </button>
              )}
              <MagneticButton
                variant="gold"
                size="md"
                onClick={handleAddToBag}
              >
                {addedBag ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Added to Order!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Order Fresh
                  </span>
                )}
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
