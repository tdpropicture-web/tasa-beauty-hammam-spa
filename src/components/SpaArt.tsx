import React from 'react';

interface ArtProps {
  className?: string;
  category?: string;
}

export const HeroSanctuaryArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#1E2B24] ${className}`}>
      {/* Ambient background glow & luxury gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#172019] via-[#24352C] to-[#1E2B24]" />
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-[#536B5C]/20 blur-3xl pointer-events-none" />

      {/* Architectural Moroccan Arch & Spa Sanctuary SVG Illustration */}
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover relative z-10 opacity-90 transition-transform duration-700 hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6D3B3" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#8C6D42" />
          </linearGradient>
          <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#283A31" />
            <stop offset="100%" stopColor="#1B2620" />
          </linearGradient>
          <linearGradient id="bedLinen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="50%" stopColor="#EFE9DE" />
            <stop offset="100%" stopColor="#DFD6C7" />
          </linearGradient>
          <radialGradient id="lanternLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFDCA8" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#C5A880" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C5A880" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Steam mist wave curves */}
        <path
          d="M-50 480 C150 420 300 520 500 460 C650 410 750 470 850 430 L850 650 L-50 650 Z"
          fill="url(#goldGlow)"
          opacity="0.08"
        />
        <path
          d="M-50 520 C200 480 350 560 550 500 C700 460 800 510 850 490 L850 650 L-50 650 Z"
          fill="#FAF7F2"
          opacity="0.05"
        />

        {/* Central Moroccan Keyhole Arch Architecture */}
        <path
          d="M260 600 V300 C260 220 320 160 400 160 C480 160 540 220 540 300 V600 Z"
          fill="url(#wallGradient)"
          stroke="#C5A880"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
        {/* Inner nested archway */}
        <path
          d="M290 600 V310 C290 250 340 200 400 200 C460 200 510 250 510 310 V600 Z"
          fill="#17221C"
          stroke="#C5A880"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Hanging Moroccan filigree lanterns */}
        <line x1="320" y1="0" x2="320" y2="180" stroke="#C5A880" strokeWidth="1" opacity="0.6" />
        <circle cx="320" cy="190" r="14" fill="url(#goldGlow)" opacity="0.85" />
        <circle cx="320" cy="190" r="45" fill="url(#lanternLight)" />

        <line x1="480" y1="0" x2="480" y2="180" stroke="#C5A880" strokeWidth="1" opacity="0.6" />
        <circle cx="480" cy="190" r="14" fill="url(#goldGlow)" opacity="0.85" />
        <circle cx="480" cy="190" r="45" fill="url(#lanternLight)" />

        {/* Center overhead chandelier lantern */}
        <line x1="400" y1="0" x2="400" y2="130" stroke="#C5A880" strokeWidth="1" opacity="0.8" />
        <polygon points="400,130 415,155 400,180 385,155" fill="url(#goldGlow)" opacity="0.9" />
        <circle cx="400" cy="155" r="55" fill="url(#lanternLight)" />

        {/* Luxury Massage Bed with plush draped linens */}
        <rect x="250" y="380" width="300" height="90" rx="16" fill="url(#bedLinen)" opacity="0.95" />
        {/* Bed shadow */}
        <ellipse cx="400" cy="480" rx="160" ry="14" fill="#0E1612" opacity="0.6" />
        {/* Soft bolster pillow & headrest */}
        <rect x="270" y="395" width="70" height="40" rx="8" fill="#FBF9F5" />
        {/* Rolled aromatic eucalyptus towels */}
        <ellipse cx="500" cy="415" rx="18" ry="12" fill="#E8DEC9" />
        <ellipse cx="518" cy="418" rx="16" ry="10" fill="#DFCFA8" />

        {/* Polished Volcanic Basalt Stones & Botanical branch */}
        <ellipse cx="380" cy="425" rx="14" ry="7" fill="#1C1E1D" />
        <ellipse cx="405" cy="423" rx="18" ry="8" fill="#2A2C2A" />
        <ellipse cx="435" cy="425" rx="13" ry="6" fill="#181A19" />

        {/* Delicate botanical sprig */}
        <path
          d="M360 410 Q375 390 395 395 Q415 400 430 385"
          stroke="#7A9280"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="378" cy="396" r="4" fill="#65806D" />
        <circle cx="410" cy="397" r="4.5" fill="#65806D" />
        <circle cx="428" cy="386" r="3.5" fill="#65806D" />

        {/* Foreground warm brass hammam water bowl with floating frangipani / rose petals */}
        <ellipse cx="640" cy="520" rx="55" ry="24" fill="url(#goldGlow)" />
        <ellipse cx="640" cy="515" rx="46" ry="18" fill="#1A241E" />
        {/* Floating petals */}
        <circle cx="630" cy="514" r="5" fill="#E2847A" opacity="0.85" />
        <circle cx="652" cy="516" r="6" fill="#F4A59B" opacity="0.9" />
        <circle cx="642" cy="510" r="4" fill="#FFF0E6" opacity="0.9" />

        {/* Subtle Moroccan star geometric accent watermark */}
        <g opacity="0.12" stroke="#C5A880" strokeWidth="1">
          <circle cx="400" cy="270" r="38" />
          <polygon points="400,235 410,260 435,270 410,280 400,305 390,280 365,270 390,260" fill="none" />
          <polygon points="400,240 425,250 430,275 415,298 385,298 370,275 375,250" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export const HammamArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#24352C] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#203028] via-[#2A3E34] to-[#17231D]" />
      <svg
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0DDBE" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#967245" />
          </linearGradient>
          <radialGradient id="steamGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warm Steam vapor clouds */}
        <circle cx="300" cy="180" r="140" fill="url(#steamGlow)" />
        <path
          d="M100 240 Q180 160 260 220 T420 180 T540 220"
          stroke="#FAF7F2"
          strokeWidth="30"
          opacity="0.08"
          strokeLinecap="round"
        />

        {/* Moroccan Tadelakt Marble Heated Slabs */}
        <rect x="80" y="260" width="440" height="150" rx="12" fill="#EAE3D9" opacity="0.95" />
        <rect x="100" y="275" width="400" height="120" rx="8" fill="#F4EFEA" opacity="0.9" />

        {/* Authentic hand-hammered Brass Hammam Bowl (Tassa) */}
        <ellipse cx="220" cy="320" rx="60" ry="24" fill="url(#brassGrad)" />
        <ellipse cx="220" cy="314" rx="52" ry="18" fill="#3D2E1E" />
        <ellipse cx="220" cy="312" rx="46" ry="14" fill="#526E58" opacity="0.5" />

        {/* Traditional Moroccan Savon Noir (Beldi Black Soap) Jar & Kessa Glove */}
        <rect x="340" y="295" width="44" height="40" rx="6" fill="#1C1814" stroke="url(#brassGrad)" strokeWidth="1.5" />
        <ellipse cx="362" cy="295" rx="22" ry="7" fill="url(#brassGrad)" />
        {/* Kessa exfoliation mitt */}
        <path
          d="M405 300 C405 285 425 280 440 288 C455 296 450 325 435 330 C420 335 405 315 405 300 Z"
          fill="#2C2825"
          stroke="#C5A880"
          strokeWidth="1"
        />
        {/* Argan oil droplet */}
        <path
          d="M362 250 C362 250 350 268 350 276 C350 283 355 288 362 288 C369 288 374 283 374 276 C374 268 362 250 362 250 Z"
          fill="url(#brassGrad)"
        />

        {/* Moroccan Zellige pattern band */}
        <g opacity="0.25" stroke="#C5A880" strokeWidth="1">
          <line x1="80" y1="260" x2="520" y2="260" />
          <line x1="80" y1="270" x2="520" y2="270" />
          <path d="M120 260 L130 270 L140 260 L150 270 L160 260 L170 270 L180 260 L190 270 L200 260" />
          <path d="M400 260 L410 270 L420 260 L430 270 L440 260 L450 270 L460 260 L470 270 L480 260" />
        </g>
      </svg>
    </div>
  );
};

