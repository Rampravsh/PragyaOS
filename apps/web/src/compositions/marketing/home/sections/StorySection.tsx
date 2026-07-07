import React from 'react';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  UserIcon,
  StarIcon,
  TrophyIcon,
} from '@pragyaos/icons';
import {
  StatementUnderline03,
  StatementArrow04,
  Sparkle,
  TinyStar,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';

// Feature columns matching the design exactly
const FEATURES = [
  {
    id: 'engaging-content',
    Icon: PlayIcon,
    title: 'Engaging Content',
    description: 'Learn with videos, notes, quizzes & more.',
  },
  {
    id: 'learn-together',
    Icon: UserIcon,
    title: 'Learn Together',
    description: 'Connect, discuss & grow with a community.',
  },
  {
    id: 'track-progress',
    Icon: StarIcon,
    title: 'Track Progress',
    description: 'See your progress and stay motivated.',
  },
  {
    id: 'earn-achieve',
    Icon: TrophyIcon,
    title: 'Earn & Achieve',
    description: 'Get certificates and celebrate milestones.',
  },
];

/**
 * StorySection: "A better way to learn." — design-matched section.
 *
 * Layout (matching design):
 *   TOP ROW: Left "More than courses" eyebrow + "A better way to learn." heading |
 *            Right: "PragyaOS brings everything..." description text
 *   BOTTOM ROW: 4 columns with small icon box + title + description
 *
 * Light cream (#FAF7F2) background. Organic wavy divider above.
 */
export function StorySection(): React.JSX.Element {
  return (
    <>
      {/* Page divider line at the top */}
      <div className="w-full overflow-hidden bg-[#FAF7F2] dark:bg-[#0f0f10] transition-colors duration-300 leading-[0] mb-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full block text-stone-200 dark:text-stone-800 transition-colors duration-300"
          style={{ height: 40 }}
        >
          <path
            d="M0,40 C180,28 360,52 540,40 C720,28 900,52 1080,40 C1260,28 1380,46 1440,40"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <section
        id="story-section"
        className="relative bg-[#FAF7F2] dark:bg-[#0f0f10] text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="story-heading"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20 md:pb-24 lg:pb-28 pt-8 relative">
        {/* Floating decorations */}
        <div className="absolute top-8 right-12 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={6} yOffset={3}>
            <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-[#A97E3E]/25" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute top-16 left-6 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={8} yOffset={2}>
            <DecorativeAsset asset={TinyStar} className="w-4 h-4 text-stone-400/30" strokeWidth={1} />
          </FloatingDecoration>
        </div>

        {/* TOP ROW: heading left | description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-14 md:mb-16">

          {/* LEFT: eyebrow + large heading */}
          <FadeIn direction="up" duration="slow">
            <div className="flex flex-col items-start gap-3">
              <span className="text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-[#A97E3E]/80">
                More than courses
              </span>

              <div className="relative">
                <h2
                  id="story-heading"
                  className="font-serif font-bold text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-[52px]"
                >
                  A better way
                  <br />
                  to learn.
                </h2>
                {/* Hand-drawn underline under "learn." */}
                <motion.div
                  className="absolute -bottom-2 left-0 pointer-events-none"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  style={{ originX: 0 }}
                  aria-hidden="true"
                >
                  <DecorativeAsset
                    asset={StatementUnderline03}
                    className="w-44 h-auto text-[#A97E3E]"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT: description + subtle arrow decoration */}
          <FadeIn direction="up" duration="slow" delay={0.12}>
            <div className="flex flex-col gap-2 relative lg:pb-4">
              <p className="text-base text-[#1C1917]/70 dark:text-[#f5f5f4]/70 transition-colors duration-300 font-sans leading-relaxed max-w-lg">
                PragyaOS brings everything you need for meaningful learning
                in one beautiful platform.
              </p>
              {/* Decorative arrow — desktop only */}
              <div
                className="absolute -right-8 top-0 rotate-[15deg] opacity-30 hidden xl:block pointer-events-none"
                aria-hidden="true"
              >
                <DecorativeAsset
                  asset={StatementArrow04}
                  className="w-14 h-auto text-stone-400"
                  strokeWidth={1}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* BOTTOM ROW: 4 feature columns */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          role="list"
          aria-label="Platform features"
        >
          {FEATURES.map((feature, index) => (
            <FadeIn key={feature.id} direction="up" duration="slow" delay={0.05 + index * 0.08}>
              <motion.div
                className="flex flex-col items-start gap-3 group"
                role="listitem"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Icon box — small square, matches design */}
                <div className="w-10 h-10 rounded border border-stone-200 dark:border-stone-850 bg-white dark:bg-[#161622] flex items-center justify-center text-[#1C1917]/60 dark:text-[#f5f5f4]/60 group-hover:border-[#A97E3E]/40 group-hover:text-[#A97E3E] group-hover:bg-[#FAF0D9]/50 dark:group-hover:bg-[#3b2a1a] transition-all duration-250 shadow-sm">
                  <feature.Icon size={18} />
                </div>

                {/* Title */}
                <h3 className="font-sans font-semibold text-[13px] text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#1C1917]/60 dark:text-white/60 transition-colors duration-300 font-sans leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </>
  );
}

export default StorySection;
