import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  BookIcon,
  PencilIcon,
  LayersIcon,
  TrophyIcon,
  StarIcon,
} from '@pragyaos/icons';
import {
  StatementCircle01,
  StatementArrow01,
  Sparkle,
  TinyStar,
  EditorialStar,
  PaperPlane,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';

// Trusted learner avatar images
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=64&h=64&q=80',
];

// Journey steps matching the design
const JOURNEY_STEPS = [
  {
    num: '01',
    label: 'Learn',
    description: 'Understand concepts that truly matter.',
    Icon: BookIcon,
    color: '#059669',
    bg: '#E6F0EA',
    border: 'border-emerald-200',
    position: 'top-[5%] left-[8%]',
  },
  {
    num: '02',
    label: 'Practice',
    description: 'Strengthen your skills with real practice.',
    Icon: PencilIcon,
    color: '#D97706',
    bg: '#FEF3C7',
    border: 'border-amber-200',
    position: 'top-[30%] right-[4%]',
  },
  {
    num: '03',
    label: 'Build',
    description: 'Apply your knowledge and create with confidence.',
    Icon: LayersIcon,
    color: '#2563EB',
    bg: '#EFF6FF',
    border: 'border-blue-200',
    position: 'top-[57%] left-[8%]',
  },
  {
    num: '04',
    label: 'Achieve',
    description: 'Earn recognition. Grow your future. Inspire others.',
    Icon: TrophyIcon,
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: 'border-purple-200',
    position: 'bottom-[5%] right-[8%]',
  },
];

import leafBranchHero from '@/assets/leaf_branch_hero.png';

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