export const MassageArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#223328] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E2E24] via-[#2A3E31] to-[#18231C]" />
      <svg
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="stoneDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A3D3C" />
            <stop offset="70%" stopColor="#1E201F" />
            <stop offset="100%" stopColor="#121312" />
          </linearGradient>
          <linearGradient id="warmGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9D6BA" />
            <stop offset="100%" stopColor="#A88658" />
          </linearGradient>
        </defs>

        {/* Minimalist Zen Stone Stack (Hot Basalt Stones) */}
        <ellipse cx="300" cy="350" rx="140" ry="42" fill="url(#stoneDark)" stroke="#4A4E4D" strokeWidth="1" />
        <ellipse cx="300" cy="285" rx="105" ry="34" fill="url(#stoneDark)" stroke="#4A4E4D" strokeWidth="1" />
        <ellipse cx="300" cy="230" rx="75" ry="26" fill="url(#stoneDark)" stroke="#4A4E4D" strokeWidth="1" />
        <ellipse cx="300" cy="185" rx="50" ry="19" fill="url(#stoneDark)" stroke="#4A4E4D" strokeWidth="1" />

        {/* Golden Essential Oil Droplet suspended on top stone */}
        <path
          d="M300 125 C300 125 288 145 288 155 C288 162 293 167 300 167 C307 167 312 162 312 155 C312 145 300 125 300 125 Z"
          fill="url(#warmGold)"
        />
        <circle cx="300" cy="155" r="14" fill="#C5A880" opacity="0.3" filter="blur(4px)" />

        {/* Delicate Eucalyptus & Olive Branch */}
        <path
          d="M170 340 Q210 270 250 250 Q280 230 310 210"
          stroke="#8BA190"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="205" cy="295" rx="16" ry="7" transform="rotate(-30 205 295)" fill="#68836E" />
        <ellipse cx="240" cy="265" rx="18" ry="7" transform="rotate(-20 240 265)" fill="#56725C" />
        <ellipse cx="275" cy="238" rx="15" ry="6" transform="rotate(-35 275 238)" fill="#68836E" />

        {/* Calming circular ripple rings */}
        <circle cx="300" cy="350" r="180" stroke="#C5A880" strokeWidth="0.75" opacity="0.15" fill="none" />
        <circle cx="300" cy="350" r="220" stroke="#C5A880" strokeWidth="0.5" opacity="0.1" fill="none" />
      </svg>
    </div>
  );
};

