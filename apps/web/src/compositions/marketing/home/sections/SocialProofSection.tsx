import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkle,
  TinyStar,
  EditorialStar,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';

const TESTIMONIALS = [
  {
    id: 'rhiya',
    quote:
      'PragyaOS helped me go from confused to confident. The learning experience is just amazing!',
    author: 'Rhiya Sharma',
    role: 'Student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
    icon: '❝',
    accent: 'star', // decoration type
  },
  {
    id: 'rahul',
    quote:
      'Finally, a platform that makes teaching online simple and beautiful.',
    author: 'Rahul Verma',
    role: 'Instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
    icon: '❝',
    accent: 'heart',
  },
  {
    id: 'neha',
    quote:
      'Our team uses PragyaOS to train and upskill every week. It is intuitive, powerful, and loved by everyone.',
    author: 'Neha Kapoor',
    role: 'L&D Manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
    icon: '❝',
    accent: 'star',
  },
];

function TestimonialCard({
  t,
}: {
  t: (typeof TESTIMONIALS)[0];
}): React.JSX.Element {
  return (
    <motion.article
      className="relative flex flex-col gap-4 p-6 bg-white dark:bg-[#161622] border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm transition-colors duration-300"
      whileHover={{ y: -5, boxShadow: '0 16px 28px -8px rgba(0,0,0,0.09)' }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      aria-label={`Testimonial from ${t.author}, ${t.role}`}
    >
      {/* Large open-quote */}
      <span className="absolute top-4 left-5 font-serif text-5xl text-[#A97E3E]/15 leading-none select-none pointer-events-none" aria-hidden="true">
        {t.icon}
      </span>

      {/* Accent icon top-right */}
      <span className="absolute top-4 right-4 text-lg select-none pointer-events-none" aria-hidden="true">
        {t.accent === 'heart' ? '🤍' : '☆'}
      </span>

      {/* Quote text */}
      <blockquote className="font-serif text-[14px] text-[#1C1917]/80 dark:text-stone-300 transition-colors duration-300 leading-relaxed pt-5 relative z-10">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-stone-100 dark:border-stone-800 transition-colors duration-300">
        <img
          src={t.avatar}
          alt={t.author}
          className="w-9 h-9 rounded-full object-cover border-2 border-stone-100 dark:border-stone-800"
          loading="lazy"
        />
        <div>
          <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 font-sans">{t.author}</p>
          <p className="text-[11px] text-[#1C1917]/50 dark:text-white/40 transition-colors duration-300 font-sans">{t.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * SocialProofSection: "Loved by learners around the world."
 * 3 testimonial cards side-by-side, ← → controls, dot indicators.
 * Cream background, editorial typography.
 */
export function SocialProofSection(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goPrev = useCallback(() => {
    setDir(-1);
    setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const goNext = useCallback(() => {
    setDir(1);
    setActive((p) => (p + 1) % TESTIMONIALS.length);
  }, []);

  return (
    <section
      id="social-proof-section"
      className="relative bg-[#FAF7F2] dark:bg-[#0f0f10] text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 w-full overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Floating decorations */}
      <div className="absolute top-10 right-16 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={7} yOffset={3}>
          <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-[#A97E3E]/20" strokeWidth={1} />
        </FloatingDecoration>
      </div>
      <div className="absolute bottom-12 left-14 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={9} yOffset={2}>
          <DecorativeAsset asset={EditorialStar} className="w-5 h-5 text-stone-400/20" strokeWidth={1} />
        </FloatingDecoration>
      </div>
      <div className="absolute top-16 left-1/3 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={6} yOffset={2}>
          <DecorativeAsset asset={TinyStar} className="w-3 h-3 text-[#A97E3E]/15" strokeWidth={1} />
        </FloatingDecoration>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28">

        {/* Heading */}
        <FadeIn direction="up" duration="slow" className="text-center mb-12 md:mb-14">
          <h2
            id="testimonials-heading"
            className="font-serif font-bold text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-[44px]"
          >
            Loved by learners around the world
          </h2>
        </FadeIn>

        {/* Cards + arrow controls */}
        <div className="flex items-center gap-4">

          {/* Prev arrow */}
          <motion.button
            onClick={goPrev}
            className="shrink-0 w-9 h-9 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-[#1C1917]/50 dark:text-white/50 hover:text-[#1C1917] dark:hover:text-white hover:border-stone-400 dark:hover:border-stone-600 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous testimonial"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>

          {/* Desktop: all 3 cards */}
          <div className="flex-1 hidden md:grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          {/* Mobile: animated single card */}
          <div className="flex-1 md:hidden overflow-hidden">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={active}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d * 50, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: -d * 50, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <TestimonialCard t={TESTIMONIALS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <motion.button
            onClick={goNext}
            className="shrink-0 w-9 h-9 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-[#1C1917]/50 dark:text-white/50 hover:text-[#1C1917] dark:hover:text-white hover:border-stone-400 dark:hover:border-stone-600 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next testimonial"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                i === active ? 'w-6 bg-[#A97E3E]' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofSection;
