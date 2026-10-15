export type ServiceCategory = 'massage' | 'hammam' | 'waxing' | 'facial' | 'self-care';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes?: number;
  durationLabel?: string;
  priceNGN: number;
  priceQualifier?: string;
  enquiryOnly?: boolean;
  shortDescription?: string;
  fullDescription?: string;
  benefits?: string[];
  preparation?: string;
  isPopular?: boolean;
  isSignature?: boolean;
  isFromFlyer?: boolean;
  tagline?: string;
  imageUrl?: string;
}

export interface SpaPackage {
  id: string;
  name: string;
  tagline: string;
  durationMinutes: number;
  durationLabel: string;
  priceNGN: number;
  originalValueNGN?: number;
  description: string;
  inclusions: string[];
  idealFor: string;
  isFeatured?: boolean;
  imageUrl?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  category: 'hammam' | 'massage' | 'facial' | 'sanctuary';
  treatmentTag: string;
  date: string;
  postUrl?: string;
}

export interface BookingData {
  id?: string;
  serviceId?: string;
  packageId?: string;
  serviceName: string;
  duration: string;
  totalPriceNGN: number;
  date: string;
  timeSlot: string;
  therapistPreference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  addOns?: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
  confirmationCode: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  quote: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'booking' | 'hammam' | 'massage';
  question: string;
  answer: string;
}

export interface GiftVoucher {
  code: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  amountNGN: number;
  message: string;
  deliveryMethod: 'instant_email' | 'whatsapp' | 'physical_box';
  createdAt: string;
}
