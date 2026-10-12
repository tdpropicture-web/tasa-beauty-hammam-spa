import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck, Compass, Car, Sparkles } from 'lucide-react';
import { SPA_DETAILS } from '../data/spaData';

export const AboutAndLocationSection: React.FC = () => {
  return (
    <section id="about-sanctuary" className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-3">
              <span>Our Philosophy</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Sanctuary of Serenity</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
              An Oasis of Timeless Wellness in the Heart of Gwarinpa.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#465E50] leading-relaxed">
              <p>
                Founded on the belief that genuine wellness requires slowing down and honoring the body's natural rhythms, <strong className="text-[#0E2016]">Tasa Beauty & Hammam Spa</strong> offers a tranquil sanctuary designed to insulate you from the fast-paced energy of Abuja.
              </p>
              <p>
                Our philosophy weaves together centuries-old North African bathhouse traditions with contemporary therapeutic massage science. From our eucalyptus steam chambers to private treatment suites equipped with memory-foam ergonomic beds and ambient candlelight, every touchpoint is intentionally crafted to calm your central nervous system.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E8DED1]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E2016]">
                    Hospital-Grade Sanitation
                  </h4>
                  <p className="text-xs text-[#5A7565] mt-0.5">
                    Steam rooms and suites are sanitized and aired between every single guest.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E2016]">
                    Pure Botanical Ingredients
                  </h4>
                  <p className="text-xs text-[#5A7565] mt-0.5">
                    Authentic Moroccan Savon Beldi, pure cold-pressed argan oil, and organic shea butter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Visit Details Card */}
          <div id="location-contact" className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2D8CA] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E8DED1] pb-6 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B28B4E] font-semibold">
                    Visit Our Sanctuary
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#0E2016] mt-1">
                    Gwarinpa Sanctuary & Reception
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#13271C] border border-[#D4AF37] flex items-center justify-center text-xs font-serif font-bold text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  TB
                </div>
              </div>

              {/* Contact Info List */}
              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0E2016]">Exact Address</h4>
                    <p className="text-[#465E50] mt-0.5 leading-relaxed">
                      {SPA_DETAILS.address}
                    </p>
                    <p className="text-xs text-[#6A8274] mt-1 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5" /> Off 1st Avenue, Malcolm X Street · Dedicated visitor parking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0E2016]">Direct Reservation Lines</h4>
                    <div className="flex flex-wrap gap-4 mt-1">
                      {SPA_DETAILS.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="font-medium text-[#0E2016] hover:text-[#B28B4E] hover:underline"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0E2016]">Operating Sanctuary Hours</h4>
                    <div className="mt-1 space-y-1 text-[#465E50]">
                      {SPA_DETAILS.hours.map((h, i) => (
                        <p key={i}>
                          <span className="font-medium text-[#0E2016]">{h.days}:</span> {h.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#E8DED1] flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(
                    'Hello Tasa Beauty & Hammam Spa, I am on my way to your Gwarinpa location.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-xl transition-all shadow-md"
                >
                  Direct WhatsApp Chat
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('7, 451 road, Malcolm X street, 1st Avenue, Gwarinpa, Abuja')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#0E2016] border border-[#D4AF37] rounded-xl hover:bg-[#F2EAE0] transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sanctuary Spaces Photography Showcase */}
        <div className="mt-20 pt-16 border-t border-[#E8DED1]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B28B4E] font-semibold">
                Sanctuary Tour
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E2016] mt-1">
                Inside Tasa Beauty & Hammam
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A7565] max-w-md">
              Designed with discrete soundproofing, natural cedarwood aromas, and ambient lighting to ensure complete privacy and tranquility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'The Moroccan Hammam Chamber',
                subtitle: 'Heated Tadelakt Marble & Steam',
                imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
                detail: 'Authentic Savon Beldi & Kessa scrub suite with custom eucalyptus steam dispensers.',
              },
              {
                title: 'Private Therapeutic Suite',
                subtitle: 'Ergonomic Memory-Foam Beds',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
                detail: 'Heated volcanic basalt stones, organic jojoba & almond oils, and ambient candlelit tranquility.',
              },
              {
                title: 'Relaxation & Tea Lounge',
                subtitle: 'Complimentary Herbal Infusions',
                imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80',
                detail: 'Fresh Moroccan mint tea, dates, and hibiscus infusions served in quiet pre-and-post relaxation alcoves.',
              },
            ].map((space, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2D8CA] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1B2B21] relative">
                  <img
                    src={space.imageUrl}
                    alt={space.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0E2016]/80 text-[#D4AF37] backdrop-blur-xs border border-[#D4AF37]/30">
                    Sanctuary View
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-medium text-[#B28B4E] uppercase tracking-wider block">
                    {space.subtitle}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-[#0E2016] mt-1 group-hover:text-[#B28B4E] transition-colors">
                    {space.title}
                  </h4>
                  <p className="text-xs text-[#5A7565] mt-2 leading-relaxed">
                    {space.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
