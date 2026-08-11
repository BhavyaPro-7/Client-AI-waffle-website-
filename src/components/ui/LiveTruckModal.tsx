import React, { useState } from 'react';
import { X, MapPin, Navigation, Clock, Bell, Check, Map } from 'lucide-react';
import { BRAND_INFO } from '../../constants/data';
import { MagneticButton } from './MagneticButton';
import { useAudioSound } from '../../hooks/useAudioSound';

interface LiveTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTruckModal: React.FC<LiveTruckModalProps> = ({ isOpen, onClose }) => {
  const { playClickSound } = useAudioSound();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    playClickSound();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Sheetal Vaibhav Kutir Opposite Gol Garden Malad East Mumbai 400097'
  )}`;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-[#120B08]/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#1D120D] border border-[#3A2318] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,140,41,0.25)] p-6 sm:p-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#120B08]/80 text-[#FAF4EC] hover:text-[#F3A83B] flex items-center justify-center border border-[#3A2318] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#D48C29]/20 text-[#F3A83B] border border-[#D48C29]/40">
            <Map className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
              <span className="text-xs font-bold text-[#4ADE80] uppercase tracking-widest font-syne">
                LOCATION & DIRECTIONS
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF4EC]">
              Visit {BRAND_INFO.name}
            </h3>
          </div>
        </div>

        {/* Live Active Spot Card */}
        <div className="p-5 rounded-2xl bg-[#120B08] border border-[#D48C29]/40 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#D48C29] text-[#120B08] font-black text-[10px] font-syne uppercase rounded-bl-xl">
            OPEN DAILY
          </div>

          <h4 className="font-serif text-xl font-bold text-[#FAF4EC] mb-1">
            Opposite Gol Garden, Malad East
          </h4>
          <p className="text-xs text-[#F3A83B] font-syne mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {BRAND_INFO.fullAddress}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs text-[#D1C5B6] pt-3 border-t border-[#3A2318]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F3A83B]" />
              <span>{BRAND_INFO.hours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#FAF4EC]">Dietary:</span>
              <span className="text-[#4ADE80]">{BRAND_INFO.dietary}</span>
            </div>
          </div>

          {/* Action Route Planner */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-3 rounded-xl bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] font-bold text-xs font-syne uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <Navigation className="w-4 h-4" /> Get Directions On Google Maps
          </a>
        </div>

        {/* SMS / Whatsapp Updates Form */}
        <div className="p-5 rounded-2xl bg-[#2C1810]/50 border border-[#3A2318]">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-[#F3A83B]" />
            <h5 className="text-xs font-bold text-[#FAF4EC] uppercase font-syne tracking-wider">
              Get Special Offers & New Item Alerts
            </h5>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email or phone number..."
              required
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] placeholder-[#D1C5B6]/50 focus:outline-none focus:border-[#F3A83B]"
            />
            <MagneticButton type="submit" variant="gold" size="sm">
              {subscribed ? <Check className="w-4 h-4" /> : 'Subscribe'}
            </MagneticButton>
          </form>
        </div>

      </div>
    </div>
  );
};
