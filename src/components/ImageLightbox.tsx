import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';

export interface LightboxImageItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  duration?: string;
  priceNGN?: number;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImageItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onBookTreatment: (imageId: string) => void;
  currency: CurrencyCode;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  onBookTreatment,
  currency,
}) => {
  const currentItem = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const newIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(newIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const newIdx = (currentIndex + 1) % images.length;
    onNavigate(newIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Handle keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo view for ${currentItem.title}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
          aria-label="Close photo view"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Modal Content Box */}
        <div
          className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Photo Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
            <motion.img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Scrim at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Details & Action Bar */}
          <div className="p-6 sm:p-8 bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#EAE3D9]">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C664C] font-semibold mb-1">
                <span>{currentItem.category}</span>
                {currentItem.duration && (
                  <>
                    <span aria-hidden="true" className="text-[#C5A880]">·</span>
                    <span>{currentItem.duration}</span>
                  </>
                )}
                <span aria-hidden="true" className="text-[#C5A880]">·</span>
                <span className="text-[#8C9C90]">
                  {currentIndex + 1} of {images.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E2B24]">
                {currentItem.title}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-[#4D6153] leading-relaxed max-w-xl">
                {currentItem.description}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {currentItem.priceNGN && (
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#7C664C] block font-medium">
                    Rate
                  </span>
                  <span className="text-xl font-serif font-bold text-[#17231B] tabular-nums">
                    {formatPrice(currentItem.priceNGN, currency)}
                  </span>
                </div>
              )}

              <button
                onClick={() => {
                  onClose();
                  onBookTreatment(currentItem.id);
                }}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#223429] hover:bg-[#17231B] rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#E6D3B3]" />
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
