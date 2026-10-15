import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Droplets, Sparkles, Wind, Flame, ArrowRight } from 'lucide-react';
import { HammamArt } from './SpaArt';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { SERVICES } from '../data/serviceMenu';

interface HammamExperienceProps {
  onBookHammam: () => void;
  currency: CurrencyCode;
}

export const HammamExperienceSection: React.FC<HammamExperienceProps> = ({
  onBookHammam,
  currency,
}) => {
  const serviceIcons = [Wind, Droplets, Sparkles, Flame];
  const steps = SERVICES.filter((service) => service.category === 'hammam').map((service, index) => ({
    num: String(index + 1).padStart(2, '0'),
    title: service.name,
    description: `${formatPrice(service.priceNGN, currency)}${service.priceQualifier ? ` ${service.priceQualifier}` : ''}`,
    icon: serviceIcons[index % serviceIcons.length],
  }));
  const featuredServices = ['steam-bath-20', 'glow-hammam', 'cleopatra-hammam']
    .map((id) => SERVICES.find((service) => service.id === id))
    .filter((service) => service !== undefined);

  return (
    <section id="hammam-experience" className="py-24 bg-gradient-to-b from-[#09150E] via-[#0E2016] to-[#0A160F] text-[#FAF6F0] border-b border-[#C5A880]/25 relative overflow-hidden">
      {/* Decorative Botanical SVG illustration that animates into view */}
      <div className="absolute top-6 right-6 w-44 h-44 opacity-25 pointer-events-none text-[#D4AF37]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <motion.path
            d="M50 90 C50 60 70 40 90 30 M50 70 C40 50 20 45 10 35 M50 50 C65 35 80 20 85 10 M50 30 C35 20 25 15 15 5"
            strokeDasharray="200"
            initial={{ strokeDashoffset: 200 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      {/* Warm ambient lantern glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with Masked Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/35 aspect-[4/3] group shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#09150E]">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"
                alt="Hammam treatment room at Tasa Beauty & Hammam Spa"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('hammam-art-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div id="hammam-art-fallback" className="hidden absolute inset-0 w-full h-full">
                <HammamArt className="w-full h-full" />
              </div>

              {/* Dramatic shadow scrim and ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Decorative top badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#09150E]/85 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] text-[#FAF6F0]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-serif italic text-[#F5E5C4]">Hammam Treatments</span>
                <span className="text-[#C5A880]">·</span>
                <span className="text-xs uppercase tracking-wider text-[#A2B5A8]">Current Service Menu</span>
              </div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Tasa Hammam Suite · Gwarinpa
                </span>
                <h3 className="text-xl font-serif font-bold mt-1 text-white">
                  Hammam & Body Scrub Menu
                </h3>
                <p className="text-xs text-[#FAF6F0]/85 mt-1">
                  {featuredServices.map((service, index) => (
                    <React.Fragment key={service.id}>
                      {index > 0 ? ' · ' : ''}
                      {service.name} {formatPrice(service.priceNGN, currency)}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3"
            >
              <span>Hammam & Body Scrubs</span>
              <span aria-hidden="true" className="text-[#C5A880]">·</span>
              <span>Current Service Menu</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif font-medium text-[#FAF6F0] tracking-tight leading-[1.12]"
            >
              Hammam Services:{' '}
              <span className="gold-gradient-text font-semibold">
                Treatments & Pricing.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 text-base text-[#C8D6CD] leading-relaxed"
            >
              Browse the hammam and body scrub services currently listed by Tasa Beauty & Hammam Spa. Names and prices below follow the spa’s service menu.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="p-5 rounded-xl bg-[#12261B] border border-[#234230] shadow-md hover:border-[#D4AF37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-serif font-bold text-[#D4AF37]">
                        {step.num}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#FAF6F0]">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-[#A2B5A8] leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onBookHammam}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#B38F56] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-xl transition-all shadow-lg shadow-[#D4AF37]/25 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#0A160F]" />
                Book Glow Hammam
              </button>
              <a
                href="#treatments"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#EBD6A7] hover:text-[#FAF6F0] transition-colors"
              >
                <span>View Full Hammam Menu & Pricing</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
