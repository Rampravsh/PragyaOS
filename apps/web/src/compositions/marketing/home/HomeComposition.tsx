import React from 'react';

// Import composed section placeholders
import HeroSection from '@/compositions/marketing/home/sections/HeroSection';
import StorySection from '@/compositions/marketing/home/sections/StorySection';
import FeatureSection from '@/compositions/marketing/home/sections/FeatureSection';
import PlatformSection from '@/compositions/marketing/home/sections/PlatformSection';
import SocialProofSection from '@/compositions/marketing/home/sections/SocialProofSection';
import CTASection from '@/compositions/marketing/home/sections/CTASection';

/**
 * HomeComposition: Master composition layout for the marketing homepage.
 * Composes section placeholders in sequential order.
 */
export function HomeComposition(): React.JSX.Element {
  return (
    <div className="home-composition-root flex flex-col w-full">
      {/* 1. Hero landing segment */}
      <HeroSection />

      {/* 2. Brand philosophy narrative */}
      <StorySection />

      {/* 3. Core feature grids */}
      <FeatureSection />

      {/* 4. Technical dashboard previews */}
      <PlatformSection />

      {/* 5. Logo grid & client social proofs */}
      <SocialProofSection />

      {/* 6. Closing call-to-action */}
      <CTASection />
    </div>
  );
}

export default HomeComposition;
