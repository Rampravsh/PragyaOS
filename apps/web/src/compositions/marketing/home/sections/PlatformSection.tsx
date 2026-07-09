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
import { cn } from '@pragyaos/utils';

const LEARNER_TYPES = [
  {
    id: 'students',
    Icon: BookIcon,
    label: 'Students',
    description: 'Master skills, clear doubts, and build real knowledge.',
    iconBgClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    lineBgClass: 'bg-emerald-500/35',
  },
  {
    id: 'instructors',
    Icon: PlayIcon,
    label: 'Instructors',
    description: 'Create impactful courses and reach more learners.',
    iconBgClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    lineBgClass: 'bg-amber-500/35',
  },
  {
    id: 'organizations',
    Icon: LayersIcon,
    label: 'Organizations',
    description: 'Train teams and build a culture of continuous learning.',
    iconBgClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    lineBgClass: 'bg-blue-500/35',
  },
  {
    id: 'lifelong-learners',
    Icon: UserIcon,
    label: 'Lifelong Learners',
    description: 'Explore new interests and grow every day.',
    iconBgClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    lineBgClass: 'bg-violet-500/35',
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
        className="flex flex-col items-start gap-4 p-6 bg-card text-card-foreground border border-border/80 rounded-xl shadow-sm cursor-default h-full transition-colors duration-300"
        whileHover={{ y: -6, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.10)' }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        aria-label={`${card.label} learner type`}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            card.iconBgClass
          )}
        >
          <card.Icon size={22} />
        </div>

        {/* Decorative scribble above title */}
        <div className={cn("w-8 h-1 rounded-full opacity-60", card.lineBgClass)} aria-hidden="true" />

        {/* Label */}
        <h3 className="font-serif font-semibold text-base text-foreground leading-tight">
          {card.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/70 font-sans leading-relaxed">
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
      {/* Paper-torn divider: dark → cream */}
      <div className="relative w-full overflow-hidden bg-[#0F0F1A] transition-colors duration-300" style={{ height: 64 }} aria-hidden="true">
        <svg
          className="absolute bottom-0 left-0 w-full text-background transition-colors duration-300 translate-y-[1px]"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,32 C90,10 180,52 270,28 C360,4 450,50 540,30 C630,10 720,48 810,28 C900,8 990,46 1080,26 C1170,6 1260,44 1350,24 C1400,14 1425,34 1440,28 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <section
        id="platform-section"
        className="relative bg-background text-foreground transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="platform-heading"
      >
        {/* Floating decorations */}
        <div className="absolute top-12 right-16 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={7} yOffset={3}>
            <DecorativeAsset asset={Sparkle} className="w-5 h-5 text-brand-gold/20" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute top-8 left-12 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={9} yOffset={2}>
            <DecorativeAsset asset={TinyStar} className="w-4 h-4 text-stone-400/25" strokeWidth={1} />
          </FloatingDecoration>
        </div>
        <div className="absolute bottom-16 right-24 pointer-events-none" aria-hidden="true">
          <FloatingDecoration duration={6} yOffset={3}>
            <DecorativeAsset asset={EditorialStar} className="w-5 h-5 text-brand-gold/15" strokeWidth={1} />
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
              className="font-serif font-bold text-foreground leading-[1.1] tracking-tight text-3xl sm:text-4xl lg:text-[46px]"
            >
              Designed{' '}
              <em className="italic not-italic font-bold text-foreground">for every kind</em>{' '}
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
