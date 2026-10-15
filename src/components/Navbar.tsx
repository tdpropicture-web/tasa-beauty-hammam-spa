import React, { useState } from 'react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { CurrencyCode } from '../utils/currency';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenFlyerMenu: () => void;
  activeSection: string;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenFlyerMenu,
  currency,
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1711]/95 backdrop-blur-md border-b border-[#C5A880]/25 transition-all text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 xl:gap-6">
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <a
          href="#"
          className="text-2xl font-serif font-semibold tracking-wide text-[#FAF6F0] whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-xs font-serif font-bold text-[#D4AF37] bg-[#13271C] shadow-[0_0_12px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform">
            TB
          </span>
          <span className="font-serif tracking-normal text-lg sm:text-xl md:text-2xl group-hover:text-[#F5E5C4] transition-colors">
            Tasa Beauty<span className="hidden sm:inline"> & Hammam</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden min-[1320px]:flex items-center gap-5 text-[13.5px] font-medium text-[#C8D6CD]">
          <a
            href="#treatments"
            className="whitespace-nowrap shrink-0 hover:text-[#FAF6F0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#EBD6A7] hover:after:w-full after:transition-all"
          >
            Treatments
          </a>
          <a
            href="#hammam-experience"
            className="whitespace-nowrap shrink-0 hover:text-[#FAF6F0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#EBD6A7] hover:after:w-full after:transition-all"
          >
            Moroccan Hammam
          </a>
          <a
            href="#treatments"
            className="whitespace-nowrap shrink-0 hover:text-[#FAF6F0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#EBD6A7] hover:after:w-full after:transition-all"
          >
            Service Menu
          </a>
          <a
            href="#about-sanctuary"
            className="whitespace-nowrap shrink-0 hover:text-[#FAF6F0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#EBD6A7] hover:after:w-full after:transition-all"
          >
            The Sanctuary
          </a>
          <a
            href="#location-contact"
            className="whitespace-nowrap shrink-0 hover:text-[#FAF6F0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#EBD6A7] hover:after:w-full after:transition-all"
          >
            Location & Hours
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle Currency Selector */}
          <div className="hidden sm:flex items-center gap-1 text-xs border border-[#234230] rounded px-2 py-1.5 bg-[#0F2217] text-[#C8D6CD]">
            {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  currency === c
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-[#0A160F] font-bold shadow-xs'
                    : 'hover:text-[#FAF6F0]'
                }`}
              >
                {c === 'NGN' ? '₦' : c === 'USD' ? '$' : '£'}
              </button>
            ))}
          </div>

          {/* Quick Menu Flyer button */}
          <button
            onClick={onOpenFlyerMenu}
            className="hidden min-[1700px]:inline-flex items-center gap-1.5 text-xs font-semibold text-[#EBD6A7] border border-[#D4AF37]/50 px-3.5 py-2 rounded bg-[#13271C]/60 hover:bg-[#193325] hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0"
            title="View Official Massage Therapy Menu Flyer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Official Menu
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#0A160F] bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#B38F56] hover:from-[#E5C378] hover:to-[#C5A880] rounded transition-all shadow-md shadow-[#D4AF37]/25 hover:shadow-lg active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0A160F]" />
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book Treatment</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1320px]:hidden p-2 rounded text-[#FAF6F0] hover:bg-[#162D20] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="min-[1320px]:hidden bg-[#0B1711] border-b border-[#C5A880]/30 px-6 py-6 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 text-base font-serif">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              Treatments & Massage Therapy
            </a>
            <a
              href="#hammam-experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              Moroccan Hammam Rituals
            </a>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              Complete Service Menu
            </a>
            <a
              href="#about-sanctuary"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              About The Sanctuary
            </a>
            <a
              href="#location-contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              Location, Parking & Hours
            </a>
            <a
              href="#gift-vouchers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FAF6F0] hover:text-[#D4AF37] transition-colors py-1"
            >
              Luxury Gift Vouchers
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-[#234230] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFlyerMenu();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#EBD6A7] border border-[#D4AF37]/60 rounded bg-[#13271C]"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              View Official Price Flyer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] to-[#C5A880] rounded shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#0A160F]" />
              Book Treatment Online
            </button>

            {/* Currency selector on mobile */}
            <div className="flex items-center justify-between text-xs text-[#A2B5A8] pt-2">
              <span>Display Currency:</span>
              <div className="flex gap-1">
                {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => onCurrencyChange(c)}
                    className={`px-2 py-1 rounded text-xs ${
                      currency === c
                        ? 'bg-[#D4AF37] text-[#0A160F] font-bold'
                        : 'border border-[#234230] text-[#C8D6CD]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
