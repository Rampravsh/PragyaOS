import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  StatementUnderline08,
  PaperPlane,
  Sparkle,
  TinyStar,
  EditorialStar,
} from '@pragyaos/assets';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';

const BENEFITS = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

/** Bullseye / target SVG matching the design's right-side decoration */
function TargetDecoration(): React.JSX.Element {
  return (
    <svg
      className="w-28 h-28 md:w-36 md:h-36 opacity-20 pointer-events-none"
      viewBox="0 0 80 80"
      fill="none"
      stroke="#A97E3E"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="36" />
      <circle cx="40" cy="40" r="24" />
      <circle cx="40" cy="40" r="12" />
      <circle cx="40" cy="40" r="3" fill="#A97E3E" stroke="none" />
      {/* Arrow in the bullseye */}
      <line x1="40" y1="4" x2="40" y2="32" strokeWidth="2" />
      <polyline points="33,12 40,4 47,12" strokeWidth="2" />
    </svg>
  );
}

/**
 * CTASection: "Your journey starts here." — closing editorial CTA.
 *
 * Design layout:
 *   LEFT: Large floating paper plane illustration
 *   CENTER: "Your journey starts here." heading | Join text | "Get Started for Free →" button
 *   RIGHT: 3 benefit checkmarks | Bullseye/target decoration
 */
export function CTASection(): React.JSX.Element {
  return (
    <>
      {/* Page divider line at the top */}
      <div className="w-full overflow-hidden bg-background transition-colors duration-300 leading-[0] mb-0" aria-hidden="true">
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
        id="cta-section"
        className="relative bg-background text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 w-full overflow-hidden"
        aria-labelledby="cta-heading"
      >
      {/* Floating decorations */}
      <div className="absolute top-8 left-1/4 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={8} yOffset={4}>
          <DecorativeAsset asset={Sparkle} className="w-6 h-6 text-[#A97E3E]/20" strokeWidth={1} />
        </FloatingDecoration>
      </div>
      <div className="absolute bottom-12 right-1/4 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={6} yOffset={3}>
          <DecorativeAsset asset={TinyStar} className="w-4 h-4 text-stone-400/25" strokeWidth={1} />
        </FloatingDecoration>
      </div>
      <div className="absolute top-16 right-1/3 pointer-events-none" aria-hidden="true">
        <FloatingDecoration duration={10} yOffset={2}>
          <DecorativeAsset asset={EditorialStar} className="w-4 h-4 text-[#A97E3E]/15" strokeWidth={1} />
        </FloatingDecoration>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-8 lg:gap-12 items-center">

          {/* LEFT: Large paper plane illustration */}
          <FadeIn direction="up" duration="slow">
            <div className="flex items-center justify-center lg:justify-start">
              <FloatingDecoration duration={8} yOffset={8}>
                <div className="rotate-[-25deg] opacity-60">
                  <DecorativeAsset
                    asset={PaperPlane}
                    className="w-28 h-28 md:w-36 md:h-36 text-[#A97E3E]"
                    strokeWidth={1.5}
                  />
                </div>
              </FloatingDecoration>
            </div>
          </FadeIn>

          {/* CENTER: Heading + subtext + CTA button */}
          <FadeIn direction="up" duration="slow" delay={0.1}>
            <div className="flex flex-col items-start gap-5 text-left">
              <h2
                id="cta-heading"
                className="font-serif font-bold text-[#1C1917] dark:text-[#f5f5f4] transition-colors duration-300 leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-[52px]"
              >
                Your journey
                <br />
                starts{' '}
                <span className="relative italic text-[#A97E3E]">
                  here.
                  {/* Animated hand-drawn underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full pointer-events-none"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                    style={{ originX: 0 }}
                    aria-hidden="true"
                  >
                    <DecorativeAsset
                      asset={StatementUnderline08}
                      className="w-full h-auto text-[#A97E3E]"
                      strokeWidth={2}
                      opacity={0.55}
                    />
                  </motion.span>
                </span>
              </h2>

              <p className="text-sm text-[#1C1917]/65 dark:text-[#f5f5f4]/65 transition-colors duration-300 font-sans leading-relaxed max-w-xs">
                Join PragyaOS today and take the first step towards your goals.
              </p>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] dark:bg-white hover:bg-black dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Get Started for Free →
                </Link>
              </motion.div>
            </div>
          </FadeIn>

          {/* RIGHT: Benefit checkmarks + bullseye target */}
          <FadeIn direction="up" duration="slow" delay={0.18}>
            <div className="flex flex-col items-start lg:items-end gap-6">
              {/* Checkmarks */}
              <ul className="flex flex-col gap-3" role="list" aria-label="Plan benefits">
                {BENEFITS.map((benefit, i) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-[#1C1917]/70 dark:text-[#f5f5f4]/70 transition-colors duration-300 font-sans">
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.22 }}
                      className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors duration-300 shrink-0"
                      aria-hidden="true"
                    >
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1.5 6.5 4.5 9.5 10.5 3" />
                      </svg>
                    </motion.span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Target decoration */}
              <TargetDecoration />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  </>
  );
}

export default CTASection;