export const FacialArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#2D3830] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#27332B] via-[#334237] to-[#1C261F]" />
      <svg
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="serumGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7E6CE" />
            <stop offset="60%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#8C6636" />
          </linearGradient>
          <linearGradient id="jadeGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A8C4B0" />
            <stop offset="60%" stopColor="#6C8F75" />
            <stop offset="100%" stopColor="#4A6852" />
          </linearGradient>
        </defs>

        {/* Luxury Dropper Bottle with Botanical Serum */}
        <rect x="250" y="210" width="100" height="150" rx="14" fill="#1C1814" stroke="url(#serumGold)" strokeWidth="1.5" />
        <rect x="265" y="240" width="70" height="90" rx="4" fill="#2E261E" />
        <rect x="280" y="180" width="40" height="30" fill="url(#serumGold)" />
        <rect x="290" y="145" width="20" height="35" rx="4" fill="#3D3020" />
        {/* Rubber bulb */}
        <path d="M285 145 C285 130 315 130 315 145 Z" fill="#1B1713" stroke="url(#serumGold)" strokeWidth="1" />

        {/* Jade Roller Tool */}
        <g transform="rotate(25 410 240)">
          <rect x="400" y="180" width="20" height="110" rx="10" fill="url(#jadeGreen)" />
          {/* Metal arm */}
          <path d="M390 180 H430 V165 H390 Z" fill="url(#serumGold)" />
          {/* Top jade stone */}
          <rect x="380" y="140" width="60" height="25" rx="12" fill="url(#jadeGreen)" />
        </g>

        {/* Orchid flower bloom illustration */}
        <g transform="translate(140, 260) scale(0.7)">
          <path d="M50 0 C20 -40 -30 -30 -40 10 C-50 40 10 60 50 0 Z" fill="#FBF8F4" opacity="0.85" />
          <path d="M50 0 C80 -40 130 -30 140 10 C150 40 90 60 50 0 Z" fill="#FBF8F4" opacity="0.85" />
          <circle cx="50" cy="0" r="14" fill="url(#serumGold)" />
        </g>

        {/* Dew drops */}
        <circle cx="210" cy="180" r="4" fill="#EAE3D9" opacity="0.7" />
        <circle cx="230" cy="160" r="6" fill="#C5A880" opacity="0.8" />
        <circle cx="390" cy="330" r="5" fill="#C5A880" opacity="0.8" />
      </svg>
    </div>
  );
};

