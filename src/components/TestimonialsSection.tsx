import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/spaData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-2">
            <span>Client Praise & Trust</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Abuja Verified</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
            Words from Our Honored Guests
          </h2>
          <p className="mt-3 text-base text-[#465E50]">
            Discover what clients from across Gwarinpa, Maitama, Jabi, and Wuse II share about their time in our sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white border border-[#E2D8CA] shadow-xs flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D4AF37] gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C9C90]">{item.date}</span>
                </div>

                <p className="text-sm sm:text-base text-[#304437] leading-relaxed italic font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EAE2D5] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#0E2016]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#6A8274]">
                    {item.location}
                  </p>
                </div>
                <span className="text-xs text-[#9A7742] font-semibold bg-[#F2EAE0] px-3 py-1 rounded-full border border-[#E0D6C8]">
                  {item.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
