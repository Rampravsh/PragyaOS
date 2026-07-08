import HeroSection from './sections/Hero';
import FeaturesSection from './sections/Features';
import ShowcaseSection from './sections/Showcase';
import AudienceSection from './sections/Audience';
import TestimonialsSection from './sections/Testimonials';
import CTASection from './sections/CTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <AudienceSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
