import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export interface AIShowcaseProps {
  title: string;
  subtitle: string;
  features: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  illustration?: React.ReactNode;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
  overlap?: boolean;
}

export function AIShowcase({
  title,
  subtitle,
  features,
  ctaLabel = 'Try AI Companion &rarr;',
  onCtaClick,
  illustration,
  topDecoration,
  bottomDecoration,
  paperVariant = 'dark-showcase',
  backgroundVariant = 'dark',
  overlap = false,
}: AIShowcaseProps) {
  const handleAction = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.location.href = '/register';
    }
  };

  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      overlap={overlap}
      padding="md"
    >
      <Container width="desktop" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6 relative z-10">
          <h2 className="text-display-md font-heading font-extrabold text-white leading-tight">
            {title}
          </h2>
          <p className="text-body text-stone-300 leading-relaxed font-body">
            {subtitle}
          </p>

          <ul className="space-y-3.5 pt-2">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-small text-stone-200 font-body font-semibold">
                <div className="w-5 h-5 rounded-full bg-accent-gold/15 border border-accent-gold/25 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent-gold" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <Button variant="primary" size="lg" className="mt-4" onClick={handleAction}>
            <span dangerouslySetInnerHTML={{ __html: ctaLabel }} />
          </Button>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-7 flex justify-center relative z-10">
          {illustration}
        </div>

      </Container>
    </PaperSection>
  );
}
