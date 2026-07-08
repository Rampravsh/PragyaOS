import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { Check } from 'lucide-react';

export interface FeatureHighlightProps {
  title: string;
  description: string;
  features?: string[];
  illustration?: React.ReactNode;
  align?: 'left' | 'right';
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
}

export function FeatureHighlight({
  title,
  description,
  features,
  illustration,
  align = 'left',
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'white',
}: FeatureHighlightProps) {
  const isLeft = align === 'left';

  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      padding="md"
    >
      <Container width="desktop" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        
        {/* Text Column */}
        <div className={`lg:col-span-5 space-y-6 relative z-10 ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <h2 className="text-display-md font-heading font-extrabold text-text-primary leading-tight">
            {title}
          </h2>
          <p className="text-body text-text-secondary leading-relaxed font-body">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="space-y-3 pt-2">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-small text-text-primary font-body font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-success" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Illustration Column */}
        <div className={`lg:col-span-7 flex justify-center relative z-10 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          {illustration}
        </div>

      </Container>
    </PaperSection>
  );
}
