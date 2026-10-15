import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck, MapPin, Sparkles, Clock, ChevronDown } from 'lucide-react';
import { HeroSanctuaryArt } from './SpaArt';
import { SPA_DETAILS } from '../data/spaData';
import { MagneticButton } from './MagneticButton';
import { TrustStats } from './TrustStats';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenFlyerMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenFlyerMenu,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(hover: hover)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const offsetX = (clientX / innerWidth - 0.5) * 16;
    const offsetY = (clientY / innerHeight - 0.5) * 16;
    setMouseOffset({ x: offsetX, y: offsetY });
  };

  const words = [
    'Discover',
    'Your',
    'Sanctuary',
    'of',
    'Serenity',
    'in',
    'Gwarinpa.',
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-10 pb-16 lg:py-24 bg-gradient-to-b from-[#0B1711] via-[#0E2217] to-[#12281B] text-[#FAF6F0] border-b border-[#C5A880]/25"
    >
      {/* Luminous luxury ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/12 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-[#1F4932]/35 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main 2-Column Split Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Proposition & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Metadata Trust Line (Zero-Pill Discipline) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-5"
            >
              <span>Moroccan Hammam Sanctuary</span>
              <span aria-hidden="true" className="text-[#C5A880]">·</span>
              <span>2nd Avenue, Gwarinpa</span>
              <span aria-hidden="true" className="text-[#C5A880]">·</span>
              <span>Open 7 Days</span>
            </motion.div>

            {/* Headline with Staggered Word-by-Word Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.08] font-serif font-medium text-[#FAF6F0] tracking-tight max-w-2xl text-balance">
              {words.map((word, idx) => {
                const isHighlight = word === 'Sanctuary' || word === 'Serenity' || word === 'Discover';
                return (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.12 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-[0.25em] ${isHighlight ? 'gold-gradient-text font-semibold' : ''}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            {/* Value Proposition Prose */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-[#C8D6CD] leading-relaxed max-w-xl font-normal"
            >
              Indulge in authentic centuries-old Moroccan Hammam steam rituals, restorative deep tissue therapies, and soothing botanical massages crafted to renew mind, body, and spirit.
            </motion.p>

            {/* Primary Action Buttons with Magnetic Touch */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={onOpenBooking}
                strength={6}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#0A160F] bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#B38F56] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-xl transition-all shadow-xl shadow-[#D4AF37]/25 hover:shadow-2xl active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-[#0A160F]" />
                Book Your Treatment
              </MagneticButton>

              <button
                onClick={onOpenFlyerMenu}
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[#F5E5C4] border border-[#D4AF37]/60 bg-[#13271C]/80 hover:bg-[#1A3828] hover:border-[#D4AF37] rounded-xl transition-all shadow-md"
              >
                <span>Official Price Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Quiet trust markers with verifiable location details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-10 pt-6 border-t border-[#223E2E] flex flex-wrap items-center gap-6 text-xs text-[#A2B5A8]"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>INU UMORU Avenue, opposite H-Medix</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Mon–Sat 9am–8pm · Sun 11am–7pm</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Certified Therapists & Private Suites</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Sanctuary Artwork Card with Desktop Parallax */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mouseOffset.x * -0.6,
                y: mouseOffset.y * -0.6,
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { type: 'spring', stiffness: 100, damping: 25 },
                y: { type: 'spring', stiffness: 100, damping: 25 },
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/35 group aspect-[4/3] lg:aspect-[1/1] xl:aspect-[5/4] max-h-[580px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#10241A]"
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                alt="Tasa Beauty & Hammam Spa Sanctuary Suite in Gwarinpa, Abuja"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('hero-art-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div id="hero-art-fallback" className="hidden absolute inset-0 w-full h-full">
                <HeroSanctuaryArt className="w-full h-full" />
              </div>

              {/* Atmospheric lighting gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07120A]/90 via-[#0E2217]/30 to-transparent pointer-events-none" />

              {/* Top luxury badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1711]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] text-[#FAF6F0]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-serif italic text-[#F5E5C4]">Sanctuary Suite</span>
                <span className="text-[#C5A880]">·</span>
                <span className="text-xs uppercase tracking-wider text-[#A2B5A8]">Gwarinpa Estate</span>
              </div>

              {/* Verified price flyer preview callout box */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#0B1711]/92 backdrop-blur-md border border-[#D4AF37]/35 rounded-xl shadow-2xl transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#142A1E] border border-[#D4AF37]/40 flex items-center justify-center text-xs font-serif font-bold text-[#D4AF37]">
                      TB
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#FAF6F0] uppercase tracking-wider">
                        Massage & Hammam Rates
                      </p>
                      <p className="text-xs text-[#A2B5A8]">
                        Starting from ₦15,000 · Verified Menu
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenFlyerMenu}
                    className="text-xs font-semibold text-[#D4AF37] hover:text-[#FAF6F0] flex items-center gap-1 transition-colors"
                  >
                    <span>View All</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Verified Trust Strip */}
        <TrustStats />

        {/* Subtle Scroll Indicator to Encourage Exploration */}
        <div className="mt-12 flex justify-center">
          <a
            href="#treatments"
            className="group flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-[#D4AF37] hover:text-[#FAF6F0] transition-colors"
            aria-label="Scroll to explore treatments"
          >
            <span>Explore Treatments</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-1 transition-transform" />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
};
