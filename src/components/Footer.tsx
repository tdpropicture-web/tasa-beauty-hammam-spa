import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Heart, Shield, Sparkles } from 'lucide-react';
import { SPA_DETAILS } from '../data/spaData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenFlyerMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenFlyerMenu }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#07120A] text-[#FAF6F0] border-t border-[#C5A880]/25">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand & Value Statement */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-xs font-serif font-bold text-[#D4AF37] bg-[#10241A] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                TB
              </span>
              <span className="text-2xl font-serif font-bold tracking-wide text-[#FAF6F0]">
                Tasa Beauty & Hammam
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A9BCB0] leading-relaxed max-w-sm">
              An intimate sanctuary dedicated to authentic Moroccan Hammam purification rituals, clinical therapeutic massage, and holistic wellness in Gwarinpa, Abuja.
            </p>
            <div className="pt-2 text-xs text-[#8BA190] space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                {SPA_DETAILS.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                07011480966 · 08064742679
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#BACABF]">
              <li>
                <a href="#treatments" className="hover:text-[#FAF6F0] transition-colors">
                  Treatments Menu
                </a>
              </li>
              <li>
                <a href="#hammam-experience" className="hover:text-[#FAF6F0] transition-colors">
                  Moroccan Hammam
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#FAF6F0] transition-colors">
                  Wellness Packages
                </a>
              </li>
              <li>
                <a href="#instagram-sanctuary" className="hover:text-[#FAF6F0] transition-colors">
                  Instagram Gallery
                </a>
              </li>
              <li>
                <a href="#gift-vouchers" className="hover:text-[#FAF6F0] transition-colors">
                  Gift Certificates
                </a>
              </li>
              <li>
                <a href="#about-sanctuary" className="hover:text-[#FAF6F0] transition-colors">
                  About Our Sanctuary
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments Direct Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Signature Offerings
            </h4>
            <ul className="space-y-2 text-xs text-[#BACABF]">
              <li>
                <button
                  onClick={onOpenFlyerMenu}
                  className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  Official Massage Therapy Flyer
                </button>
              </li>
              <li>Swedish Massage (60 min · ₦24,000)</li>
              <li>Deep Tissue Massage (60 min · ₦29,000)</li>
              <li>Hot Stone Basalt (60 min · ₦35,000)</li>
              <li>Traditional Moroccan Hammam (60 min · ₦38,000)</li>
              <li>Pregnancy Nurturing Massage (45 min · ₦27,000)</li>
            </ul>
          </div>

          {/* VIP Privileges Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Sanctuary Society
            </h4>
            <p className="text-xs text-[#A9BCB0] leading-relaxed">
              Subscribe for seasonal ritual announcements, wellness retreats, and VIP client invitations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#12281B] border border-[#2D553E] text-xs text-[#D4AF37] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Thank you. You are now welcomed to the Sanctuary Society.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full px-3 py-2.5 bg-[#0E2016] border border-[#244633] rounded-lg text-xs text-white placeholder-[#788E80] focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-lg transition-colors shadow-xs"
                >
                  Join Sanctuary List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-[#1C3324] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9182]">
          <p>© {new Date().getFullYear()} Tasa Beauty & Hammam Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowPoliciesModal(true)}
              className="hover:text-[#FAF6F0] transition-colors"
            >
              Spa Policies & Cancellation Terms
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowPoliciesModal(true)}
              className="hover:text-[#FAF6F0] transition-colors"
            >
              Privacy & Discretion
            </button>
          </div>
        </div>
      </div>

      {/* Spa Policies Modal */}
      {showPoliciesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#0B1711] text-[#FAF6F0] rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#223E2E] pb-4 mb-4">
              <h3 className="text-xl font-serif font-bold text-[#FAF6F0]">
                Spa Policies & Guest Etiquette
              </h3>
              <button
                onClick={() => setShowPoliciesModal(false)}
                className="p-1 rounded text-[#8BA190] hover:text-[#FAF6F0]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-xs text-[#BACABF] leading-relaxed">
              <p>
                <strong className="text-[#D4AF37]">Arrival:</strong> We ask that guests arrive 15 minutes before scheduled appointments to relax, enjoy herbal tea, and complete any relevant wellness notes.
              </p>
              <p>
                <strong className="text-[#D4AF37]">Cancellation:</strong> Please provide at least 4 hours notice for rescheduling or cancellation so we may reallocate your private suite.
              </p>
              <p>
                <strong className="text-[#D4AF37]">Health & Pregnancy:</strong> Expectant mothers must inform our team in advance; prenatal massages are performed after 12 weeks of pregnancy.
              </p>
              <p>
                <strong className="text-[#D4AF37]">Discretion:</strong> Tasa Spa is a dedicated sanctuary of tranquility. We request mobile phones be placed on silent mode upon entry.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
