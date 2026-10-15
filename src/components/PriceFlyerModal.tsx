import React from 'react';
import { X, Calendar, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { SPA_DETAILS } from '../data/spaData';
import { SERVICES, SERVICE_CATEGORY_LABELS } from '../data/serviceMenu';

interface PriceFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceToBook: (serviceId: string) => void;
  currency: CurrencyCode;
}

export const PriceFlyerModal: React.FC<PriceFlyerModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceToBook,
  currency,
}) => {
  if (!isOpen) return null;

  const handleWhatsAppEnquiry = (serviceName?: string, priceNGN?: number, qualifier?: string) => {
    const text = serviceName
      ? `Hello Tasa Beauty & Hammam Spa, I would like to enquire about ${serviceName}. The listed price is ${formatPrice(priceNGN ?? 0, 'NGN')}${qualifier ? ` ${qualifier}` : ''}. Please let me know about availability.`
      : 'Hello Tasa Beauty & Hammam Spa, I would like to enquire about your treatment menu.';
    window.open(
      `https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="official-menu-title"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 p-6 sm:p-8 bg-gradient-to-b from-[#09150E] to-[#13271C] text-[#FAF6F0] border-b border-[#D4AF37]/30">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#A2B5A8] hover:text-[#FAF6F0] hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-sm font-serif font-bold text-[#D4AF37] bg-[#10241A]">
              TB
            </span>
            <div>
              <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF37]">
                Official Service Menu
              </span>
              <h2 id="official-menu-title" className="text-xl sm:text-2xl font-serif font-bold text-[#FAF6F0]">
                Tasa Beauty & Hammam Spa
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#C8D6CD]">
            Verified services and rates from the spa menu. Prices are listed in Nigerian naira.
          </p>
        </div>

        <div className="p-4 sm:p-7 space-y-2">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#E2D8CA] bg-white gap-3"
            >
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-[#8C6D42] font-semibold">
                  {SERVICE_CATEGORY_LABELS[service.category]}
                  {service.durationLabel ? ` · ${service.durationLabel}` : ''}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-[#0E2016]">{service.name}</h3>
                {service.shortDescription && (
                  <p className="mt-1 text-xs text-[#6A8274]">{service.shortDescription}</p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <span className="text-base font-serif font-bold text-[#0E2016] tabular-nums">
                  {formatPrice(service.priceNGN, currency)}
                  {service.priceQualifier ? ` ${service.priceQualifier}` : ''}
                </span>
                {service.enquiryOnly ? (
                  <button
                    type="button"
                    onClick={() => handleWhatsAppEnquiry(service.name, service.priceNGN, service.priceQualifier)}
                    className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg"
                  >
                    Enquire
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectServiceToBook(service.id);
                    }}
                    className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg inline-flex items-center gap-1.5"
                  >
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-7 bg-[#F4EFEA] border-t border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526456]">
          <p className="text-center sm:text-left">{SPA_DETAILS.address}</p>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="tel:07011480966" className="hover:underline flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> 07011480966
            </a>
            <a href="tel:08064742679" className="hover:underline flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> 08064742679
            </a>
            <button
              type="button"
              onClick={() => handleWhatsAppEnquiry()}
              className="p-2 rounded-lg text-[#25D366] hover:bg-[#EAF7EE]"
              aria-label="Enquire via WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <Sparkles className="hidden sm:block w-4 h-4 text-[#9A7742]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};
