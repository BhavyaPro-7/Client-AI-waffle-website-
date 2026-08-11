import React, { useState, useRef } from 'react';
import { Sparkles, MapPin, Clock, Leaf, Star, ArrowRight, Heart, Phone, ShoppingBag, ChevronRight, Flame, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MagneticButton } from '../ui/MagneticButton';
import { useAudioSound } from '../../hooks/useAudioSound';

const QUICK_CATEGORIES = [
  { name: 'Mini Waffles', price: '₹60', badge: 'Best Seller', anchor: '#menu' },
  { name: 'Liege Waffles', price: '₹120', badge: 'Authentic', anchor: '#menu' },
  { name: 'Mini Pancakes', price: '₹90', badge: 'Fluffy', anchor: '#menu' },
  { name: 'Cheesecakes', price: '₹140', badge: 'Creamy', anchor: '#menu' },
];

export const HeroSection: React.FC = () => {
  const { playClickSound } = useAudioSound();
  const [lovedHero, setLovedHero] = useState(false);
  const [likesCount, setLikesCount] = useState(342);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Scroll Parallax Transforms
  const textY = useTransform(smoothProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);
  
  const imageY = useTransform(smoothProgress, [0, 1], [0, -70]);
  const imageRotate = useTransform(smoothProgress, [0, 1], [0, -3]);
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1, 0.94]);

  const badgeY1 = useTransform(smoothProgress, [0, 1], [0, -110]);
  const badgeY2 = useTransform(smoothProgress, [0, 1], [0, -130]);

  const bgBlobY = useTransform(smoothProgress, [0, 1], [0, 140]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const handleLoveClick = () => {
    playClickSound();
    setLovedHero(!lovedHero);
    setLikesCount(prev => (lovedHero ? prev - 1 : prev + 1));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full pt-24 sm:pt-28 pb-12 sm:pb-20 bg-[#FFFBF5] text-[#2C1810] overflow-hidden border-b border-[#EAE0D2]"
    >
      {/* Background Decorative Ambient Blobs with Scroll Parallax */}
      <motion.div 
        style={{ y: bgBlobY }}
        className="absolute top-0 right-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-[#F9E2C7]/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3 animate-pulse-glow" 
      />
      <motion.div 
        style={{ y: useTransform(smoothProgress, [0, 1], [0, -100]) }}
        className="absolute bottom-0 left-0 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-[#E8D0B3]/40 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4 animate-pulse-glow" 
      />

      {/* Floating Sparkle Dust Accents */}
      <div className="absolute top-12 left-10 text-[#D48C29]/30 text-xl animate-twinkle pointer-events-none">✨</div>
      <div className="absolute bottom-16 right-12 text-[#D48C29]/40 text-2xl animate-twinkle pointer-events-none" style={{ animationDelay: '1.2s' }}>✨</div>
      <div className="absolute top-1/3 right-1/4 text-[#D48C29]/25 text-lg animate-twinkle pointer-events-none" style={{ animationDelay: '0.7s' }}>🧇</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Main Content with Scroll Shift */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-6"
          >
            
            {/* Live Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE0D2] shadow-xs text-xs font-syne font-bold"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#D48C29] flex items-center gap-1 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#D48C29]" /> Live Truck Kitchen
              </span>
              <span className="text-[#8C7063] hidden sm:inline">•</span>
              <span className="text-[#5C4538] font-sans font-medium text-[11px] sm:text-xs">
                Open Daily 4:30 PM - 2:00 AM
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#D48C29]">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>100% Pure Veg Artisanal Dessert Truck</span>
              </div>
              <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#2C1810] leading-[1.05]">
                Hot Pressed <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D48C29] via-[#B8751E] to-[#8C520F] italic">
                  Belgian Waffles
                </span> <br />
                On Wheels.
              </h1>
            </motion.div>

            {/* Sub-tagline / Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-[#5C4538] leading-relaxed max-w-xl font-sans"
            >
              Indulge in freshly baked pearl-sugar Liege waffles, mini pancake pops, creamy jars, and ice-cold thick shakes — crafted live at Malad East.
            </motion.p>

            {/* Quick Feature Badges - Mobile Optimized Row */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 py-1"
            >
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE0D2] text-[#2C1810] text-xs font-bold font-syne flex items-center gap-1.5 shadow-2xs hover:border-[#D48C29] transition-all">
                <Star className="w-3.5 h-3.5 fill-[#D48C29] text-[#D48C29]" />
                <span>4.9 (500+ Reviews)</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#FFF3E0] border border-[#FCD34D] text-[#8C520F] text-xs font-bold font-syne flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D48C29]" />
                <span>Mini Waffles @ ₹60</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE0D2] text-[#2C1810] text-xs font-bold font-syne flex items-center gap-1.5 shadow-2xs hover:border-[#D48C29] transition-all">
                <MapPin className="w-3.5 h-3.5 text-[#D48C29]" />
                <span>Malad East, Mumbai</span>
              </div>
            </motion.div>

            {/* Primary Action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <MagneticButton
                variant="gold"
                size="lg"
                className="w-full sm:w-auto text-center justify-center py-3.5 px-8 shadow-md hover:shadow-lg"
                onClick={() => {
                  playClickSound();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ShoppingBag className="w-4 h-4" /> Order Live Menu
              </MagneticButton>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Sheetal+Vaibhav+Kutir+Opposite+Gol+Garden+Malad+East+Mumbai+400097"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF8EE] border border-[#EAE0D2] hover:border-[#D48C29] text-[#2C1810] font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#D48C29]" /> Direct Location
              </a>
            </motion.div>

            {/* Quick Category Chips for Mobile Fast Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full pt-4 border-t border-[#EAE0D2]/60"
            >
              <p className="text-[11px] font-syne font-bold uppercase tracking-widest text-[#8C7063] mb-2.5">
                Popular Mobile Favorites
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {QUICK_CATEGORIES.map((cat, idx) => (
                  <motion.a
                    key={cat.name}
                    href={cat.anchor}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playClickSound();
                      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-[#EAE0D2] hover:border-[#D48C29] text-[#2C1810] text-xs font-syne font-bold flex items-center gap-2 transition-all hover:shadow-2xs cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#FFF3E0] text-[#D48C29] font-extrabold">
                      {cat.price}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Interactive Visual Card with Parallax & Scroll 3D Tilt */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card with Scroll Transform */}
              <motion.div 
                style={{ 
                  y: imageY, 
                  rotateZ: imageRotate, 
                  scale: imageScale 
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white group"
              >
                <img
                  src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=1200"
                  alt="Fresh Belgian Liege Waffles with Chocolate and Toppings"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#EAE0D2] shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-syne font-bold text-[#2C1810]">Iron Freshly Pressing</span>
                </div>

                {/* Floating Love Button */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleLoveClick}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center shadow-md transition-transform cursor-pointer z-10"
                  aria-label="Love this waffle truck"
                >
                  <Heart className={`w-5 h-5 transition-colors ${lovedHero ? 'fill-red-500 text-red-500' : 'text-[#8C7063]'}`} />
                </motion.button>

                {/* Bottom Overlay Info on Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#D48C29] block">
                      Signature Creation
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#2C1810]">
                      Belgian Dark Pearl Waffle
                    </h3>
                    <p className="text-[11px] text-[#5C4538]">
                      Crispy, caramelized & melted chocolate
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8C7063] line-through block">₹140</span>
                    <span className="text-base font-black font-serif text-[#D48C29]">₹120</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Parallax Stat Badge 1 - Bottom Left */}
              <motion.div 
                style={{ y: badgeY1 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-5 -left-2 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl border border-[#EAE0D2] shadow-xl flex items-center gap-3 z-20 hover:scale-105 transition-transform animate-float"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#D48C29] flex items-center justify-center font-bold text-lg">
                  🧇
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C1810] font-syne">100% Pure Veg</p>
                  <p className="text-[10px] text-[#8C7063]">No egg, pure delight</p>
                </div>
              </motion.div>

              {/* Floating Parallax Stat Badge 2 - Top Right Offset with Infinite Rotating Ring */}
              <motion.div 
                style={{ y: badgeY2 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="hidden sm:flex absolute -top-4 -right-4 bg-[#2C1810] text-white p-3 rounded-2xl shadow-2xl items-center gap-2.5 z-20 border border-[#3A2318] hover:scale-105 transition-transform animate-float-reverse"
              >
                <div className="relative w-9 h-9 rounded-full bg-[#D48C29] text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/50 animate-rotate-slow pointer-events-none" />
                  <span>★ 4.9</span>
                </div>
                <div className="text-left pr-1">
                  <p className="text-[11px] font-bold font-syne">Customer Favorite</p>
                  <p className="text-[9px] text-[#E8DCC9]">{likesCount} Loves today</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Mobile Dedicated Quick Access Bar with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-12 p-3 sm:p-4 rounded-2xl bg-white border border-[#EAE0D2] shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-2 text-center"
        >
          <a
            href="#menu"
            onClick={playClickSound}
            className="p-2.5 rounded-xl bg-[#FFF8EE] hover:bg-[#FFE8CC] border border-[#FCD34D]/50 transition-all active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-lg">🧇</span>
            <span className="text-xs font-bold text-[#2C1810] font-syne mt-1">Live Menu</span>
            <span className="text-[10px] text-[#8C7063]">From ₹60</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Sheetal+Vaibhav+Kutir+Opposite+Gol+Garden+Malad+East+Mumbai+400097"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FFF8EE] border border-[#EAE0D2] transition-all active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-lg">📍</span>
            <span className="text-xs font-bold text-[#2C1810] font-syne mt-1">Truck Route</span>
            <span className="text-[10px] text-[#8C7063]">Malad East</span>
          </a>

          <a
            href="tel:+919876543210"
            onClick={playClickSound}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FFF8EE] border border-[#EAE0D2] transition-all active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-lg">📞</span>
            <span className="text-xs font-bold text-[#2C1810] font-syne mt-1">Call Truck</span>
            <span className="text-[10px] text-[#8C7063]">Order Ahead</span>
          </a>

          <a
            href="#location"
            onClick={playClickSound}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FFF8EE] border border-[#EAE0D2] transition-all active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-lg">⏰</span>
            <span className="text-xs font-bold text-[#2C1810] font-syne mt-1">Timings</span>
            <span className="text-[10px] text-[#8C7063]">4:30 PM - 2 AM</span>
          </a>
        </motion.div>

        {/* Scroll Prompt Arrow Indicator */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="flex flex-col items-center justify-center pt-8 pointer-events-none"
        >
          <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#8C7063] mb-1">
            Scroll to explore live menu
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#D48C29]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

