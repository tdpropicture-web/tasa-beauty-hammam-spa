import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/spaData';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-2">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Spa Etiquette & Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#465E50]">
            Everything you need to know ahead of your visit to Tasa Beauty & Hammam Spa.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl bg-white border transition-all duration-200 ${
                  isOpen ? 'border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/20' : 'border-[#E2D8CA] hover:border-[#D4AF37]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0E2016]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#465E50] leading-relaxed border-t border-[#EAE2D5]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
