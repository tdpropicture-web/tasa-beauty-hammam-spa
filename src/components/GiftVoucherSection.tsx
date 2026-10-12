import React, { useState } from 'react';
import { Gift, Sparkles, Send, Check, Copy } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { SPA_DETAILS } from '../data/spaData';

interface GiftVoucherSectionProps {
  currency: CurrencyCode;
}

export const GiftVoucherSection: React.FC<GiftVoucherSectionProps> = ({ currency }) => {
  const [amountNGN, setAmountNGN] = useState<number>(50000);
  const [recipientName, setRecipientName] = useState<string>('Zainab Danjuma');
  const [senderName, setSenderName] = useState<string>('With Love');
  const [message, setMessage] = useState<string>(
    'May this blissful sanctuary experience bring you peace and total renewal.'
  );
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const voucherCode = `TB-GIFT-${Math.abs(amountNGN).toString().slice(0, 3)}-${Math.floor(
    100 + Math.random() * 900
  )}`;

  const presetAmounts = [25000, 50000, 75000, 100000];

  const handleSendGift = () => {
    const text = `Hello Tasa Beauty & Hammam Spa, I would like to purchase a Luxury Spa Gift Voucher for *${recipientName}* with an amount of *${formatPrice(
      amountNGN,
      'NGN'
    )}*.\n\nPersonal Note: "${message}"\nFrom: ${senderName}\n\nPlease provide payment details for this voucher.`;
    window.open(
      `https://wa.me/${SPA_DETAILS.primaryWhatsApp}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="gift-vouchers" className="py-24 bg-gradient-to-b from-[#09150E] via-[#0E2016] to-[#0A160F] text-[#FAF6F0] border-b border-[#C5A880]/25">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            <Gift className="w-4 h-4 text-[#D4AF37]" />
            <span>The Gift of Rejuvenation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF6F0] tracking-tight">
            Luxury Spa Gift Certificates
          </h2>
          <p className="mt-3 text-base text-[#C8D6CD]">
            Bestow the unforgettable luxury of relaxation upon someone you cherish. Redeemable across all Moroccan Hammam rituals and massage therapies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Customizer Form */}
          <div className="lg:col-span-6 p-8 bg-[#12261B] rounded-2xl border border-[#234230] shadow-2xl space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5E2D9] mb-2">
                Select Voucher Value
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmountNGN(amt)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      amountNGN === amt
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-[#0A160F] shadow-md shadow-[#D4AF37]/20'
                        : 'bg-[#183325] text-[#D5E2D9] border border-[#234230] hover:border-[#D4AF37]/60'
                    }`}
                  >
                    {formatPrice(amt, currency)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5E2D9] mb-1.5">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Zainab"
                  className="w-full p-2.5 bg-[#0B1711] border border-[#234230] rounded-xl text-xs text-[#FAF6F0] focus:outline-hidden focus:border-[#D4AF37] placeholder-[#6E8878]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5E2D9] mb-1.5">
                  From (Sender)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Ibrahim"
                  className="w-full p-2.5 bg-[#0B1711] border border-[#234230] rounded-xl text-xs text-[#FAF6F0] focus:outline-hidden focus:border-[#D4AF37] placeholder-[#6E8878]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D5E2D9] mb-1.5">
                Personalized Message
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-[#0B1711] border border-[#234230] rounded-xl text-xs text-[#FAF6F0] focus:outline-hidden focus:border-[#D4AF37] placeholder-[#6E8878]"
              />
            </div>

            <button
              onClick={handleSendGift}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider text-[#0A160F] bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#B38F56] hover:from-[#E5C378] hover:to-[#D4AF37] rounded-xl transition-all shadow-xl shadow-[#D4AF37]/25 inline-flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-[#0A160F]" />
              Order Gift Voucher on WhatsApp Concierge
            </button>
          </div>

          {/* Live Gift Voucher Foil Card Preview */}
          <div className="lg:col-span-6">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#08130B] via-[#12281B] to-[#0A160F] text-[#FAF6F0] border-2 border-[#D4AF37]/70 shadow-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Foil watermark motifs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-start justify-between border-b border-[#D4AF37]/35 pb-6 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Luxury Sanctuary Certificate
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                    Tasa Beauty & Hammam Spa
                  </h3>
                  <p className="text-[11px] text-[#A2B5A8] mt-0.5">
                    1st Avenue, Gwarinpa, Abuja
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-sm font-serif font-bold text-[#D4AF37] bg-[#14261B] shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                  TB
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#9CB2A4] block">
                    Presented To
                  </span>
                  <p className="text-xl font-serif font-semibold text-white">
                    {recipientName || 'Valued Guest'}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#9CB2A4] block">
                    Sanctuary Credit
                  </span>
                  <p className="text-3xl font-serif font-bold text-[#D4AF37] tabular-nums">
                    {formatPrice(amountNGN, currency)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-[#234230] text-xs italic text-[#E2EBE5]">
                  "{message}"
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#D4AF37]/35 flex items-center justify-between text-xs text-[#A2B5A8]">
                <span>Valid for 12 months</span>
                <span className="font-mono tracking-wider text-[#D4AF37] font-semibold">
                  {voucherCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
