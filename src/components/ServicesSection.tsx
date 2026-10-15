import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Search } from 'lucide-react';
import { Service, ServiceCategory } from '../types';
import { SPA_DETAILS } from '../data/spaData';
import { SERVICES, SERVICE_CATEGORY_LABELS } from '../data/serviceMenu';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface ServicesSectionProps {
  onBookService: (service: Service) => void;
  currency: CurrencyCode;
}

const CATEGORIES: Array<{ id: 'all' | ServiceCategory; label: string }> = [
  { id: 'all', label: 'All Services' },
  { id: 'massage', label: SERVICE_CATEGORY_LABELS.massage },
  { id: 'hammam', label: SERVICE_CATEGORY_LABELS.hammam },
  { id: 'waxing', label: SERVICE_CATEGORY_LABELS.waxing },
  { id: 'facial', label: SERVICE_CATEGORY_LABELS.facial },
  { id: 'self-care', label: SERVICE_CATEGORY_LABELS['self-care'] },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService, currency }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return SERVICES.filter((service) => {
      const categoryMatches = activeCategory === 'all' || service.category === activeCategory;
      const queryMatches =
        !query ||
        service.name.toLocaleLowerCase().includes(query) ||
        SERVICE_CATEGORY_LABELS[service.category].toLocaleLowerCase().includes(query) ||
        (service.shortDescription?.toLocaleLowerCase().includes(query) ?? false);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, searchQuery]);

  const enquireAboutService = (service: Service) => {
    const text = `Hello Tasa Beauty & Hammam Spa, I would like to enquire about ${service.name}. The listed price is ${formatPrice(service.priceNGN, 'NGN')} ${service.priceQualifier}. Please let me know the final price and availability.`;
    window.open(
      `https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="treatments" className="py-20 sm:py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A7742] font-semibold mb-2">
              <span>Official Service Menu</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Prices in Nigerian naira</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
              Treatments & Services
            </h2>
            <p className="mt-2 text-sm text-[#465E50] max-w-xl">
              Browse Tasa Beauty & Hammam Spa’s current treatment menu. Durations and combo inclusions are shown only where listed on the spa menu.
            </p>
          </div>

          <label className="relative w-full md:w-80 shrink-0">
            <span className="sr-only">Search services</span>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#D9CEBE] rounded-xl focus:outline-none focus:border-[#223429] text-[#1E2B24] placeholder-[#8C9C90]"
            />
          </label>
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-3 mb-8"
          role="group"
          aria-label="Filter services by category"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-full border transition-colors whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#0E2016] text-[#FAF6F0] border-[#0E2016]'
                  : 'bg-white text-[#4A5D50] border-[#D9CEBE] hover:border-[#9A7742]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredServices.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-[#EAE3D9]">
            <p className="text-sm text-[#4D6153]">No services match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#223429] border border-[#223429] rounded-lg hover:bg-[#F4EFEA]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredServices.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                className="flex flex-col min-h-52 p-5 sm:p-6 bg-white rounded-2xl border border-[#E5DDD0] hover:border-[#C5A880] hover:shadow-lg transition-all"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-[11px] uppercase tracking-wider text-[#8C6D42] font-semibold">
                    <span>{SERVICE_CATEGORY_LABELS[service.category]}</span>
                    {service.durationLabel && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{service.durationLabel}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#0E2016]">
                    {service.name}
                  </h3>
                  {service.shortDescription && (
                    <p className="mt-2 text-sm text-[#4A5D50] leading-relaxed">
                      {service.shortDescription}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#EAE2D5] flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#9A7742] font-medium">
                      {service.enquiryOnly ? 'Starting at' : 'Price'}
                    </span>
                    <span className="text-xl font-serif font-bold text-[#0E2016] tabular-nums">
                      {formatPrice(service.priceNGN, currency)}
                      {service.priceQualifier ? ` ${service.priceQualifier}` : ''}
                    </span>
                  </div>
                  {service.enquiryOnly ? (
                    <button
                      type="button"
                      onClick={() => enquireAboutService(service)}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg transition-colors"
                    >
                      Enquire
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onBookService(service)}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Book
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-[#6B7E70]">
          {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} shown. For Skin Tags Removal, the final price depends on the service required; please enquire before booking.
        </p>
      </div>
    </section>
  );
};
