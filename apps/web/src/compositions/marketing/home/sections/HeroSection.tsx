import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  StarIcon,
} from '@pragyaos/icons';
import { FadeIn } from '@/components/marketing/motion/FadeIn';

// Trusted learner avatar images
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=64&h=64&q=80',
];

import leafBranchHero from '@/assets/leaf_branch_hero.png';
import heroJourneyVisual from '@/assets/hero_journey_visual.png';

/** Botanical leaf branch illustration — left side decoration */
function BotanicalLeaf(): React.JSX.Element {
  return (
    <img
      src={leafBranchHero}
      alt=""
      className="absolute -left-10 bottom-0 w-58 h-auto opacity-75 mix-blend-multiply pointer-events-none hidden lg:block"
      aria-hidden="true"
      loading="lazy"
    />
  );
}


/**
 * HeroSection: Pixel-faithful recreation of the approved design hero.
 */
export function HeroSection(): React.JSX.Element {
  return (
    <section
      id="hero-section"
      className="relative bg-[#FAF7F2] text-[#1C1917] transition-colors duration-300 overflow-hidden w-full"
      aria-labelledby="hero-headline"
    >
      {/* Page-wide background texture dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ──────── LEFT COLUMN ──────── */}
          <FadeIn direction="up" duration="slow" className="relative">
            <div className="flex flex-col items-start gap-5 relative">

              {/* Eyebrow */}
              <motion.span
                className="text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-[#A97E3E]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                The journey matters
              </motion.span>

              {/* Main headline block */}
              <div>
                <h1
                  id="hero-headline"
                  className="font-serif font-bold text-[#1C1917] leading-[1.07] tracking-tight text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px]"
                >
                  Every learner
                  <br />
                  has a path.
                </h1>
                {/* Italic gold subheadline */}
                <p className="font-serif italic font-bold text-[#A97E3E] leading-[1.07] tracking-tight text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] mt-1">
                  We help you
                  <br />
                  go further.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#1C1917]/70 font-sans leading-relaxed max-w-sm">
                PragyaOS is your space to learn, practice, build and grow. From your
                first lesson to your greatest achievement—we're with you at every step.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1C1917] hover:bg-black text-white text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start Your Journey →
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-5 py-2.5 border border-[#1C1917]/25 hover:border-[#1C1917]/60 text-[#1C1917] text-sm font-sans font-medium rounded-md transition-all duration-200 hover:bg-stone-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore Courses
                </Link>
              </div>

              {/* Social proof: avatars + stars + text */}
              <div className="flex items-center gap-3 mt-2">
                {/* Overlapping avatars */}
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {AVATARS.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-[#FAF7F2] object-cover shadow-sm"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-0.5">
                  {/* 5 stars */}
                  <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={12} fill="#F59E0B" stroke="#F59E0B" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[11px] font-sans text-[#1C1917]/60 leading-tight">
                    Trusted by{' '}
                    <strong className="font-semibold text-[#1C1917]/80">50,000+</strong>{' '}
                    learners<br />and educators worldwide
                  </span>
                </div>
              </div>

              {/* Botanical leaf */}
              <BotanicalLeaf />
            </div>
          </FadeIn>

          {/* ──────── RIGHT COLUMN ──────── */}
          <FadeIn direction="up" duration="slow" delay={0.15} className="w-full flex justify-center">
            <div className="relative w-full max-w-[480px] lg:max-w-[520px] select-none pointer-events-none drop-shadow-xl hover:rotate-[0.5deg] transition-transform duration-300">
              <img
                src={heroJourneyVisual}
                alt="PragyaOS Learning Journey: Learn, Practice, Build, Achieve"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
