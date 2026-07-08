import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '../SectionHeading';
import { PaperCard } from '@/components/ui/PaperCard';

export interface JourneyStep {
  number: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
}

export interface LearningJourneyProps {
  steps: JourneyStep[];
  title?: string;
  eyebrow?: string;
  description?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
  overlap?: boolean;
}

export function LearningJourney({
  steps,
  title,
  eyebrow,
  description,
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'cream',
  overlap = false,
}: LearningJourneyProps) {
  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      overlap={overlap}
      padding="md"
    >
      <Container width="desktop" className="space-y-12">
        {title && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            alignment="center"
            className="mx-auto mb-10"
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <PaperCard
                variant="notebook"
                className="p-6 h-56 flex flex-col justify-between border border-border/80 hover:shadow-card transition-shadow text-left bg-surface"
              >
                <div className="flex justify-between items-start">
                  <span className="text-display-sm font-heading font-extrabold text-accent-gold/30">
                    {step.number}
                  </span>
                  {step.icon && (
                    <div className="w-8 h-8 rounded-full bg-background-secondary border border-border flex items-center justify-center">
                      {step.icon}
                    </div>
                  )}
                </div>
                <div className="space-y-1 mt-4">
                  <h4 className="text-body font-heading font-extrabold text-text-primary">
                    {step.label}
                  </h4>
                  <p className="text-small text-text-secondary leading-relaxed font-body">
                    {step.description}
                  </p>
                </div>
              </PaperCard>
              {step.illustration && (
                <div className="absolute -bottom-8 -right-4 pointer-events-none select-none z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.illustration}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </PaperSection>
  );
}
