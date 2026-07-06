import React from 'react';
import {
  PaperArrow,
  HighlightCircle,
  StatementWiggle01,
  StatementCircle01,
  CornerDoodles,
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
  EditorialHighlight,
} from '@/components/marketing/shared/Typography';
import { SplitLayout } from '@/components/marketing/layout/SplitLayout';
import { ContentStack } from '@/components/marketing/layout/ContentStack';
import { DecorativeAsset } from '@/components/marketing/media/DecorativeAsset';
import { EditorialPattern } from '@/components/marketing/shared/EditorialPattern';
import { FadeIn } from '@/components/marketing/motion/FadeIn';
import { Reveal } from '@/components/marketing/motion/Reveal';
import { FloatingDecoration } from '@/components/marketing/motion/FloatingDecoration';

/**
 * HeroSection: Production-ready editorial landing section.
 * Inspired by the academic depth and visual quietude of Ellipsus.
 * Composes responsive two-column grid:
 *   - Left: Typography displays, paragraphs, CTAs, trust wiggles.
 *   - Right: Stacked paper layers, corner doodles, annotated labels.
 */
export function HeroSection(): React.JSX.Element {
  return (
    <EditorialSection
      id="hero-section"
      variant="light"
      aria-labelledby="hero-title"
      className="pt-8 md:pt-12"
    >
      <SectionContainer className="!py-16 md:!py-24 lg:!py-32">
        <SplitLayout ratio="1:1" gap="lg" align="center">
          
          {/* Left Column: Editorial Messaging */}
          <FadeIn direction="up" duration="slow" className="flex flex-col items-start text-left">
            <ContentStack gap="md" className="items-start">
              {/* Eyebrow Label */}
              <EditorialCaption className="text-primary/70 tracking-widest font-semibold">
                An Educational Ecosystem
              </EditorialCaption>

              {/* Master Display Headline */}
              <Reveal duration="slow">
                <EditorialDisplay id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight">
                  Reimagine learning through{' '}
                  <EditorialHighlight decoration="scribble" className="text-primary">
                    digital quietude.
                  </EditorialHighlight>
                </EditorialDisplay>
              </Reveal>

              {/* Core Description Copy */}
              <EditorialParagraph lead className="text-muted-foreground max-w-xl font-light leading-relaxed mt-2">
                PragyaOS provides an elegant, distraction-free environment for lifelong learners 
                and educators. Designed around deep focus, structural clarity, and technical mastery.
              </EditorialParagraph>

              {/* CTAs Actions Row */}
              <div className="flex flex-wrap gap-4 items-center mt-6 w-full sm:w-auto">
                <PrimaryButton href="/login" size="lg">
                  Explore Courses
                </PrimaryButton>
                <SecondaryButton href="/docs" size="lg">
                  View Documentation
                </SecondaryButton>
              </div>

              {/* Trust validation with hand-drawn squiggle decoration */}
              <div className="flex items-center gap-3 mt-8 text-xs text-muted-foreground/80 font-sans tracking-wide">
                <FloatingDecoration duration={5} yOffset={2}>
                  <DecorativeAsset
                    asset={StatementWiggle01}
                    className="text-primary/40 w-16 h-auto"
                    strokeWidth={1.8}
                  />
                </FloatingDecoration>
                <span>Supported by modern pedagogical frameworks</span>
              </div>
            </ContentStack>
          </FadeIn>

          {/* Right Column: Stacked Paper Composition & Annotations */}
          <FadeIn direction="up" duration="slow" delay={0.15} className="w-full">
            <div className="relative w-full max-w-lg mx-auto aspect-[4/3] sm:aspect-[1.34] select-none">
              
              {/* Background Sheet Layer 1 (Cream Sheet Offset) */}
              <div className="absolute top-4 left-4 w-full h-full bg-paper-cream border border-border/80 -z-10 shadow-sm" />

              {/* Background Sheet Layer 2 (Muted Sheet Offset) */}
              <div className="absolute top-2 left-2 w-full h-full bg-stone-100/50 border border-border/60 -z-10" />

              {/* Foreground Canvas Layer */}
              <div className="relative w-full h-full bg-background border border-border p-8 flex flex-col justify-between overflow-hidden">
                {/* 1. Subtle repeating background cross pattern */}
                <EditorialPattern
                  pattern={TinyCrossPattern}
                  opacity={0.03}
                  width={140}
                  height={140}
                />

                {/* 2. Architectual corner borders */}
                <DecorativeAsset
                  asset={CornerDoodles}
                  className="absolute inset-0 w-full h-full text-border/40 pointer-events-none"
                  strokeWidth={1.2}
                />

                {/* 3. Visual Content - Abstract Editorial Elements */}
                <div className="relative w-full h-full flex flex-col justify-between z-10">
                  
                  {/* Top Row: Curiosity Circle Annotation */}
                  <div className="flex justify-start pt-6 pl-6">
                    <FloatingDecoration duration={6} yOffset={4}>
                      <div className="relative p-4 flex items-center justify-center">
                        <DecorativeAsset
                          asset={StatementCircle01}
                          className="absolute text-primary/30 w-28 h-auto"
                          strokeWidth={1.5}
                        />
                        <span className="font-serif italic text-sm tracking-wide text-foreground relative z-10">
                          Curiosity
                        </span>
                      </div>
                    </FloatingDecoration>
                  </div>

                  {/* Mid Row: Floating Arrow and Synthesis Label */}
                  <div className="flex justify-between items-center px-8 my-auto">
                    {/* Floating connecting arrow */}
                    <div className="translate-x-12 translate-y-2 rotate-12 opacity-80">
                      <FloatingDecoration duration={5} yOffset={3}>
                        <DecorativeAsset
                          asset={PaperArrow}
                          className="text-primary/40 w-12 h-auto"
                          strokeWidth={1.5}
                        />
                      </FloatingDecoration>
                    </div>

                    <div className="relative p-2 flex flex-col items-center">
                      <span className="font-sans text-[11px] uppercase tracking-wider font-bold text-muted-foreground/80 mb-1">
                        Phase II
                      </span>
                      <span className="font-serif text-lg text-foreground font-medium">
                        Synthesis
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Highlighted Framework Label */}
                  <div className="flex justify-end pb-6 pr-6">
                    <div className="relative flex flex-col items-end">
                      <div className="relative py-2 px-1">
                        <DecorativeAsset
                          asset={HighlightCircle}
                          className="absolute -inset-1 text-primary/20 w-32 h-auto pointer-events-none"
                          strokeWidth={1.5}
                        />
                        <span className="font-sans text-xs font-semibold tracking-widest uppercase text-foreground relative z-10">
                          Framework
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </FadeIn>

        </SplitLayout>
      </SectionContainer>
    </EditorialSection>
  );
}

export default HeroSection;
