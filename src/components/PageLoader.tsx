import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session or prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenLoader = sessionStorage.getItem('tasa_seen_intro');

    if (prefersReducedMotion || hasSeenLoader) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('tasa_seen_intro', 'true');
      setTimeout(onComplete, 600); // Allow exit curtain transition to finish
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem('tasa_seen_intro', 'true');
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07120A] text-[#FAF6F0] cursor-pointer"
          onClick={handleSkip}
          aria-live="polite"
          aria-label="Welcome to Tasa Beauty & Hammam Spa. Click to enter immediately."
        >
          {/* Subtle Ambient Background Radial Light */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.2 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl pointer-events-none"
          />

          {/* Central Monogram and Botanical Ring */}
          <div className="relative flex flex-col items-center">
            {/* SVG Botanical Ring Line Drawing */}
            <svg
              className="w-28 h-28 -mb-28"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#A68A5E"
                strokeWidth="0.8"
                strokeDasharray="251"
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.3, delay: 0.1, ease: 'easeInOut' }}
              />
            </svg>

            {/* Monogram TB */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-28 h-28 flex items-center justify-center text-3xl font-serif font-bold text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
            >
              TB
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl sm:text-2xl font-serif font-semibold tracking-wide text-[#FAF6F0] text-center"
            >
              Tasa Beauty & Hammam Spa
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold"
            >
              Sanctuary of Serenity · Gwarinpa
            </motion.p>

            {/* Gentle Progress Hairline */}
            <div className="w-32 h-[1.5px] bg-[#162E20] rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#9A7742]"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] text-[#7A9182] mt-3"
            >
              Tap anywhere to enter
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
