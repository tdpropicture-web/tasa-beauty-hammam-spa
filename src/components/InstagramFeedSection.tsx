import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Calendar, X, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS, SPA_DETAILS } from '../data/spaData';
import { InstagramPost } from '../types';

interface InstagramFeedSectionProps {
  onBookTreatmentTag: (treatmentTag: string) => void;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  onBookTreatmentTag,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const filteredPosts = INSTAGRAM_POSTS.filter((post) => {
    if (activeFilter === 'all') return true;
    return post.category === activeFilter;
  });

  return (
    <section id="instagram-sanctuary" className="py-24 bg-[#FAF6F0] border-b border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Instagram Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B28B4E] font-semibold mb-2">
              <Instagram className="w-4 h-4 text-[#D4AF37]" />
              <span>Instagram Gallery & Client Journeys</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E2016] tracking-tight">
              Life Inside the Sanctuary
            </h2>
            <p className="mt-2 text-base text-[#465E50] max-w-xl">
              Glimpses into our Moroccan hammam rituals, heated steam chambers, massage suites, and client rejuvenation moments in Gwarinpa.
            </p>
          </div>

          {/* Instagram Handle & Follow Button */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:block text-right">
              <a
                href={SPA_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif font-bold text-base text-[#0E2016] hover:text-[#9A7742] transition-colors block"
              >
                {SPA_DETAILS.instagramHandle}
              </a>
              <span className="text-xs text-[#6A8274]">
                Abuja, Nigeria · Updated Daily
              </span>
            </div>

            <a
              href={SPA_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF6F0] bg-[#0E2016] hover:bg-[#163323] rounded-xl transition-all shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5 text-[#D4AF37]" />
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EAE2D5] rounded-xl overflow-x-auto max-w-fit mb-10 border border-[#DBD1C2]">
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'hammam', label: 'Moroccan Hammam' },
            { id: 'massage', label: 'Massage Therapy' },
            { id: 'facial', label: 'Facials & Skincare' },
            { id: 'sanctuary', label: 'Suites & Ambiance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-[#0E2016] text-[#FAF6F0] shadow-xs font-semibold'
                  : 'text-[#4A5D50] hover:text-[#0E2016]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visual Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#24352C] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Hover overlay with engagement & caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E6D3B3] block mb-1">
                    {post.treatmentTag}
                  </span>
                  <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center gap-3 text-[11px] text-white/80">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-[#E2847A] fill-current" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-white/80" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526456]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A880] flex items-center justify-center text-xs font-serif font-bold text-[#8C6D42]">
              TB
            </span>
            <span>
              Tag <strong>@tasabeautyhammam</strong> or use <strong>#TasaSpaAbuja</strong> to share your serene moments.
            </span>
          </div>

          <a
            href={SPA_DETAILS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#8C6D42] hover:text-[#17231B] inline-flex items-center gap-1 transition-colors"
          >
            <span>Explore Full Instagram Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Selected Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-[#D9CEBE] shadow-2xl overflow-hidden flex flex-col sm:flex-row max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-white sm:text-[#4A5D50] bg-black/40 sm:bg-transparent hover:bg-black/60 sm:hover:bg-[#EAE3D9] transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Column */}
            <div className="sm:w-1/2 aspect-square sm:aspect-auto bg-black relative">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Information Column */}
            <div className="sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#EAE3D9] mb-4">
                  <span className="w-7 h-7 rounded-full border border-[#C5A880] flex items-center justify-center text-[10px] font-serif font-bold text-[#8C6D42] bg-white">
                    TB
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E2B24]">
                      {SPA_DETAILS.instagramHandle}
                    </h4>
                    <span className="text-[10px] text-[#7A8D80]">
                      Gwarinpa, Abuja · {selectedPost.date}
                    </span>
                  </div>
                </div>

                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6D42] block mb-2">
                  {selectedPost.treatmentTag}
                </span>

                <p className="text-xs sm:text-sm text-[#3E5044] leading-relaxed">
                  "{selectedPost.caption}"
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-[#526456]">
                  <span className="flex items-center gap-1 font-semibold">
                    <Heart className="w-4 h-4 text-[#C25953] fill-current" />
                    {selectedPost.likes} likes
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <MessageCircle className="w-4 h-4 text-[#526456]" />
                    {selectedPost.comments} comments
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex flex-col gap-2">
                <button
                  onClick={() => {
                    const tag = selectedPost.treatmentTag;
                    setSelectedPost(null);
                    onBookTreatmentTag(tag);
                  }}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#223429] hover:bg-[#17231B] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E6D3B3]" />
                  Book This Treatment
                </button>

                <a
                  href={SPA_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 text-center text-xs font-semibold text-[#8C6D42] hover:text-[#1E2B24] transition-colors inline-flex items-center justify-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  View Original on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
