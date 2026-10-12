import React from 'react';
import { X, Calendar, Phone, MessageSquare, Check, Sparkles } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { SPA_DETAILS, SERVICES } from '../data/spaData';

interface PriceFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceToBook: (serviceId: string) => void;
  currency: CurrencyCode;
}

interface FlyerItem {
  id: string;
  name: string;
  durationText: string;
  priceNGN: number;
}

const FLYER_ITEMS: FlyerItem[] = [
  { id: 'swedish-massage-60', name: 'SWEDISH MASSAGE', durationText: 'ONE HOUR', priceNGN: 24000 },
  { id: 'swedish-massage-30', name: 'SWEDISH MASSAGE', durationText: '30 MINUTES', priceNGN: 17000 },
  { id: 'deep-tissue-60', name: 'DEEP TISSUE', durationText: 'ONE HOUR', priceNGN: 29000 },
  { id: 'deep-tissue-30', name: 'DEEP TISSUE', durationText: '30 MINUTES', priceNGN: 19000 },
  { id: 'hot-stone-massage-60', name: 'HOT STONE MASSAGE', durationText: 'ONE HOUR', priceNGN: 35000 },
  { id: 'cupping-massage-60', name: 'CUPPING MASSAGE', durationText: 'ONE HOUR', priceNGN: 30000 },
  { id: 'pregnancy-massage-45', name: 'PREGNANCY MASSAGE', durationText: '45 MINUTES', priceNGN: 27000 },
  { id: 'head-back-shoulder-30', name: 'HEAD, BACK & SHOULDER', durationText: '30 MINS', priceNGN: 20000 },
  { id: 'steam-bath-20', name: 'STEAM BATH', durationText: '20 MINUTES', priceNGN: 15000 },
];

export const PriceFlyerModal: React.FC<PriceFlyerModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceToBook,
  currency,
}) => {
  if (!isOpen) return null;

  const handleWhatsAppBooking = (item?: FlyerItem) => {
    const text = item
      ? `Hello Tasa Beauty & Hammam Spa, I would like to book the ${item.name} (${item.durationText}) for ${formatPrice(item.priceNGN, 'NGN')}. What time slots are available?`
      : `Hello Tasa Beauty & Hammam Spa, I would like to book a treatment at your Gwarinpa sanctuary.`;
    window.open(`https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon Styled after the authentic Flyer */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#09150E] to-[#13271C] text-[#FAF6F0] border-b border-[#D4AF37]/30">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#A2B5A8] hover:text-[#FAF6F0] hover:bg-white/10 transition-colors"
            aria-label="Close menu modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-sm font-serif font-bold text-[#D4AF37] bg-[#10241A] shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                TB
              </span>
              <div>
                <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF37]">
                  Official Treatment Menu
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF6F0]">
                  Tasa Beauty & Hammam Spa
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              MASSAGE THERAPY & HAMMAM
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF6F0] mt-1 tracking-wide">
              AUTHENTIC SERVICE RATES
            </h3>
            <p className="text-xs text-[#A2B5A8] mt-1">
              Verified rates matching our in-spa menu flyer in Gwarinpa, Abuja
            </p>
          </div>
        </div>

        {/* Flyer Price Table */}
        <div className="p-6 sm:p-8">
          <div className="space-y-3">
            {FLYER_ITEMS.map((item) => {
              const matchedService = SERVICES.find((s) => s.id === item.id);
              return (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border border-[#E2D8CA] hover:border-[#D4AF37] bg-white hover:shadow-md transition-all gap-3"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {matchedService?.imageUrl && (
                      <img
                        src={matchedService.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E8DED1]"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-sm font-semibold tracking-wide text-[#0E2016]">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#6A8274] font-medium">
                          ({item.durationText})
                        </span>
                      </div>
                      {matchedService?.tagline && (
                        <p className="text-xs text-[#7A9182] font-serif italic line-clamp-1 mt-0.5">
                          {matchedService.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="text-base sm:text-lg font-serif font-bold text-[#0E2016] tabular-nums">
                      {formatPrice(item.priceNGN, currency)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectServiceToBook(item.id);
                        }}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Calendar className="w-3 h-3 text-[#D4AF37]" />
                        Book
                      </button>
                      <button
                        onClick={() => handleWhatsAppBooking(item)}
                        className="p-1.5 rounded-lg text-[#25D366] hover:bg-[#EAF7EE] transition-colors"
                        title="Quick book via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Genuine Footer Banner from the flyer */}
          <div className="mt-8 p-5 bg-[#0089A3] text-white rounded-xl text-center space-y-2">
            <p className="text-xs sm:text-sm font-medium tracking-wide">
              {SPA_DETAILS.address}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm sm:text-base font-semibold pt-1">
              <a href="tel:07011480966" className="hover:underline flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> 07011480966
              </a>
              <span className="opacity-70">|</span>
              <a href="tel:08064742679" className="hover:underline flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> 08064742679
              </a>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 sm:px-8 py-4 bg-[#F4EFEA] border-t border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526456]">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#536B5C]" />
            <span>Complimentary welcome herbal tea with all appointments</span>
          </div>
          <button
            onClick={() => handleWhatsAppBooking()}
            className="inline-flex items-center gap-1.5 font-semibold text-[#1E2B24] hover:text-[#0089A3] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            Chat with Concierge on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
