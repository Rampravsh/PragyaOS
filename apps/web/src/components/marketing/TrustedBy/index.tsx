import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';

export interface TrustedByProps {
  logos: string[];
  title?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
}

export function TrustedBy({
  logos,
  title = 'Empowering learners across elite spaces',
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'cream',
}: TrustedByProps) {
  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      padding="none"
      className="border-y border-divider py-10 select-none text-center"
    >
      <Container width="desktop" className="space-y-6">
        {title && (
          <span className="text-caption font-semibold tracking-wider text-text-muted uppercase font-body block">
            {title}
          </span>
        )}
        <div className="flex flex-wrap justify-center items-center gap-12 px-6">
          {logos.map((logo, idx) => (
            <span
              key={idx}
              className="font-heading text-h3 text-text-muted/60 font-extrabold hover:text-text-primary transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </Container>
    </PaperSection>
  );
}
