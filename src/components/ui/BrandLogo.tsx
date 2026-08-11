import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  // Height configurations
  const dimensions = {
    sm: { height: 42, width: showText ? 150 : 54 },
    md: { height: 52, width: showText ? 180 : 66 },
    lg: { height: 72, width: showText ? 240 : 90 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 240 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full drop-shadow-[0_4px_12px_rgba(0,168,150,0.3)] transition-transform duration-300 hover:scale-[1.03]"
      >
        <defs>
          {/* Teal Pill Gradient */}
          <linearGradient id="tealBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1EB4B1" />
            <stop offset="50%" stopColor="#159C99" />
            <stop offset="100%" stopColor="#0D807E" />
          </linearGradient>

          {/* Gold Text Gradient */}
          <linearGradient id="goldScript" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD452" />
            <stop offset="50%" stopColor="#F5B227" />
            <stop offset="100%" stopColor="#D98E0E" />
          </linearGradient>

          {/* Chocolate Drizzle Gradient */}
          <linearGradient id="chocoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A2511" />
            <stop offset="100%" stopColor="#2A1207" />
          </linearGradient>

          {/* Soft Shadow */}
          <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#063231" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* TOP FAN OF STICK WAFFLES (5 ARTISANAL WAFFLE POPS ON STICKS)  */}
        {/* ------------------------------------------------------------- */}
        <g id="wafflePops">
          {/* Pop 1 - Leftmost Far Angle */}
          <g transform="translate(42, 28) rotate(-45)">
            <rect x="-1.5" y="10" width="3" height="24" rx="1.5" fill="#D9A362" />
            <path d="M-6 0 L6 0 L4 18 L-4 18 Z" fill="#E8B06B" stroke="#B87C39" strokeWidth="1" />
            {/* Chocolate & Rainbow Sprinkles */}
            <path d="M-5 2 C-2 5 2 1 -4 12 L4 12" stroke="#4A2511" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="-2" cy="4" r="1.2" fill="#FF4D4D" />
            <circle cx="2" cy="7" r="1.2" fill="#4D94FF" />
            <circle cx="0" cy="12" r="1.2" fill="#FFFF4D" />
          </g>

          {/* Pop 2 - Mid Left Angle */}
          <g transform="translate(80, 20) rotate(-22)">
            <rect x="-1.5" y="10" width="3" height="26" rx="1.5" fill="#D9A362" />
            <path d="M-6 -2 L6 -2 L4 18 L-4 18 Z" fill="#E8B06B" stroke="#B87C39" strokeWidth="1" />
            {/* White Choco & Sprinkles */}
            <path d="M-5 0 C0 4 -2 10 3 14" stroke="#FFF7E6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="-3" cy="3" r="1.2" fill="#FF66B2" />
            <circle cx="1" cy="8" r="1.2" fill="#4DE6A6" />
            <circle cx="-1" cy="13" r="1.2" fill="#FFB833" />
          </g>

          {/* Pop 3 - Center Vertical */}
          <g transform="translate(118, 16) rotate(0)">
            <rect x="-1.5" y="10" width="3" height="28" rx="1.5" fill="#D9A362" />
            <path d="M-6 -6 L6 -6 L4 18 L-4 18 Z" fill="#E8B06B" stroke="#B87C39" strokeWidth="1" />
            {/* Dark Nut Drizzle */}
            <path d="M-5 -2 C2 2 -4 8 4 12" stroke="#361708" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="-1" cy="0" r="1.5" fill="#FFF" />
            <circle cx="2" cy="5" r="1.5" fill="#FFF" />
            <circle cx="-2" cy="10" r="1.5" fill="#FFF" />
          </g>

          {/* Pop 4 - Mid Right Angle */}
          <g transform="translate(156, 20) rotate(22)">
            <rect x="-1.5" y="10" width="3" height="26" rx="1.5" fill="#D9A362" />
            <path d="M-6 -2 L6 -2 L4 18 L-4 18 Z" fill="#E8B06B" stroke="#B87C39" strokeWidth="1" />
            {/* Oreo Crunch */}
            <path d="M-4 1 C1 5 -3 9 3 13" stroke="#221108" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="-2" cy="2" r="1.2" fill="#444" />
            <circle cx="2" cy="6" r="1.2" fill="#666" />
            <circle cx="0" cy="11" r="1.2" fill="#333" />
          </g>

          {/* Pop 5 - Rightmost Far Angle */}
          <g transform="translate(194, 28) rotate(45)">
            <rect x="-1.5" y="10" width="3" height="24" rx="1.5" fill="#D9A362" />
            <path d="M-6 0 L6 0 L4 18 L-4 18 Z" fill="#E8B06B" stroke="#B87C39" strokeWidth="1" />
            {/* M&M / Gems Top */}
            <path d="M-4 2 C2 4 -2 8 3 13" stroke="#F5B227" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="-2" cy="3" r="1.5" fill="#FF3333" />
            <circle cx="2" cy="7" r="1.5" fill="#3385FF" />
            <circle cx="-1" cy="12" r="1.5" fill="#33CC33" />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* MAIN TEAL BADGE CONTAINER                                     */}
        {/* ------------------------------------------------------------- */}
        <rect
          x="12"
          y="26"
          width="216"
          height="54"
          rx="27"
          fill="url(#tealBg)"
          stroke="#063231"
          strokeWidth="3.5"
          filter="url(#badgeShadow)"
        />

        {/* Inner Subtle Badge Ring */}
        <rect
          x="15"
          y="29"
          width="210"
          height="48"
          rx="24"
          fill="none"
          stroke="#3FE3DF"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* ------------------------------------------------------------- */}
        {/* RIGHT SIDE WAFFLE WHEEL SYRUP ICON                            */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(178, 53)">
          {/* Outer Wheel Circle */}
          <circle cx="0" cy="0" r="21" fill="none" stroke="#F5B227" strokeWidth="3" />
          <circle cx="0" cy="0" r="21" fill="#F5B227" fillOpacity="0.15" />
          
          {/* Inner Waffle Grid Lines */}
          <line x1="-14" y1="-7" x2="14" y2="-7" stroke="#F5B227" strokeWidth="2" />
          <line x1="-14" y1="7" x2="14" y2="7" stroke="#F5B227" strokeWidth="2" />
          <line x1="-7" y1="-14" x2="-7" y2="14" stroke="#F5B227" strokeWidth="2" />
          <line x1="7" y1="-14" x2="7" y2="14" stroke="#F5B227" strokeWidth="2" />

          {/* Dripping Syrup Graphic */}
          <path
            d="M-12 -12 C-8 -4 0 -8 4 0 C6 4 10 2 12 8 C14 12 8 20 0 20 C-8 20 -18 10 -16 0 Z"
            fill="#F5B227"
            fillOpacity="0.35"
          />

          {/* Wheel Axle Spoke Center */}
          <circle cx="0" cy="0" r="3" fill="#0D807E" stroke="#F5B227" strokeWidth="2" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* RETRO CURSIVE SCRIPT BRAND TYPOGRAPHY: WAFFLES ON WHEELS       */}
        {/* ------------------------------------------------------------- */}
        {/* "Waffles" */}
        <text
          x="34"
          y="48"
          fontFamily="'Playfair Display', 'Brush Script MT', 'Pacifico', cursive, Georgia, serif"
          fontWeight="900"
          fontSize="24"
          fontStyle="italic"
          fill="url(#goldScript)"
          stroke="#093130"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          letterSpacing="-0.5"
        >
          Waffles
        </text>

        {/* "On" */}
        <text
          x="70"
          y="62"
          fontFamily="'Playfair Display', 'Pacifico', cursive, Georgia, serif"
          fontWeight="900"
          fontSize="14"
          fontStyle="italic"
          fill="url(#goldScript)"
          stroke="#093130"
          strokeWidth="2"
          paintOrder="stroke fill"
        >
          On
        </text>

        {/* "Wheels" */}
        <text
          x="32"
          y="74"
          fontFamily="'Playfair Display', 'Brush Script MT', 'Pacifico', cursive, Georgia, serif"
          fontWeight="900"
          fontSize="22"
          fontStyle="italic"
          fill="url(#goldScript)"
          stroke="#093130"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          letterSpacing="-0.5"
        >
          Wheels
        </text>
      </svg>
    </div>
  );
};
