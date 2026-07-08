import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '../SectionHeading';
import { FeatureCard, FeatureCardProps } from '../FeatureCard';

export interface FeatureGridProps {
  items: FeatureCardProps[];
  columns?: 2 | 3 | 4;
  title?: string;
  eyebrow?: string;
  description?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
}

export function FeatureGrid({
  items,
  columns = 3,
  title,
  eyebrow,
  description,
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'white',
}: FeatureGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
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
        <div className={`grid gap-6 ${columnClasses[columns]}`}>
          {items.map((item, idx) => (
            <FeatureCard
              key={idx}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant={item.variant}
              illustration={item.illustration}
            />
          ))}
        </div>
      </Container>
    </PaperSection>
  );
}
