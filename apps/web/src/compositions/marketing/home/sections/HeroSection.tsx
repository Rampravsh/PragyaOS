import React from 'react';
import {
  BookIcon,
  PencilIcon,
  LayersIcon,
  TrophyIcon,
} from '@pragyaos/icons';
import {
  StatementCircle01,
  StatementArrow01,
  StatementArrow03,
  TinyCrossPattern,
} from '@pragyaos/assets';
import { EditorialSection } from '@/components/marketing/section/EditorialSection';
import { SectionContainer } from '@/components/marketing/section/SectionContainer';
import {
  PrimaryButton,
  SecondaryButton,
} from '@/components/marketing/shared/Button';
import {
  EditorialDisplay,
  EditorialParagraph,
  EditorialCaption,
} from '@/components/marketing/shared/Typography';
import { SplitLayout } from '@/components/marketing/layout/SplitLayout';
import { ContentStack } from '@/components/marketing/layout/ContentStack';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';
import { EditorialPattern } from '@/components/marketing/shared/EditorialPattern';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { Reveal } from '@/components/marketing/motion/Reveal';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';

// Curated high-fidelity profile images for social proof
const studentAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
];

/**
 * Botanical Leaf Branch decoration for the Left Column base.
 */
function LeafDecoration(): React.JSX.Element {
  return (
    <svg
      className="absolute -left-8 -bottom-12 w-28 h-auto text-emerald-800/20 pointer-events-none z-0 hidden lg:block"
      viewBox="0 0 100 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M40,180 Q45,110 35,40 Q30,10 32,5" strokeLinecap="round" />
      <path d="M41,150 C26,140 10,142 5,130 C10,118 30,126 41,137" strokeLinejoin="round" />
      <path d="M40,130 C56,120 72,122 77,110 C72,98 52,106 40,117" strokeLinejoin="round" />
      <path d="M38,105 C23,95 7,97 2,85 C7,73 27,81 38,92" strokeLinejoin="round" />
      <path d="M37,85 C53,75 69,77 74,65 C69,53 49,61 37,72" strokeLinejoin="round" />
      <path d="M35,60 C20,50 4,52 -1,40 C4,28 24,36 35,47" strokeLinejoin="round" />
      <path d="M33,40 C49,30 65,32 70,20 C65,8 45,16 33,27" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Small paper plane SVG illustration.
 */
function PaperPlaneIcon(): React.JSX.Element {
  return (
    <svg
      className="w-5 h-5 text-stone-600/70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * HeroSection: Production-ready editorial landing section.
 * Recreates the "Every learner has a path. We make it meaningful." journey layout.
 * Color matched exactly to the soft warm cream and gold palettes (#FAF7F2, #FAF0D9, #A97E3E).
 */
export function HeroSection(): React.JSX.Element {
  return (
    <EditorialSection
      id="hero-section"
      variant="transparent"
      aria-labelledby="hero-title"
      className="!bg-[#FAF7F2] pt-8 md:pt-12 relative overflow-hidden"
    >
      <SectionContainer className="!py-12 md:!py-20 lg:!py-28 relative">
        <SplitLayout ratio="2:3" gap="lg" align="center">
          
          {/* Left Column: Editorial Messaging, CTAs, and Social Validation */}
          <FadeIn direction="up" duration="slow" className="flex flex-col items-start text-left relative z-10">
            <ContentStack gap="md" className="items-start relative w-full">
              {/* Eyebrow Label */}
              <EditorialCaption className="text-[#1C1917]/70 tracking-[0.15em] font-semibold text-xs font-sans uppercase">
                The Journey Matters
              </EditorialCaption>

              {/* Master Display Headline */}
              <Reveal duration="slow">
                <EditorialDisplay id="hero-title" className="text-[#1C1917] text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight font-serif">
                  Every learner <br />
                  has a path. <br />
                  We make it <br />
                  <span className="text-[#A97E3E] italic font-serif font-normal">meaningful.</span>
                </EditorialDisplay>
              </Reveal>

              {/* Core Description Copy */}
              <EditorialParagraph className="text-[#1C1917]/80 max-w-md font-light leading-relaxed text-base mt-2 font-sans">
                From your first lesson to your greatest achievement, PragyaOS helps you learn, 
                practice, build skills, and earn recognition — all in one beautiful workspace.
              </EditorialParagraph>

              {/* CTAs Actions Row */}
              <div className="flex flex-wrap gap-4 items-center mt-4 w-full sm:w-auto">
                <PrimaryButton href="/login" size="lg" className="!bg-[#18181b] hover:!bg-black font-semibold text-sm">
                  Start Your Journey →
                </PrimaryButton>
                <SecondaryButton href="/courses" size="lg" className="font-semibold text-sm border-transparent hover:bg-stone-200/50">
                  Explore Courses
                </SecondaryButton>
              </div>

              {/* Social Validation & Overlapping Avatars */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {studentAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Learner profile headshot ${i + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-[#FAF7F2] object-cover shadow-sm"
                    />
                  ))}
                </div>
                <span className="text-xs text-[#1C1917]/70 font-sans leading-snug max-w-[200px]">
                  Trusted by learners and educators building a better future together.
                </span>
              </div>

              {/* Botanical Leaf Art */}
              <LeafDecoration />
            </ContentStack>
          </FadeIn>

          {/* Right Column: Layered "Learning Journey" Paper Stack */}
          <div className="w-full relative z-10 flex items-center justify-center mt-12 lg:mt-0">
            {/* Base sheet: Rotated clockwise */}
            <div className="absolute top-2 left-2 w-full max-w-xl aspect-[1.34] bg-[#F3EFE9] border border-stone-200/60 rounded-xl rotate-1 -z-10 shadow-sm" />

            {/* Top Sheet: Rotated counter-clockwise */}
            <FadeIn direction="up" duration="slow" delay={0.15} className="w-full max-w-xl">
              <div className="relative w-full aspect-[1.34] bg-[#FCFAF7] border border-stone-200 rounded-xl -rotate-2 p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-md select-none">
                
                {/* Dots Pattern top right */}
                <div className="absolute top-6 right-6 opacity-30 pointer-events-none">
                  <EditorialPattern
                    pattern={TinyCrossPattern}
                    opacity={0.3}
                    width={40}
                    height={40}
                  />
                </div>

                {/* Dotted path connecting the steps (Winding spline path) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none text-stone-300/80"
                  viewBox="0 0 500 450"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                  aria-hidden="true"
                >
                  <path d="M 170,85 C 320,85 300,185 370,185 C 220,185 240,295 170,295 C 300,295 290,400 350,400" strokeLinecap="round" />
                </svg>

                {/* Step 1: Learn (Sage green background) */}
                <div className="absolute top-[8%] left-[10%] flex items-start gap-3 z-10 max-w-[170px]">
                  <div className="w-9 h-9 rounded-full bg-[#E6F0EA] flex items-center justify-center text-[#059669] flex-shrink-0 shadow-sm border border-emerald-100">
                    <BookIcon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#1C1917]/50 font-bold bg-[#E6F0EA]/50 px-1 rounded">01</span>
                      <h3 className="font-serif text-sm font-semibold text-[#1C1917]">Learn</h3>
                    </div>
                    <p className="text-[10px] text-[#1C1917]/70 leading-relaxed mt-0.5">
                      Understand concepts that truly matter.
                    </p>
                  </div>
                </div>

                {/* Step 2: Practice (Amber background) */}
                <div className="absolute top-[28%] right-[8%] flex items-start gap-3 z-10 max-w-[170px]">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0D9] flex items-center justify-center text-[#D97706] flex-shrink-0 shadow-sm border border-amber-100">
                    <PencilIcon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#1C1917]/50 font-bold bg-[#FAF0D9]/50 px-1 rounded">02</span>
                      <h3 className="font-serif text-sm font-semibold text-[#1C1917]">Practice</h3>
                    </div>
                    <p className="text-[10px] text-[#1C1917]/70 leading-relaxed mt-0.5">
                      Strengthen your skills with real practice.
                    </p>
                  </div>
                </div>

                {/* Step 3: Build (Blue background) */}
                <div className="absolute bottom-[35%] left-[8%] flex items-start gap-3 z-10 max-w-[170px]">
                  <div className="w-9 h-9 rounded-full bg-[#E8EEF5] flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-sm border border-blue-100">
                    <LayersIcon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#1C1917]/50 font-bold bg-[#E8EEF5]/50 px-1 rounded">03</span>
                      <h3 className="font-serif text-sm font-semibold text-[#1C1917]">Build</h3>
                    </div>
                    <p className="text-[10px] text-[#1C1917]/70 leading-relaxed mt-0.5">
                      Apply your knowledge and create with confidence.
                    </p>
                  </div>
                </div>

                {/* Step 4: Achieve (Lavender background) */}
                <div className="absolute bottom-[10%] right-[16%] flex items-start gap-3 z-10 max-w-[170px]">
                  <div className="w-9 h-9 rounded-full bg-[#F0EBF5] flex items-center justify-center text-[#7C3AED] flex-shrink-0 shadow-sm border border-purple-100">
                    <TrophyIcon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#1C1917]/50 font-bold bg-[#F0EBF5]/50 px-1 rounded">04</span>
                      <h3 className="font-serif text-sm font-semibold text-[#1C1917]">Achieve</h3>
                    </div>
                    <p className="text-[10px] text-[#1C1917]/70 leading-relaxed mt-0.5">
                      Earn recognition. Grow your future.
                    </p>
                  </div>
                </div>

                {/* Top Annotations: Keep Going + Paper Plane */}
                <div className="absolute top-[4%] right-[32%] flex items-center gap-1.5 rotate-[4deg]">
                  <FloatingDecoration duration={6} yOffset={2}>
                    <div className="flex flex-col items-center">
                      <span className="font-serif italic text-[11px] text-[#1C1917]/60">Keep going</span>
                      <PaperPlaneIcon />
                    </div>
                  </FloatingDecoration>
                  {/* Subtle hand-drawn arrow pointing to the plane */}
                  <DecorativeAsset
                    asset={StatementArrow03}
                    className="text-stone-400 w-8 h-auto rotate-12"
                    strokeWidth={1}
                  />
                </div>

                {/* Left hand-drawn arrow pointing up towards 'Learn' */}
                <div className="absolute top-[18%] left-[2%] rotate-45 opacity-60">
                  <DecorativeAsset
                    asset={StatementArrow01}
                    className="text-stone-400 w-8 h-auto"
                    strokeWidth={1}
                  />
                </div>

                {/* Bottom Annotations: You've got this! + Circle */}
                <div className="absolute bottom-[4%] left-[34%] rotate-[-2deg]">
                  <FloatingDecoration duration={5} yOffset={2}>
                    <div className="relative py-1.5 px-3 flex items-center justify-center">
                      <DecorativeAsset
                        asset={StatementCircle01}
                        className="absolute text-emerald-800/10 w-24 h-auto"
                        strokeWidth={1.2}
                      />
                      <span className="font-serif italic text-xs text-[#1C1917]/70 relative z-10">
                        You&apos;ve got this!
                      </span>
                    </div>
                  </FloatingDecoration>
                </div>

                {/* Bottom Right loop scribble */}
                <div className="absolute bottom-[2%] right-[2%] rotate-12 opacity-50">
                  <FloatingDecoration duration={7} yOffset={1.5}>
                    <div className="w-10 h-10 border-2 border-dashed border-stone-400/40 rounded-full flex items-center justify-center text-xs font-serif text-stone-400">
                      ✨
                    </div>
                  </FloatingDecoration>
                </div>

              </div>
            </FadeIn>
          </div>

        </SplitLayout>

        {/* Mobile Horizontal Steps Footer List (Visible only on mobile screen widths) */}
        <div className="block md:hidden w-full mt-12 pt-8 border-t border-stone-200/50">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {/* Mobile Step 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EA] flex items-center justify-center text-[#059669] shadow-sm flex-shrink-0">
                <BookIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] text-[#1C1917]/50 font-mono font-bold block">01 / LEARN</span>
                <span className="font-serif text-xs font-semibold text-[#1C1917]">Concepts</span>
              </div>
            </div>
            {/* Mobile Step 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF0D9] flex items-center justify-center text-[#D97706] shadow-sm flex-shrink-0">
                <PencilIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] text-[#1C1917]/50 font-mono font-bold block">02 / PRACTICE</span>
                <span className="font-serif text-xs font-semibold text-[#1C1917]">Skills</span>
              </div>
            </div>
            {/* Mobile Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8EEF5] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
                <LayersIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] text-[#1C1917]/50 font-mono font-bold block">03 / BUILD</span>
                <span className="font-serif text-xs font-semibold text-[#1C1917]">With Confidence</span>
              </div>
            </div>
            {/* Mobile Step 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F0EBF5] flex items-center justify-center text-[#7C3AED] shadow-sm flex-shrink-0">
                <TrophyIcon size={18} />
              </div>
              <div>
                <span className="text-[10px] text-[#1C1917]/50 font-mono font-bold block">04 / ACHIEVE</span>
                <span className="font-serif text-xs font-semibold text-[#1C1917]">Recognition</span>
              </div>
            </div>
          </div>
        </div>

      </SectionContainer>
    </EditorialSection>
  );
}

export default HeroSection;
