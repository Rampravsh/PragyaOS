import React from 'react';

// Import composed section implementations in sequential design order
import HeroSection from '@/compositions/marketing/home/sections/HeroSection';
import StorySection from '@/compositions/marketing/home/sections/StorySection';
import FeatureSection from '@/compositions/marketing/home/sections/FeatureSection';
import PlatformSection from '@/compositions/marketing/home/sections/PlatformSection';
import SocialProofSection from '@/compositions/marketing/home/sections/SocialProofSection';
import CTASection from '@/compositions/marketing/home/sections/CTASection';

/**
 * HomeComposition: Master composition layout for the marketing homepage.
 *
 * Section order (matches approved design):
 *   1. Hero — "Every learner has a path."
 *   2. Story — "A better way to learn." (4 feature pillars)
 *   3. Feature — "A platform built for meaningful learning." (dark dashboard mockup)
 *   4. Platform — "Designed for every kind of learner." (4 learner cards)
 *   5. SocialProof — "Loved by learners around the world." (testimonials)
 *   6. CTA — "Your journey starts here."
 */
export function HomeComposition(): React.JSX.Element {
  return (
    <div className="home-composition-root flex flex-col w-full" id="homepage-root">
      {/* 1. Hero — editorial paper-stack journey illustration */}
      <HeroSection />

      {/* 2. Better Way To Learn — editorial 4-column feature grid */}
      <StorySection />

      {/* 3. Platform — dark dashboard + phone mockup section */}
      <FeatureSection />

      {/* 4. Learner Types — 4 animated archetype cards */}
      <PlatformSection />

      {/* 5. Testimonials — 3 soft paper cards with slider */}
      <SocialProofSection />

      {/* 6. CTA — large editorial closing with paper plane */}
      <CTASection />
    </div>
  );
}

export default HomeComposition;
