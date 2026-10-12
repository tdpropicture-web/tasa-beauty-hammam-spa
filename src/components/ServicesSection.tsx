import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Info, Clock, Check, Sparkles, X, ChevronRight, Maximize2 } from 'lucide-react';
import { Service, ServiceCategory } from '../types';
import { SERVICES, SPA_DETAILS } from '../data/spaData';
import { CategoryArt } from './SpaArt';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { ImageLightbox, LightboxImageItem } from './ImageLightbox';

interface ServicesSectionProps {
  onBookService: (service: Service) => void;
  currency: CurrencyCode;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onBookService,
  currency,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'massage', label: 'Massage Therapy' },
    { id: 'hammam', label: 'Moroccan Hammam' },
    { id: 'facial', label: 'Facials & Skincare' },
    { id: 'nail', label: 'Nails & Grooming' },
    { id: 'body', label: 'Body Scrubs' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Map services to LightboxImageItems
  const lightboxImages: LightboxImageItem[] = useMemo(() => {
    return filteredServices
      .filter((s) => s.imageUrl)
      .map((s) => ({
        id: s.id,
        url: s.imageUrl!,
        title: s.name,
        category: `${s.category.toUpperCase()} THERAPY`,
        description: s.shortDescription,
        duration: s.durationLabel,
        priceNGN: s.priceNGN,
      }));
  }, [filteredServices]);

  const handleOpenPhoto = (serviceId: string) => {
    const idx = lightboxImages.findIndex((item) => item.id === serviceId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  return (
    <section id="treatments" className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-2">
              <span>Signature Rituals</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Therapeutic Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
              Curated Treatments & Rituals
            </h2>
            <p className="mt-2 text-base text-[#465E50] max-w-xl">
              Each experience is tailored by licensed wellness practitioners using botanical oils, thermal heat, and authentic Moroccan cleansing traditions.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#D9CEBE] rounded-lg focus:outline-hidden focus:border-[#223429] text-[#1E2B24] placeholder-[#8C9C90] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C9C90] hover:text-[#1E2B24]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Control as Functional Buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EAE2D5] rounded-xl overflow-x-auto max-w-fit mb-12 border border-[#DBD1C2]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#0E2016] text-[#FAF6F0] shadow-xs font-semibold'
                  : 'text-[#4A5D50] hover:text-[#0E2016]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#EAE3D9]">
            <p className="text-base text-[#4D6153]">No treatments found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#223429] border border-[#223429] rounded hover:bg-[#F4EFEA]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col bg-white rounded-2xl border border-[#E5DDD0] hover:border-[#C5A880]/80 transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                {/* Visual Imagery Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24352C] group/img">
                  {service.imageUrl && (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.art-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                  )}
                  <div className={`art-fallback w-full h-full ${service.imageUrl ? 'hidden' : ''}`}>
                    <CategoryArt category={service.category} className="w-full h-full" />
                  </div>

                  {/* Gentle hover overlay with contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                  {/* Quick Expand Photo Button */}
                  {service.imageUrl && (
                    <button
                      onClick={() => handleOpenPhoto(service.id)}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Enlarge photo view"
                      aria-label={`Enlarge photo for ${service.name}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* In-Flyer Badge & Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
                    <span className="font-serif italic tracking-wide text-xs text-[#FAF7F2] drop-shadow-sm">
                      {service.tagline || 'Therapeutic wellness'}
                    </span>
                    {service.isFromFlyer && (
                      <span className="text-[11px] font-sans font-medium tracking-wider uppercase bg-[#17231B]/80 px-2 py-0.5 rounded text-[#E6D3B3] backdrop-blur-xs shadow-xs">
                        Official Menu
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#9A7742] font-semibold mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {service.durationLabel}
                      </span>
                      <span aria-hidden="true" className="text-[#D4AF37]">·</span>
                      <span className="capitalize">{service.category}</span>
                      {service.isSignature && (
                        <>
                          <span aria-hidden="true" className="text-[#D4AF37]">·</span>
                          <span className="text-[#D4AF37]">Signature</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-[#0E2016] group-hover:text-[#9A7742] transition-colors">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 text-xs text-[#4A5D50] leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-6 pt-5 border-t border-[#EAE2D5] flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#9A7742] block font-medium">
                        Rate
                      </span>
                      <span className="text-xl font-serif font-bold text-[#0E2016] tabular-nums">
                        {formatPrice(service.priceNGN, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedServiceForModal(service)}
                        className="p-2 rounded text-[#5A7565] hover:text-[#0E2016] hover:bg-[#F2EAE0] transition-colors"
                        title="View details & preparation guidance"
                        aria-label={`View details for ${service.name}`}
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onBookService(service)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg transition-all active:scale-[0.98] inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Service Details Modal */}
        {selectedServiceForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] rounded-2xl border border-[#D9CEBE] shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="absolute top-5 right-5 z-20 p-2 rounded-full text-[#4A5D50] hover:text-[#17231B] hover:bg-[#EAE3D9] transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Banner */}
              {selectedServiceForModal.imageUrl && (
                <div className="relative -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 h-48 sm:h-56 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedServiceForModal.imageUrl}
                    alt={selectedServiceForModal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/20" />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C664C] font-semibold mb-2">
                <span>{selectedServiceForModal.durationLabel}</span>
                <span aria-hidden="true" className="text-[#C5A880]">·</span>
                <span className="capitalize">{selectedServiceForModal.category} Therapy</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2B24]">
                {selectedServiceForModal.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-[#8C6D42] tabular-nums">
                  {formatPrice(selectedServiceForModal.priceNGN, currency)}
                </span>
                <span className="text-xs text-[#6B7E70]">
                  (Inclusive of personalized consultation & herbal tea)
                </span>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#3E5044] leading-relaxed">
                <p>{selectedServiceForModal.fullDescription}</p>

                {/* Benefits */}
                <div className="pt-4 border-t border-[#EAE3D9]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2B24] mb-3">
                    Therapeutic & Physiological Benefits
                  </h4>
                  <ul className="space-y-2">
                    {selectedServiceForModal.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A5D50]">
                        <Check className="w-3.5 h-3.5 text-[#536B5C] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Guidance */}
                <div className="p-4 bg-[#F4EFEA] rounded-xl border border-[#E5DDD0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D42] mb-1">
                    Pre-Treatment Recommendations
                  </h4>
                  <p className="text-xs text-[#526456]">
                    {selectedServiceForModal.preparation}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#EAE3D9] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedServiceForModal(null)}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A5D50] hover:text-[#1E2B24]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const svc = selectedServiceForModal;
                    setSelectedServiceForModal(null);
                    onBookService(svc);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#223429] hover:bg-[#17231B] rounded transition-all inline-flex items-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#E6D3B3]" />
                  Book This Treatment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Accessible Fullscreen Image Lightbox */}
        <ImageLightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={lightboxImages}
          currentIndex={lightboxIndex ?? 0}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          onBookTreatment={(id) => {
            const svc = SERVICES.find((s) => s.id === id);
            if (svc) onBookService(svc);
          }}
          currency={currency}
        />
      </div>
    </section>
  );
};
