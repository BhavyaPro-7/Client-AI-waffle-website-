import React from 'react';
import { INSTAGRAM_POSTS, BRAND_INFO } from '../../constants/data';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

export const InstagramFeed: React.FC = () => {
  const { playClickSound } = useAudioSound();

  return (
    <section className="py-20 bg-[#180E09] border-t border-[#3A2318] relative perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#F3A83B] text-xs font-bold font-syne uppercase tracking-widest mb-1">
              <Instagram className="w-4 h-4" /> LIVE INSTAGRAM COMMUNITY
            </div>
            <TextReveal
              text={BRAND_INFO.instagram}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF4EC]"
            />
          </div>

          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="px-6 py-3 rounded-full bg-[#1D120D] border border-[#D48C29]/60 text-[#FAF4EC] hover:bg-[#D48C29] hover:text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-3d hover:shadow-3d-lg"
          >
            <Instagram className="w-4 h-4" /> Follow On Instagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Instagram Grid in 3D */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <CardTilt key={post.id} maxTilt={15} className="aspect-square">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#120B08] border border-[#3A2318] shadow-3d hover:shadow-3d-lg hover:border-[#F3A83B] transition-all preserve-3d"
              >
                <img
                  src={post.image}
                  alt="Instagram Feed"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#120B08]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-[#FAF4EC] translate-z-20">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Heart className="w-4 h-4 fill-[#F3A83B] text-[#F3A83B]" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <MessageCircle className="w-4 h-4 text-[#FAF4EC]" /> {post.comments}
                  </div>
                  <p className="text-[9px] text-[#D1C5B6] px-2 text-center line-clamp-2 mt-1">
                    {post.caption}
                  </p>
                </div>
              </a>
            </CardTilt>
          ))}
        </div>

      </div>
    </section>
  );
};
