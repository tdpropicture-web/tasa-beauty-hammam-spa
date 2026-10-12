import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { SPA_DETAILS } from '../data/spaData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const statusDotRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, make everything visible immediately without animations
    if (prefersReducedMotion) {
      if (containerRef.current) containerRef.current.style.opacity = '1';
      return;
    }

    // Set initial GSAP properties to prevent flash of unstyled content
    const ctx = gsap.context(() => {
      // Initialize states
      gsap.set(containerRef.current, {
        opacity: 0,
        y: 45,
        scale: 0.88,
        visibility: 'visible',
      });
      gsap.set(iconRef.current, {
        scale: 0.4,
        rotation: -25,
        opacity: 0,
      });
      gsap.set(textRef.current, {
        opacity: 0,
        x: -12,
      });
      gsap.set(statusDotRef.current, {
        scale: 0,
        opacity: 0,
      });
      gsap.set(tooltipRef.current, {
        opacity: 0,
        y: 14,
        scale: 0.92,
      });

      // Master staggered entrance timeline
      const tl = gsap.timeline({
        delay: 1.3, // Wait gracefully for initial brand intro / hero reveal
        defaults: { ease: 'power3.out' },
      });

      // Step 1: Slide up and fade in the main container
      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      })
      // Step 2: Staggered pop and rotation of the WhatsApp icon
      .to(
        iconRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.55,
          ease: 'back.out(1.8)',
        },
        '-=0.55' // Stagger overlap
      )
      // Step 3: Staggered slide and reveal of the label text
      .to(
        textRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.35' // Stagger overlap
      )
      // Step 4: Staggered pop of the online availability indicator
      .to(
        statusDotRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
        },
        '-=0.25' // Stagger overlap
      )
      // Step 5: Graceful presentation of the luxury concierge prompt tooltip
      .to(
        tooltipRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        '+=0.15' // Short pause before bubble appears
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    const text = `Hello Tasa Beauty & Hammam Spa, I would like to enquire about booking an appointment at your Gwarinpa sanctuary.`;
    window.open(`https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      ref={containerRef}
      style={{ visibility: 'hidden' }}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Luxury Concierge Tooltip Greeting Card */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="mb-3 max-w-xs bg-white/95 backdrop-blur-md text-[#17231B] border border-[#EAE3D9] p-3.5 rounded-2xl shadow-xl shadow-[#17231B]/8 relative group cursor-pointer hover:border-[#C5A880] transition-colors"
          onClick={handleClick}
          role="region"
          aria-label="Spa concierge message"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Dismiss message"
            className="absolute -top-2 -left-2 w-5 h-5 bg-[#FAF7F2] border border-[#D9CEBE] rounded-full flex items-center justify-center text-[#7C664C] hover:text-[#17231B] shadow-sm transition-colors text-[10px]"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#25D366] mt-1.5 shrink-0 animate-ping" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#17231B]">Spa Concierge</span>
                <span className="text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                  Available Now
                </span>
              </div>
              <p className="text-xs text-[#536B5C] mt-0.5 leading-snug">
                Questions about our Hammam rituals or same-day massage openings? Chat with us instantly.
              </p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-[#A68A5E] group-hover:text-[#8C6D42] transition-colors">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>Start WhatsApp conversation &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating WhatsApp Button with Staggered Internal Targets */}
      <div className="relative">
        {/* Soft Ambient Breathing Ripple */}
        <div
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 pointer-events-none"
          style={{ animation: 'waPulseGlow 3.2s ease-in-out infinite' }}
        />

        <button
          ref={buttonRef}
          onClick={handleClick}
          aria-label="Chat with Tasa Spa Concierge on WhatsApp"
          className="relative flex items-center gap-3 px-4 sm:px-5 py-3.5 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20BA5A] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-xs font-semibold tracking-wide group"
        >
          {/* Animated WhatsApp Icon */}
          <div ref={iconRef} className="shrink-0 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Staggered Text Label */}
          <span ref={textRef} className="whitespace-nowrap font-medium text-[13px] tracking-normal">
            WhatsApp Concierge
          </span>

          {/* Staggered Live Indicator Pill */}
          <span
            ref={statusDotRef}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black/15 rounded-full text-[10px] uppercase font-bold tracking-wider text-white/95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live
          </span>
        </button>
      </div>
    </div>
  );
};
