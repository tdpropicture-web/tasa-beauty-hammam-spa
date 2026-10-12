import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  Sparkles,
  MessageSquare,
  AlertCircle,
  FileText,
  ChevronRight,
  ArrowLeft,
  Share2,
  Download,
  Loader2,
} from 'lucide-react';
import { Service, SpaPackage, BookingData } from '../types';
import { SERVICES, PACKAGES, SPA_DETAILS } from '../data/spaData';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  currency: CurrencyCode;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  currency,
}) => {
  // Step state: 1: Service selection, 2: Date & Time, 3: Enhancements & Therapist, 4: Guest details, 5: Confirmation
  const [step, setStep] = useState<number>(1);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Selected item state
  const [selectedItemType, setSelectedItemType] = useState<'service' | 'package'>('service');
  const [selectedItemId, setSelectedItemId] = useState<string>(preSelectedServiceId || 'swedish-massage-60');

  // Date and Time
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Therapist preference & Add-ons
  const [therapistPreference, setTherapistPreference] = useState<string>('Any Available Senior Therapist');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Guest Contact Info
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Final confirmed booking data
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);

  // Initialize date to tomorrow or today
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync pre-selected service when modal opens
  useEffect(() => {
    if (preSelectedServiceId) {
      const isPkg = PACKAGES.some((p) => p.id === preSelectedServiceId);
      if (isPkg) {
        setSelectedItemType('package');
        setSelectedItemId(preSelectedServiceId);
      } else {
        setSelectedItemType('service');
        setSelectedItemId(preSelectedServiceId);
      }
    }
  }, [preSelectedServiceId]);

  if (!isOpen) return null;

  // Find currently active item
  const currentService = SERVICES.find((s) => s.id === selectedItemId);
  const currentPackage = PACKAGES.find((p) => p.id === selectedItemId);
  const itemName =
    selectedItemType === 'service'
      ? currentService?.name || 'Selected Treatment'
      : currentPackage?.name || 'Selected Package';
  const itemDuration =
    selectedItemType === 'service'
      ? currentService?.durationLabel || '60 Mins'
      : currentPackage?.durationLabel || '90 Mins';
  const basePriceNGN =
    selectedItemType === 'service'
      ? currentService?.priceNGN || 24000
      : currentPackage?.priceNGN || 68000;

  // Add-ons list
  const ADD_ONS = [
    { id: 'steam-extension', name: '+20 Min Eucalyptus Steam Bath', priceNGN: 15000 },
    { id: 'aromatherapy-oil', name: 'Custom Organic Aromatherapy Blend', priceNGN: 6000 },
    { id: 'scalp-acupressure', name: 'Extended 15 Min Scalp Acupressure', priceNGN: 10000 },
  ];

  const addOnsTotal = selectedAddOns.reduce((acc, addOnId) => {
    const match = ADD_ONS.find((a) => a.id === addOnId);
    return acc + (match ? match.priceNGN : 0);
  }, 0);

  const totalPriceNGN = basePriceNGN + addOnsTotal;

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  const handleNext = () => {
    if (step === 4) {
      // Validate form
      const errors: Record<string, string> = {};
      if (!guestName.trim()) errors.name = 'Please provide your full name';
      if (!guestPhone.trim() || guestPhone.trim().length < 8)
        errors.phone = 'Please provide a valid phone number';
      if (!guestEmail.trim() || !guestEmail.includes('@'))
        errors.email = 'Please provide a valid email address';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});

      // Generate confirmation
      const code = `TB-${Math.floor(1000 + Math.random() * 9000)}`;
      const bookingRecord: BookingData = {
        id: `bk-${Date.now()}`,
        serviceName: itemName,
        duration: itemDuration,
        totalPriceNGN,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        therapistPreference,
        guestName,
        guestEmail,
        guestPhone,
        notes,
        addOns: selectedAddOns,
        status: 'confirmed',
        confirmationCode: code,
        createdAt: new Date().toISOString(),
      };

      // Save locally
      try {
        const existing = JSON.parse(localStorage.getItem('tasa_bookings') || '[]');
        existing.unshift(bookingRecord);
        localStorage.setItem('tasa_bookings', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }

      setIsVerifying(true);
      setTimeout(() => {
        setConfirmedBooking(bookingRecord);
        setIsVerifying(false);
        setStep(5);
      }, 600);
    } else {
      setStep(step + 1);
    }
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const cleanDate = confirmedBooking.date.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tasa Beauty and Hammam Spa//Appointment//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Tasa Spa: ${confirmedBooking.serviceName}
DESCRIPTION:Reservation Reference: ${confirmedBooking.confirmationCode}\\nTreatment: ${confirmedBooking.serviceName} (${confirmedBooking.duration})\\nTherapist: ${confirmedBooking.therapistPreference}\\nAddress: 7, 451 Road, Malcolm X Street, 1st Avenue, Gwarinpa, Abuja
LOCATION:7, 451 Road, Malcolm X Street, 1st Avenue, Gwarinpa, Abuja
DTSTART:${cleanDate}T100000Z
DTEND:${cleanDate}T113000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TasaSpa-Booking-${confirmedBooking.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoogleCalendar = () => {
    if (!confirmedBooking) return;
    const cleanDate = confirmedBooking.date.replace(/-/g, '');
    const title = encodeURIComponent(`Tasa Spa: ${confirmedBooking.serviceName}`);
    const details = encodeURIComponent(
      `Appointment Reference: ${confirmedBooking.confirmationCode}\nTreatment: ${confirmedBooking.serviceName} (${confirmedBooking.duration})\nTherapist: ${confirmedBooking.therapistPreference}\nConcierge Contact: 07011480966`
    );
    const location = encodeURIComponent('7, 451 Road, Malcolm X Street, 1st Avenue, Gwarinpa, Abuja');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${cleanDate}T100000Z/${cleanDate}T113000Z&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppForward = () => {
    if (!confirmedBooking) return;
    const msg = `Hello Tasa Beauty & Hammam Spa, I have scheduled an appointment on your website.\n\n*Confirmation Code:* ${confirmedBooking.confirmationCode}\n*Guest:* ${confirmedBooking.guestName}\n*Treatment:* ${confirmedBooking.serviceName} (${confirmedBooking.duration})\n*Date & Time:* ${confirmedBooking.date} at ${confirmedBooking.timeSlot}\n*Total:* ${formatPrice(confirmedBooking.totalPriceNGN, 'NGN')}\n*Phone:* ${confirmedBooking.guestPhone}\n\nPlease confirm availability for my arrival at 1st Avenue Gwarinpa. Thank you!`;
    window.open(`https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/50 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-6 bg-gradient-to-r from-[#09150E] via-[#0E2016] to-[#12261B] text-[#FAF6F0] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-xs font-serif font-bold text-[#D4AF37] bg-[#14261B] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              TB
            </span>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#FAF6F0]">
                Online Reservation & Concierge
              </h3>
              <p className="text-xs text-[#D4AF37]">
                Tasa Beauty & Hammam Spa · 1st Avenue Gwarinpa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#A2B5A8] hover:text-[#FAF6F0] hover:bg-white/10 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Indicator (Only for steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-[#0B1711] border-b border-[#223E2E] flex items-center justify-between text-xs text-[#A2B5A8]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#D4AF37]">Step {step} of 4:</span>
              <span className="text-[#FAF6F0]">
                {step === 1 && 'Select Treatment'}
                {step === 2 && 'Schedule Date & Time'}
                {step === 3 && 'Therapist & Enhancements'}
                {step === 4 && 'Guest Information'}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-1.5 rounded-full transition-colors ${
                    step >= s ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880]' : 'bg-[#223E2E]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 sm:p-8 flex-1">
          {/* STEP 1: Select Treatment or Package */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1E2B24]">
                  Choose Your Wellness Experience
                </h4>
                <p className="text-xs text-[#526456] mt-0.5">
                  Select an individual treatment or an all-inclusive signature package.
                </p>
              </div>

              {/* Toggle Treatment vs Package */}
              <div className="flex gap-2 p-1 bg-[#EAE3D9] rounded-lg max-w-xs">
                <button
                  onClick={() => {
                    setSelectedItemType('service');
                    setSelectedItemId('swedish-massage-60');
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    selectedItemType === 'service'
                      ? 'bg-white text-[#17231B] shadow-xs'
                      : 'text-[#4A5D50]'
                  }`}
                >
                  Treatments ({SERVICES.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedItemType('package');
                    setSelectedItemId('the-ultimate-rejuvenation');
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    selectedItemType === 'package'
                      ? 'bg-white text-[#17231B] shadow-xs'
                      : 'text-[#4A5D50]'
                  }`}
                >
                  Packages ({PACKAGES.length})
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {selectedItemType === 'service'
                  ? SERVICES.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedItemId === service.id
                            ? 'bg-white border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-xs'
                            : 'bg-white/60 border-[#EAE3D9] hover:border-[#D0C4B4]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <input
                            type="radio"
                            name="treatmentChoice"
                            checked={selectedItemId === service.id}
                            onChange={() => setSelectedItemId(service.id)}
                            className="accent-[#223429] shrink-0"
                          />
                          {service.imageUrl && (
                            <img
                              src={service.imageUrl}
                              alt={service.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#EAE3D9]"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#1E2B24] truncate">
                                {service.name}
                              </span>
                              <span className="text-xs text-[#6B7E70] shrink-0">
                                ({service.durationLabel})
                              </span>
                            </div>
                            <p className="text-xs text-[#526456] line-clamp-1 mt-0.5">
                              {service.shortDescription}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-serif font-bold text-[#17231B] tabular-nums shrink-0 ml-3">
                          {formatPrice(service.priceNGN, currency)}
                        </span>
                      </label>
                    ))
                  : PACKAGES.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedItemId === pkg.id
                            ? 'bg-white border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-xs'
                            : 'bg-white/60 border-[#EAE3D9] hover:border-[#D0C4B4]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <input
                            type="radio"
                            name="packageChoice"
                            checked={selectedItemId === pkg.id}
                            onChange={() => setSelectedItemId(pkg.id)}
                            className="accent-[#223429] shrink-0"
                          />
                          {pkg.imageUrl && (
                            <img
                              src={pkg.imageUrl}
                              alt={pkg.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#EAE3D9]"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-[#1E2B24] truncate block">
                              {pkg.name}
                            </span>
                            <p className="text-xs text-[#526456] line-clamp-1 mt-0.5">
                              {pkg.durationLabel} · {pkg.inclusions.length} Inclusions
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-serif font-bold text-[#17231B] tabular-nums shrink-0 ml-3">
                          {formatPrice(pkg.priceNGN, currency)}
                        </span>
                      </label>
                    ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1E2B24]">
                  Select Appointment Date & Time
                </h4>
                <p className="text-xs text-[#526456] mt-0.5">
                  Operating 7 days a week in Gwarinpa. Please allow 15 minutes before your time slot.
                </p>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-2">
                  Appointment Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#D9CEBE] rounded-xl text-xs font-medium text-[#1E2B24] focus:outline-hidden focus:border-[#223429]"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-2">
                  Available Starting Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        selectedTimeSlot === time
                          ? 'bg-[#223429] text-[#FAF7F2] border-[#223429] shadow-xs'
                          : 'bg-white text-[#1E2B24] border-[#EAE3D9] hover:border-[#C5A880]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#F4EFEA] rounded-xl border border-[#EAE3D9] text-xs text-[#526456] flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8C6D42] shrink-0 mt-0.5" />
                <span>
                  Estimated duration for this visit: <strong>{itemDuration}</strong> + 15 minutes welcome intake.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Therapist & Add-ons */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1E2B24]">
                  Therapist Preference & Enhancements
                </h4>
                <p className="text-xs text-[#526456] mt-0.5">
                  Customize your comfort and explore ritual enhancements.
                </p>
              </div>

              {/* Therapist Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-2">
                  Therapist Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Any Available Senior Therapist',
                    'Female Therapist Preferred',
                    'Male Therapist Preferred',
                  ].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setTherapistPreference(pref)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        therapistPreference === pref
                          ? 'bg-[#223429] text-[#FAF7F2] border-[#223429] shadow-xs'
                          : 'bg-white text-[#1E2B24] border-[#EAE3D9] hover:border-[#C5A880]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-2">
                  Optional Ritual Add-ons
                </label>
                <div className="space-y-2.5">
                  {ADD_ONS.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.id);
                    return (
                      <label
                        key={addOn.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-white border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-xs'
                            : 'bg-white/60 border-[#EAE3D9] hover:border-[#D0C4B4]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedAddOns(selectedAddOns.filter((id) => id !== addOn.id));
                              } else {
                                setSelectedAddOns([...selectedAddOns, addOn.id]);
                              }
                            }}
                            className="accent-[#223429]"
                          />
                          <span className="text-xs font-medium text-[#1E2B24]">
                            {addOn.name}
                          </span>
                        </div>

                        <span className="text-xs font-serif font-bold text-[#17231B] tabular-nums">
                          +{formatPrice(addOn.priceNGN, currency)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Details & Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1E2B24]">
                  Guest Contact Details
                </h4>
                <p className="text-xs text-[#526456] mt-0.5">
                  We will send your reservation code and directions to Gwarinpa.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Fatima Aliyu"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-[#1E2B24] focus:outline-hidden ${
                        formErrors.name ? 'border-red-500' : 'border-[#D9CEBE] focus:border-[#223429]'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="080... or +234..."
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-[#1E2B24] focus:outline-hidden ${
                          formErrors.phone ? 'border-red-500' : 'border-[#D9CEBE] focus:border-[#223429]'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9C90]" />
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-[#1E2B24] focus:outline-hidden ${
                          formErrors.email ? 'border-red-500' : 'border-[#D9CEBE] focus:border-[#223429]'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E2B24] mb-1.5">
                    Special Requests, Health Notes or Pregnancy
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notify us of any muscular injuries, sensitive skin, or specific focus areas..."
                    className="w-full p-3 bg-white border border-[#D9CEBE] rounded-xl text-xs text-[#1E2B24] focus:outline-hidden focus:border-[#223429]"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-white rounded-xl border border-[#EAE3D9] space-y-2 text-xs">
                <div className="flex justify-between text-[#526456]">
                  <span>{itemName} ({itemDuration})</span>
                  <span className="tabular-nums">{formatPrice(basePriceNGN, currency)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-[#526456]">
                    <span>Selected Add-ons ({selectedAddOns.length})</span>
                    <span className="tabular-nums">+{formatPrice(addOnsTotal, currency)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#EAE3D9] flex justify-between font-bold text-sm text-[#1E2B24]">
                  <span>Total Amount</span>
                  <span className="font-serif text-base text-[#8C6D42] tabular-nums">
                    {formatPrice(totalPriceNGN, currency)}
                  </span>
                </div>
                <p className="text-[11px] text-[#788B7D] pt-1">
                  Payment is made upon arrival at the spa reception (POS & Cash accepted).
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation Receipt */}
          {step === 5 && confirmedBooking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-4 space-y-6"
            >
              {/* Elegant SVG Draw-In Checkmark Animation */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 60 60" fill="none">
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="26"
                    stroke="#536B5C"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M18 31 L26 39 L42 22"
                    stroke="#536B5C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C6D42] font-semibold">
                  Reservation Confirmed
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2B24] mt-1">
                  We look forward to welcoming you.
                </h4>
                <p className="text-xs text-[#526456] mt-1">
                  A receipt has been issued for your visit at Tasa Beauty & Hammam Spa.
                </p>
              </div>

              {/* Digital Receipt Card */}
              <div className="p-6 bg-white rounded-2xl border border-[#D9CEBE] shadow-md max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
                  <span className="text-xs text-[#6B7E70] uppercase tracking-wider font-semibold">
                    Booking Reference
                  </span>
                  <span className="text-base font-serif font-bold text-[#8C6D42]">
                    {confirmedBooking.confirmationCode}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#3E5044]">
                  <div className="flex justify-between">
                    <span className="text-[#6B7E70]">Guest:</span>
                    <span className="font-semibold text-[#1E2B24]">{confirmedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7E70]">Treatment:</span>
                    <span className="font-semibold text-[#1E2B24]">{confirmedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7E70]">Scheduled Date:</span>
                    <span className="font-semibold text-[#1E2B24]">{confirmedBooking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7E70]">Arrival Time:</span>
                    <span className="font-semibold text-[#1E2B24]">{confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7E70]">Therapist:</span>
                    <span className="font-semibold text-[#1E2B24]">{confirmedBooking.therapistPreference}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EAE3D9] font-bold text-sm">
                    <span className="text-[#1E2B24]">Amount Due at Spa:</span>
                    <span className="text-[#8C6D42] tabular-nums">
                      {formatPrice(confirmedBooking.totalPriceNGN, currency)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAE3D9] text-[11px] text-[#6B7E70]">
                  <strong>Location:</strong> {SPA_DETAILS.address}
                </div>
              </div>

              {/* Calendar & Next Actions */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={handleGoogleCalendar}
                    className="py-2.5 px-3 rounded-xl border border-[#D9CEBE] bg-white hover:bg-[#F4EFEA] text-[#1E2B24] font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#8C6D42]" />
                    Google Calendar
                  </button>
                  <button
                    onClick={handleDownloadICS}
                    className="py-2.5 px-3 rounded-xl border border-[#D9CEBE] bg-white hover:bg-[#F4EFEA] text-[#1E2B24] font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8C6D42]" />
                    Download .ICS File
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <button
                    onClick={handleWhatsAppForward}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Forward to WhatsApp
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1E2B24] border border-[#C5A880] rounded-xl hover:bg-[#F4EFEA] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step < 5 && (
          <div className="p-6 bg-white border-t border-[#EAE3D9] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A5D50] hover:text-[#1E2B24] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#526456] hover:text-[#1E2B24]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#223429] hover:bg-[#17231B] disabled:opacity-75 rounded transition-all inline-flex items-center gap-1.5 shadow-xs"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#E6D3B3] animate-spin" />
                    <span>Verifying Suite...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 4 ? 'Confirm Reservation' : 'Continue'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