export const CouplesArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#2A2326] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#261E21] via-[#35272B] to-[#1C1417]" />
      <svg
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="roseGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9DFD8" />
            <stop offset="50%" stopColor="#C98B7F" />
            <stop offset="100%" stopColor="#7E473F" />
          </linearGradient>
          <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE0B2" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#D4A373" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4A373" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dual Luxury Treatment Beds */}
        <rect x="80" y="270" width="200" height="90" rx="14" fill="#FAF7F2" opacity="0.92" />
        <rect x="320" y="270" width="200" height="90" rx="14" fill="#FAF7F2" opacity="0.92" />
        <rect x="100" y="285" width="55" height="35" rx="6" fill="#EAE3D9" />
        <rect x="340" y="285" width="55" height="35" rx="6" fill="#EAE3D9" />

        {/* Central Aromatic Candles with warm flickering glow */}
        <rect x="280" y="190" width="18" height="55" rx="4" fill="#FFFBF5" stroke="#C5A880" strokeWidth="1" />
        <rect x="304" y="205" width="16" height="40" rx="4" fill="#FFFBF5" stroke="#C5A880" strokeWidth="1" />
        {/* Flames */}
        <path d="M289 180 C289 170 293 162 289 155 C285 162 289 170 289 180 Z" fill="#FFA726" />
        <circle cx="289" cy="170" r="30" fill="url(#candleGlow)" />
        <path d="M312 195 C312 187 315 180 312 173 C309 180 312 187 312 195 Z" fill="#FFA726" />
        <circle cx="312" cy="184" r="25" fill="url(#candleGlow)" />

        {/* Scattered Rose Petals across the suites */}
        <ellipse cx="160" cy="315" rx="10" ry="6" transform="rotate(20 160 315)" fill="#C25953" opacity="0.85" />
        <ellipse cx="180" cy="325" rx="8" ry="5" transform="rotate(-15 180 325)" fill="#D67069" opacity="0.9" />
        <ellipse cx="400" cy="315" rx="10" ry="6" transform="rotate(-25 400 315)" fill="#C25953" opacity="0.85" />
        <ellipse cx="425" cy="320" rx="8" ry="5" transform="rotate(30 425 320)" fill="#D67069" opacity="0.9" />
        <ellipse cx="300" cy="380" rx="12" ry="7" transform="rotate(45 300 380)" fill="#B54A44" opacity="0.8" />
        <ellipse cx="320" cy="390" rx="9" ry="5" transform="rotate(-10 320 390)" fill="#C25953" opacity="0.85" />

        {/* Chilled Toast Flutes */}
        <path d="M260 215 L266 235 V255 H260 M266 255 H272" stroke="url(#roseGold)" strokeWidth="1.5" />
        <path d="M340 215 L334 235 V255 H340 M334 255 H328" stroke="url(#roseGold)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const CategoryArt: React.FC<{ category: string; className?: string }> = ({ category, className }) => {
  switch (category) {
    case 'hammam':
      return <HammamArt className={className} />;
    case 'facial':
      return <FacialArt className={className} />;
    case 'package':
      return <CouplesArt className={className} />;
    case 'massage':
    default:
      return <MassageArt className={className} />;
  }
};
