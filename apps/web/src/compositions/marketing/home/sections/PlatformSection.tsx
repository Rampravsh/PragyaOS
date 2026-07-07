import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  BookIcon,
  PlayIcon,
  LayersIcon,
  UserIcon,
} from '@pragyaos/icons';
import {
  Sparkle,
  TinyStar,
  EditorialStar,
  StatementArrow03,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';

const LEARNER_TYPES = [
  {
    id: 'students',
    Icon: BookIcon,
    label: 'Students',
    description: 'Master skills, clear doubts, and build real knowledge.',
    iconBg: '#E6F0EA',
    iconColor: '#059669',
  },
  {
    id: 'instructors',
    Icon: PlayIcon,
    label: 'Instructors',
    description: 'Create impactful courses and reach more learners.',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: 'organizations',
    Icon: LayersIcon,
    label: 'Organizations',
    description: 'Train teams and build a culture of continuous learning.',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    id: 'lifelong-learners',
    Icon: UserIcon,
    label: 'Lifelong Learners',
    description: 'Explore new interests and grow every day.',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
  },
];

/** Individual learner card with hover lift */
const LearnerCard = memo(function LearnerCard({
  card,
  delay,
}: {
  card: (typeof LEARNER_TYPES)[0];
  delay: number;
}) {
  return (
    <FadeIn direction="up" duration="slow" delay={delay}>
      <motion.article
        className="flex flex-col items-start gap-4 p-6 bg-white dark:bg-[#161622] border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm cursor-default h-full transition-colors duration-300"
        whileHover={{ y: -6, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.10)' }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        aria-label={`${card.label} learner type`}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: card.iconBg, color: card.iconColor }}
        >
          <card.Icon size={22} />
        </div>

        {/* Decorative scribble above title */}
        <div className="w-8 h-1 rounded-full opacity-30" style={{ backgroundColor: card.iconColor }} aria-hidden="true" />

        {/* Label */}
        <h3 className="font-serif font-semibold text-base text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 leading-tight">
          {card.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#1C1917]/60 dark:text-white/60 transition-colors duration-300 font-sans leading-relaxed">
          {card.description}
        </p>
      </motion.article>
    </FadeIn>
  );
});

/**
 * PlatformSection: "Designed for every kind of learner."
 * Light cream background, centered heading, 4 learner type cards.
 * Paper-torn divider from dark → cream above.
 */
export function PlatformSection(): React.JSX.Element {
  return (
    <>
      {/* Page divider: dark/light transition line */}
      <div className="w-full overflow-hidden bg-[#0F0F1A] dark:bg-[#FAF7F2] transition-colors duration-300 leading-[0] mb-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full block text-stone-200/30 dark:text-stone-300/40 transition-colors duration-300 translate-y-[1px]"
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
        id="platform-section"
        className="relative bg-[#FAF7F2] dark:bg-[#0f0f10] text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="platform-heading"
      >
        {/* Floating decorations */}
        <div className="absolute top-12 right-16 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={7} yOffset={3}>
            <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-[#A97E3E]/20" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute top-8 left-12 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={9} yOffset={2}>
            <DecorativeAsset asset={TinyStar} className="w-4 h-4 text-stone-400/25" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute bottom-16 right-24 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={6} yOffset={3}>
            <DecorativeAsset asset={EditorialStar} className="w-5 h-5 text-[#A97E3E]/15" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        {/* Decorative arrow near heading */}
        <div className="absolute top-20 left-1/2 pointer-events-none hidden lg:block" aria-hidden="true">
          <FloatingDecoration duration={5} yOffset={2}>
            <DecorativeAsset asset={StatementArrow03} className="w-8 h-auto text-stone-400/25 rotate-[25deg]" strokeWidth={1} />
          </FloatingDecoration>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28">

          {/* Centered heading */}
          <FadeIn direction="up" duration="slow" className="text-center mb-12 md:mb-16">
            <h2
              id="platform-heading"
              className="font-serif font-bold text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-[46px]"
            >
              Designed{' '}
              <em className="italic not-italic font-bold text-[#1C1917] dark:text-white transition-colors duration-300">for every kind</em>{' '}
              of learner
            </h2>
          </FadeIn>

          {/* 4 cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            role="list"
            aria-label="Learner types"
          >
            {LEARNER_TYPES.map((card, i) => (
              <div key={card.id} role="listitem">
                <LearnerCard card={card} delay={0.05 + i * 0.07} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default PlatformSection;
