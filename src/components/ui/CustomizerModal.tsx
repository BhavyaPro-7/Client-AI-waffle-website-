import React, { useState } from 'react';
import { X, Sparkles, Check, ChefHat, Volume2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useAudioSound } from '../../hooks/useAudioSound';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({ isOpen, onClose }) => {
  const { playCrunchSound, playClickSound } = useAudioSound();

  const BASES = [
    { id: 'b-liege', name: 'Slow-Fermented Liege Dough', price: 9.00, desc: 'With caramelized Belgian Pearl Sugar pockets' },
    { id: 'b-stick', name: 'Crispy Waffle Stick', price: 7.50, desc: 'Hot golden stick pressed for portable luxury' },
    { id: 'b-bubble', name: 'Hong-Kong Bubble Iron', price: 10.50, desc: 'Light spherical iron waffle pocket' },
  ];

  const DIPS = [
    { id: 'd-dark', name: '70% Belgian Dark Cocoa', price: 2.50, desc: 'Rich Valrhona single-origin' },
    { id: 'd-nutella', name: 'Warm Italian Nutella Cascade', price: 2.50, desc: 'Creamy roasted hazelnut cocoa' },
    { id: 'd-caramel', name: 'Fleur de Sel Salted Caramel', price: 2.00, desc: 'Smoked French sea salt caramel' },
  ];

  const TOPPINGS = [
    { id: 't-hazelnut', name: 'Roasted Piedmont Hazelnuts', price: 1.50 },
    { id: 't-berries', name: 'Fresh Farm Strawberries', price: 2.00 },
    { id: 't-oreo', name: 'Crushed Oreo Midnight Dust', price: 1.50 },
    { id: 't-pistachio', name: 'Sicilian Pistachio Praline', price: 2.50 },
    { id: 't-gold', name: '24K Edible Gold Leaf', price: 5.00 },
  ];

  const SCOOPS = [
    { id: 's-none', name: 'No Gelato Scoop', price: 0 },
    { id: 's-vanilla', name: 'Madagascar Vanilla Bean Gelato', price: 3.50 },
    { id: 's-cocoa', name: 'Single Origin Dark Cocoa Sorbet', price: 3.50 },
  ];

  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedDip, setSelectedDip] = useState(DIPS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['t-hazelnut']);
  const [selectedScoop, setSelectedScoop] = useState(SCOOPS[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleTopping = (id: string) => {
    playClickSound();
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = selectedBase.price + selectedDip.price + selectedScoop.price;
    selectedToppings.forEach((tId) => {
      const top = TOPPINGS.find((t) => t.id === tId);
      if (top) total += top.price;
    });
    return total;
  };

  const handleSaveBuild = () => {
    playCrunchSound();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-[#120B08]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#1D120D] border border-[#3A2318] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,140,41,0.2)] max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#120B08]/80 text-[#FAF4EC] hover:text-[#F3A83B] flex items-center justify-center border border-[#3A2318] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Interactive 3D Visualizer Preview */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-[#2C1810] to-[#120B08] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#3A2318]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D48C29]/20 text-[#F3A83B] text-xs font-bold font-syne uppercase tracking-widest mb-4">
              <ChefHat className="w-3.5 h-3.5" /> WOW Atelier
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF4EC] leading-tight mb-2">
              Custom Artisan Build
            </h3>
            <p className="text-xs text-[#D1C5B6]">
              Simulate your dream waffle layer-by-layer. Freshly pressed to order in our mobile truck kitchen.
            </p>
          </div>

          {/* Layer Graphic Stack */}
          <div className="my-8 relative h-56 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 rounded-2xl bg-[#120B08] border border-[#D48C29]/30 flex items-center justify-center p-4 shadow-2xl transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=600"
                alt="Waffle Base"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 scale-105 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#120B08]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Dynamic Overlay Badges */}
              <div className="absolute -bottom-3 inset-x-2 flex flex-wrap justify-center gap-1">
                <span className="px-2 py-0.5 rounded-full bg-[#D48C29] text-[#120B08] font-black text-[9px] font-syne uppercase">
                  {selectedBase.name.split(' ')[0]}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#4A2818] text-[#F3A83B] border border-[#F3A83B]/30 font-bold text-[9px] font-syne uppercase">
                  {selectedDip.name.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Total Price Card */}
          <div className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#D1C5B6] font-syne uppercase tracking-wider block">Estimated Price</span>
              <span className="font-serif text-2xl font-bold text-[#F3A83B]">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button 
              onClick={playCrunchSound}
              className="p-2.5 rounded-xl bg-[#3A2318] text-[#FAF4EC] hover:text-[#F3A83B] transition-colors"
              title="Test Iron Sizzle Sound"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Configuration Options */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Step 1: Base */}
          <div>
            <h4 className="text-xs font-bold text-[#F3A83B] uppercase tracking-widest font-syne mb-3">
              1. Choose Waffle Foundation
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {BASES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedBase(b);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedBase.id === b.id
                      ? 'bg-[#2C1810] border-[#D48C29] text-[#FAF4EC] shadow-[0_0_15px_rgba(212,140,41,0.2)]'
                      : 'bg-[#120B08]/60 border-[#3A2318] text-[#D1C5B6] hover:border-[#D48C29]/40'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold font-syne text-[#FAF4EC]">{b.name}</div>
                    <div className="text-xs text-[#D1C5B6]/70">{b.desc}</div>
                  </div>
                  <span className="text-sm font-bold text-[#F3A83B] font-serif">${b.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Warm Dip */}
          <div>
            <h4 className="text-xs font-bold text-[#F3A83B] uppercase tracking-widest font-syne mb-3">
              2. Select Liquid Dip / Cascade
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {DIPS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedDip(d);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedDip.id === d.id
                      ? 'bg-[#2C1810] border-[#D48C29] text-[#FAF4EC] shadow-[0_0_15px_rgba(212,140,41,0.2)]'
                      : 'bg-[#120B08]/60 border-[#3A2318] text-[#D1C5B6] hover:border-[#D48C29]/40'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold font-syne text-[#FAF4EC]">{d.name}</div>
                    <div className="text-xs text-[#D1C5B6]/70">{d.desc}</div>
                  </div>
                  <span className="text-sm font-bold text-[#F3A83B] font-serif">+${d.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Toppings */}
          <div>
            <h4 className="text-xs font-bold text-[#F3A83B] uppercase tracking-widest font-syne mb-3">
              3. Multi-Select Gourmet Toppings
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {TOPPINGS.map((t) => {
                const isChecked = selectedToppings.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleTopping(t.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#3A2318] border-[#F3A83B] text-[#FAF4EC]'
                        : 'bg-[#120B08]/40 border-[#3A2318] text-[#D1C5B6]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-[#F3A83B] border-[#F3A83B] text-[#120B08]' : 'border-[#3A2318]'}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-bold truncate">{t.name}</span>
                    </div>
                    <span className="font-serif text-[#F3A83B]">+${t.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Scoop */}
          <div>
            <h4 className="text-xs font-bold text-[#F3A83B] uppercase tracking-widest font-syne mb-3">
              4. Optional Gelato Crown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SCOOPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedScoop(s);
                  }}
                  className={`p-3 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                    selectedScoop.id === s.id
                      ? 'bg-[#2C1810] border-[#D48C29] text-[#FAF4EC]'
                      : 'bg-[#120B08]/40 border-[#3A2318] text-[#D1C5B6]'
                  }`}
                >
                  <div className="font-bold">{s.name}</div>
                  <div className="text-[10px] text-[#F3A83B] font-serif mt-1">
                    {s.price === 0 ? 'Free' : `+$${s.price.toFixed(2)}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-[#3A2318]">
            <MagneticButton
              variant="gold"
              size="lg"
              className="w-full py-4 text-center"
              onClick={handleSaveBuild}
            >
              {savedSuccess ? (
                <span className="flex items-center justify-center gap-2 text-[#120B08]">
                  <Check className="w-5 h-5" /> Saved to WOW Atelier!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" /> Lock In Custom Waffle Recipe (${calculateTotal().toFixed(2)})
                </span>
              )}
            </MagneticButton>
          </div>

        </div>
      </div>
    </div>
  );
};
