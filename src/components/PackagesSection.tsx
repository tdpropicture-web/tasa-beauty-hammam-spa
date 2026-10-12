import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Check, Sparkles, Heart, Crown, Clock } from 'lucide-react';
import { SpaPackage } from '../types';
import { PACKAGES, SPA_DETAILS } from '../data/spaData';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface PackagesSectionProps {
  onBookPackage: (pkg: SpaPackage) => void;
  currency: CurrencyCode;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onBookPackage,
  currency,
}) => {
  return (
    <section id="packages" className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-2">
            <span>Harmonized Indulgence</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Bundled Rituals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0E2016] tracking-tight">
            Exclusive Wellness Packages
          </h2>
          <p className="mt-4 text-base text-[#465E50] leading-relaxed">
            Multi-treatment journeys thoughtfully orchestrated to provide deep restorative calm, physical unknotting, and whole-body radiance at preferred package rates.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PACKAGES.map((pkg, idx) => {
            const isFeatured = pkg.isFeatured;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl ${
                  isFeatured
                    ? 'bg-[#0E2016] text-[#FAF6F0] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-xl shadow-[#0E2016]/20'
                    : 'bg-white text-[#122118] border-[#E2D8CA] hover:border-[#D4AF37]/70 shadow-sm'
                }`}
              >
                <div>
                  {/* Package Imagery Header */}
                  {pkg.imageUrl && (
                    <div className="relative -mx-8 -mt-8 mb-6 h-48 sm:h-52 overflow-hidden rounded-t-2xl group">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 pointer-events-none ${
                          isFeatured
                            ? 'bg-gradient-to-t from-[#0E2016] via-transparent to-black/40'
                            : 'bg-gradient-to-t from-white via-transparent to-black/30'
                        }`}
                      />
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className={`text-xs uppercase tracking-widest font-semibold block mb-1 ${isFeatured ? 'text-[#D4AF37]' : 'text-[#9A7742]'}`}>
                        {pkg.tagline}
                      </span>
                      <h3 className={`text-2xl font-serif font-bold ${isFeatured ? 'text-[#FAF6F0]' : 'text-[#0E2016]'}`}>
                        {pkg.name}
                      </h3>
                    </div>

                    {isFeatured && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] to-[#C5A880] rounded-full shadow-xs shrink-0">
                        <Crown className="w-3.5 h-3.5" />
                        Signature Suite
                      </span>
                    )}
                  </div>

                  {/* Duration & Metadata */}
                  <div className={`flex items-center gap-2 text-xs mb-4 ${isFeatured ? 'text-[#A2B5A8]' : 'text-[#5A7565]'}`}>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {pkg.durationLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Private Treatment Suite</span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isFeatured ? 'text-[#C8D6CD]' : 'text-[#4A5D50]'}`}>
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div className={`p-5 rounded-xl border mb-6 ${
                    isFeatured
                      ? 'bg-[#14291E] border-[#244633]'
                      : 'bg-[#FAF6F0] border-[#E8DED1]'
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isFeatured ? 'text-[#EBD6A7]' : 'text-[#0E2016]'}`}>
                      Curated Package Inclusions
                    </h4>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((inclusion, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-xs ${isFeatured ? 'text-[#D5E2D9]' : 'text-[#304437]'}`}>
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isFeatured ? 'text-[#D4AF37]' : 'text-[#3E7051]'}`} />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className={`text-xs mb-6 ${isFeatured ? 'text-[#8EA898]' : 'text-[#6B7E70]'}`}>
                    <span className={`font-semibold ${isFeatured ? 'text-[#FAF6F0]' : 'text-[#1E2B24]'}`}>Recommended For: </span>
                    {pkg.idealFor}
                  </div>
                </div>

                {/* Price & Booking Footer */}
                <div className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isFeatured ? 'border-[#244633]' : 'border-[#EAE3D9]'
                }`}>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl sm:text-3xl font-serif font-bold tabular-nums ${isFeatured ? 'text-[#FAF6F0]' : 'text-[#0E2016]'}`}>
                        {formatPrice(pkg.priceNGN, currency)}
                      </span>
                      {pkg.originalValueNGN && (
                        <span className={`text-xs line-through tabular-nums ${isFeatured ? 'text-[#7B9585]' : 'text-[#8C9C90]'}`}>
                          {formatPrice(pkg.originalValueNGN, currency)}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] ${isFeatured ? 'text-[#A2B5A8]' : 'text-[#526456]'}`}>
                      All-inclusive ritual pricing
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-md ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#B38F56] hover:from-[#E5C378] hover:to-[#D4AF37] text-[#0A160F] shadow-[#D4AF37]/20'
                        : 'bg-[#0E2016] text-[#FAF6F0] hover:bg-[#163323]'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 ${isFeatured ? 'text-[#0A160F]' : 'text-[#D4AF37]'}`} />
                    Book Package
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Monthly Wellness Membership Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0B1711] via-[#10241A] to-[#163325] text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#D4AF37]/40 shadow-2xl shadow-[#0B1711]/30">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>VIP Sanctuary Membership</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF6F0]">
              Tasa Monthly Sanctuary Membership
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#C8D6CD] leading-relaxed">
              Prioritize your wellbeing on a dedicated monthly cadence. Includes 2 full treatments of your choice per month, 15% discount across all additional treatments and Moroccan hammam scrubs, complimentary guest pass, and priority weekend reservations.
            </p>
          </div>

          <div className="text-center lg:text-right shrink-0">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] block tabular-nums">
              {formatPrice(SPA_DETAILS.membershipPriceNGN, currency)}
              <span className="text-xs font-sans text-white/70 font-normal"> / month</span>
            </span>
            <button
              onClick={() => {
                const text = `Hello Tasa Spa, I would like to enquire about enrolling in the VIP Monthly Sanctuary Membership (${formatPrice(SPA_DETAILS.membershipPriceNGN, 'NGN')}/month).`;
                window.open(`https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="mt-4 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-xl transition-all inline-flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
            >
              Enquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