/** Single journey step card */
const JourneyStep = memo(function JourneyStep({
  step,
}: {
  step: (typeof JOURNEY_STEPS)[0];
}) {
  return (
    <motion.div
      className={`absolute ${step.position} flex items-start gap-2.5 z-10 max-w-[175px]`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${step.border}`}
        style={{ backgroundColor: step.bg, color: step.color }}
      >
        <step.Icon size={16} />
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-[9px] font-mono font-bold px-1 rounded-sm"
            style={{ color: step.color, backgroundColor: `${step.bg}` }}
          >
            {step.num}
          </span>
          <span className="text-[13px] font-serif font-semibold text-[#1C1917] dark:text-white/90">
            {step.label}
          </span>
        </div>
        <p className="text-[10px] text-[#1C1917]/60 dark:text-white/60 font-sans leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
});

/** Journey path connecting all 4 steps with dashed line + small dots */
function JourneyPath(): React.JSX.Element {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 520"
      fill="none"
      aria-hidden="true"
    >
      {/* Winding dashed connector path */}
      <path
        d="M 140,60 C 300,60 340,175 360,175 C 200,175 200,300 170,310 C 330,310 350,420 360,440"
        stroke="currentColor"
        className="text-[#C4B9A8] dark:text-stone-700 transition-colors duration-300"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Handwritten-style sticky note component */
function StickyNote({
  text,
  className,
  rotate = 0,
}: {
  text: string;
  className?: string;
  rotate?: number;
}): React.JSX.Element {
  return (
    <FloatingDecoration duration={6} yOffset={3}>
      <div
        className={`bg-[#FEFCE8] dark:bg-stone-900 border border-amber-200/60 dark:border-stone-850 shadow-sm px-3 py-2 font-serif italic text-[10px] text-[#1C1917]/65 dark:text-stone-300 leading-tight max-w-[110px] pointer-events-none transition-colors duration-300 ${className ?? ''}`}
        style={{ transform: `rotate(${rotate}deg)` }}
        aria-hidden="true"
      >
        {text}
      </div>
    </FloatingDecoration>
  );
}

/**
 * HeroSection: Pixel-faithful recreation of the approved design hero.
 *
 * LEFT COLUMN:
 *   - "The journey matters" eyebrow in amber
 *   - "Every learner has a path." serif heading (dark)
 *   - "We help you go further." italic gold bold heading
 *   - Description paragraph
 *   - "Start Your Journey →" + "Explore Courses" buttons
 *   - Avatar group + 5 stars + "Trusted by 50,000+ learners..." text
 *   - Botanical leaf decoration on left edge
 *
 * RIGHT COLUMN:
 *   - Paper card with slight tilt (-2°)
 *   - Journey path (dashed winding SVG line)
 *   - 4 step cards: Learn, Practice, Build, Achieve
 *   - "Keep learning, keep growing" sticky note
 *   - "You've got this!" annotation
 *   - "Small steps today, bright future tomorrow." sticky note
 *   - Floating paper plane + stars
 */
export function HeroSection(): React.JSX.Element {
  return (
    <section
      id="hero-section"
      className="relative bg-[#FAF7F2] dark:bg-[#0f0f10] text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 overflow-hidden w-full"
      aria-labelledby="hero-headline"
    >
      {/* Page-wide background texture dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
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
                  className="font-serif font-light text-[#1C1917] dark:text-[#f5f5f4] leading-[1.07] tracking-tight text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px]"
                >
                  Every learner
                  <br />
                  has a path.
                </h1>
                {/* Italic gold subheadline */}
                <p className="font-serif italic font-normal text-[#A97E3E] leading-[1.07] tracking-tight text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] mt-1">
                  We help you
                  <br />
                  go further.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#1C1917]/70 dark:text-[#f5f5f4]/70 font-sans leading-relaxed max-w-sm">
                PragyaOS is your space to learn, practice, build and grow. From your
                first lesson to your greatest achievement—we're with you at every step.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1C1917] dark:bg-[#FAF7F2] hover:bg-black dark:hover:bg-white text-white dark:text-[#0C0C12] text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start Your Journey →
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-5 py-2.5 border border-[#1C1917]/25 dark:border-white/20 hover:border-[#1C1917]/60 dark:hover:border-white/50 text-[#1C1917] dark:text-[#FAF7F2] text-sm font-sans font-medium rounded-md transition-all duration-200 hover:bg-stone-100 dark:hover:bg-white/5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      className="w-8 h-8 rounded-full border-2 border-[#FAF7F2] dark:border-[#0f0f10] object-cover shadow-sm"
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
                  <span className="text-[11px] font-sans text-[#1C1917]/60 dark:text-[#f5f5f4]/60 leading-tight">
                    Trusted by{' '}
                    <strong className="font-semibold text-[#1C1917]/80 dark:text-[#f5f5f4]/80">50,000+</strong>{' '}
                    learners<br />and educators worldwide
                  </span>
                </div>
              </div>

              {/* Botanical leaf */}
              <BotanicalLeaf />
            </div>
          </FadeIn>

          {/* ──────── RIGHT COLUMN ──────── */}
          <FadeIn direction="up" duration="slow" delay={0.15}>
            <div className="relative w-full flex items-center justify-center">

              {/* Background tilted paper shadow */}
              <div
                className="absolute inset-2 bg-[#EFE9DF] dark:bg-stone-900 rounded-2xl shadow-sm rotate-[1.5deg]"
                aria-hidden="true"
              />

              {/* Main paper card */}
              <div className="relative w-full bg-[#FDFCF9] dark:bg-[#161622] border border-stone-200/60 dark:border-stone-800/80 rounded-xl shadow-lg -rotate-[1deg] p-6 md:p-8 min-h-[480px] md:min-h-[520px] overflow-hidden select-none transition-colors duration-300">

                {/* Subtle cross-dot pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%231C1917'/%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Winding dashed journey path */}
                <JourneyPath />

                {/* 4 journey step cards */}
                {JOURNEY_STEPS.map((step) => (
                  <JourneyStep key={step.num} step={step} />
                ))}

                {/* Floating sticky: "Keep learning, keep growing" — top right */}
                <div className="absolute top-3 right-3">
                  <StickyNote
                    text={"Keep learning,\nkeep growing."}
                    rotate={3}
                    className="text-[9px]"
                  />
                </div>

                {/* "You've got this!" annotation — bottom center-left */}
                <div className="absolute bottom-[14%] left-[30%]">
                  <FloatingDecoration duration={5} yOffset={2}>
                    <div className="relative flex items-center justify-center" aria-hidden="true">
                      <DecorativeAsset
                        asset={StatementCircle01}
                        className="absolute w-28 h-auto text-emerald-700/15"
                        strokeWidth={1.2}
                      />
                      <span className="font-serif italic text-[11px] text-[#1C1917]/65 relative z-10 py-1.5 px-2">
                        You&apos;ve got this!
                      </span>
                    </div>
                  </FloatingDecoration>
                </div>

                {/* Sticky: "Small steps today, bright future tomorrow." — bottom right */}
                <div className="absolute bottom-3 right-3">
                  <StickyNote
                    text={"Small steps\ntoday, bright\nfuture tomorrow. ♥"}
                    rotate={-4}
                    className="text-[8px]"
                  />
                </div>

                {/* Floating paper plane — top area */}
                <div className="absolute top-[12%] left-[36%] rotate-[-20deg] opacity-35 pointer-events-none" aria-hidden="true">
                  <FloatingDecoration duration={7} yOffset={4}>
                    <DecorativeAsset
                      asset={PaperPlane}
                      className="w-8 h-8 text-stone-500"
                      strokeWidth={1.2}
                    />
                  </FloatingDecoration>
                </div>

                {/* Decorative arrow from step 1 toward step 2 */}
                <div className="absolute top-[22%] left-[2%] rotate-[40deg] opacity-40 pointer-events-none" aria-hidden="true">
                  <DecorativeAsset
                    asset={StatementArrow01}
                    className="w-8 h-auto text-stone-400"
                    strokeWidth={1}
                  />
                </div>

                {/* Small sparkle stars scattered */}
                <div className="absolute top-[48%] right-[2%] pointer-events-none" aria-hidden="true">
                  <FloatingDecoration duration={6} yOffset={2}>
                    <DecorativeAsset
                      asset={Sparkle}
                      className="w-4 h-4 text-amber-400/50"
                      strokeWidth={1}
                    />
                  </FloatingDecoration>
                </div>
                <div className="absolute top-[72%] left-[50%] pointer-events-none" aria-hidden="true">
                  <FloatingDecoration duration={8} yOffset={2}>
                    <DecorativeAsset
                      asset={TinyStar}
                      className="w-3 h-3 text-stone-400/50"
                      strokeWidth={1}
                    />
                  </FloatingDecoration>
                </div>
                <div className="absolute top-[8%] left-[55%] pointer-events-none" aria-hidden="true">
                  <FloatingDecoration duration={9} yOffset={3}>
                    <DecorativeAsset
                      asset={EditorialStar}
                      className="w-4 h-4 text-amber-500/30"
                      strokeWidth={1}
                    />
                  </FloatingDecoration>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
