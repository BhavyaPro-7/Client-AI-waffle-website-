import React, { useState } from 'react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { X, Star, Clock, MapPin, Phone, HeartHandshake, Check } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

const TOPPINGS = [
  { id: 't1', name: 'Extra Nutella', price: 30 },
  { id: 't2', name: 'Kitkat Crunch', price: 20 },
  { id: 't3', name: 'Lotus Biscoff Crumble', price: 30 },
  { id: 't4', name: 'Brownie Crumbs', price: 20 },
  { id: 't5', name: 'Oreo Cookie Crumble', price: 20 },
  { id: 't6', name: 'Extra Dark Chocolate Drizzle', price: 20 },
];

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { playClickSound } = useAudioSound();
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  if (!product) return null;

  const toggleTopping = (name: string) => {
    playClickSound();
    setSelectedToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const toppingsTotal = selectedToppings.reduce((acc, name) => {
    const top = TOPPINGS.find((t) => t.name === name);
    return acc + (top ? top.price : 20);
  }, 0);

  const totalPrice = product.price + toppingsTotal;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#120B08]/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1D120D] border border-[#3A2318] rounded-3xl max-w-2xl w-full relative shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
      >
        {/* Prominent Glowing Close Button */}
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[70] w-10 h-10 rounded-full bg-[#120B08]/95 border-2 border-[#F3A83B] text-[#F3A83B] hover:bg-[#F3A83B] hover:text-[#120B08] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(243,168,59,0.5)] cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 relative bg-[#120B08] min-h-[220px] sm:min-h-[260px] md:min-h-full shrink-0">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D120D] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1D120D]" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-1 pr-12">
            {product.dietary.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Product Information Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#F3A83B]">
                {product.category} COLLECTION
              </span>
              <span className="text-xs font-bold text-[#F3A83B] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#F3A83B]" /> {product.rating}
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#FAF4EC] mb-2">
              {product.name}
            </h2>

            <p className="text-xs text-[#D1C5B6] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Preparation time & calories if available */}
            <div className="flex items-center gap-4 text-[11px] text-[#D1C5B6] py-3 border-y border-[#3A2318] mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F3A83B]" /> Fresh Press: ~3 mins
              </span>
              <span>•</span>
              <span className="text-[#F3A83B]">Single-Origin Cocoa</span>
            </div>

            {/* Extra Toppings Selector */}
            <div>
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#F3A83B] block mb-2">
                Add Extra Toppings:
              </span>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {TOPPINGS.slice(0, 6).map((top) => {
                  const isSelected = selectedToppings.includes(top.name);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top.name)}
                      className={`p-2 rounded-xl text-left border text-[11px] flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2C1810] border-[#F3A83B] text-[#FAF4EC]'
                          : 'bg-[#120B08] border-[#3A2318] text-[#D1C5B6]'
                      }`}
                    >
                      <span className="truncate">{top.name} (+₹{top.price})</span>
                      {isSelected && <Check className="w-3 h-3 text-[#F3A83B] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price & Store Order Action */}
          <div className="pt-4 border-t border-[#3A2318] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#D1C5B6] font-syne uppercase">Portion Price</div>
                <div className="font-serif text-2xl font-bold text-[#F3A83B]">
                  ₹{totalPrice}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#4ADE80] font-syne font-bold uppercase block">
                  Dine-In & Takeaway
                </span>
                <span className="text-[11px] text-[#D1C5B6]/80">
                  Malad East • Open till 2 AM
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="tel:9082987823"
                onClick={playClickSound}
                className="flex-1 py-3 rounded-2xl bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Phone className="w-4 h-4" /> Call to Place Order
              </a>
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                  document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 rounded-2xl bg-[#120B08] hover:bg-[#2C1810] border border-[#3A2318] text-[#FAF4EC] font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#F3A83B]" /> Visit Store Location
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
