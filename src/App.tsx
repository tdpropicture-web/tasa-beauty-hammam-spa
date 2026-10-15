import React, { Suspense, lazy, useState } from 'react';
import { PageLoader } from './components/PageLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { CurrencyCode } from './utils/currency';
import { Service } from './types';
import { SERVICES } from './data/serviceMenu';

const HammamExperienceSection = lazy(() => import('./components/HammamExperienceSection').then(m => ({ default: m.HammamExperienceSection })));
const InstagramFeedSection = lazy(() => import('./components/InstagramFeedSection').then(m => ({ default: m.InstagramFeedSection })));
const GiftVoucherSection = lazy(() => import('./components/GiftVoucherSection').then(m => ({ default: m.GiftVoucherSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const AboutAndLocationSection = lazy(() => import('./components/AboutAndLocationSection').then(m => ({ default: m.AboutAndLocationSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const PriceFlyerModal = lazy(() => import('./components/PriceFlyerModal').then(m => ({ default: m.PriceFlyerModal })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp').then(m => ({ default: m.FloatingWhatsApp })));

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [preSelectedId, setPreSelectedId] = useState<string | undefined>(undefined);
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');

  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedId(serviceId || 'swedish-massage-60');
    setIsBookingOpen(true);
  };

  const handleBookService = (service: Service) => {
    setPreSelectedId(service.id);
    setIsBookingOpen(true);
  };

  const handleBookTreatmentTag = (tag: string) => {
    const lower = tag.toLowerCase();
    const matchingService = SERVICES.find((service) =>
      lower.includes(service.name.toLowerCase()) ||
      (lower.includes('steam') && service.id === 'steam-bath-20') ||
      (lower.includes('hammam') && service.id === 'glow-hammam') ||
      (lower.includes('hot stone') && service.id === 'hot-stone-massage-60') ||
      (lower.includes('deep tissue') && service.id === 'deep-tissue-60') ||
      (lower.includes('facial') && service.id === 'brightening-facial')
    );
    if (matchingService) {
      handleOpenBooking(matchingService.id);
    } else {
      setIsFlyerOpen(true);
    }
  };

  const handleSelectServiceFromFlyer = (serviceId: string) => {
    setIsFlyerOpen(false);
    setPreSelectedId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#122118] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A160F]">
      {/* Luxury Introductory Brand Transition */}
      <PageLoader onComplete={() => {}} />

      {/* Subtle Editorial Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenFlyerMenu={() => setIsFlyerOpen(true)}
        activeSection="home"
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Experience Stream */}
      <main className="flex-1">
        {/* 1. Hero Sanctuary */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenFlyerMenu={() => setIsFlyerOpen(true)}
        />

        {/* 2. Curated Treatments & Official Massage Therapy Rates (Filled with Imagery) */}
        <ServicesSection
          onBookService={handleBookService}
          currency={currency}
        />

        <Suspense fallback={null}>
        {/* 3. Moroccan Hammam Experience */}
        <HammamExperienceSection
          onBookHammam={() => handleOpenBooking('glow-hammam')}
          currency={currency}
        />

        {/* 4. Instagram Sanctuary Feed & Real Treatment Moments */}
        <InstagramFeedSection
          onBookTreatmentTag={handleBookTreatmentTag}
        />

        {/* 5. Luxury Gift Certificates */}
        <GiftVoucherSection currency={currency} />

        {/* 6. Client Praise & Social Proof */}
        <TestimonialsSection />

        {/* 7. About The Sanctuary & Gwarinpa Location */}
        <AboutAndLocationSection />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenFlyerMenu={() => setIsFlyerOpen(true)}
      />

      <Suspense fallback={null}>
      {/* Official Price Flyer Modal (transcribed directly from user's flyer image) */}
      <PriceFlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
        onSelectServiceToBook={handleSelectServiceFromFlyer}
        currency={currency}
      />

      {/* Interactive 5-Step Online Booking & Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedId}
        currency={currency}
      />

      {/* Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp />
      </Suspense>
    </div>
  );
}
