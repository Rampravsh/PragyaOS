import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { PaperCard } from '@/components/ui/PaperCard';

export interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StatsProps {
  items: StatItem[];
  title?: string;
  description?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
  overlap?: boolean;
}

export function StatCard({ value, label, icon }: StatItem) {
  return (
    <PaperCard variant="grid" className="p-6 text-center space-y-3 border border-border bg-surface shadow-button">
      {icon && <div className="mx-auto w-8 h-8 flex items-center justify-center text-accent-gold">{icon}</div>}
      <span className="text-display-lg font-heading font-extrabold text-accent-gold leading-none block">
        {value}
      </span>
      <p className="text-caption font-semibold tracking-wider text-text-muted uppercase font-body">
        {label}
      </p>
    </PaperCard>
  );
}

export function Stats({
  items,
  title,
  description,
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'cream',
  overlap = false,
}: StatsProps) {
  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      overlap={overlap}
      padding="md"
    >
      <Container width="desktop" className="space-y-10 select-none">
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            {title && <h3 className="text-h2 font-heading font-bold text-text-primary">{title}</h3>}
            {description && <p className="text-body text-text-secondary font-body">{description}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <StatCard key={idx} value={item.value} label={item.label} icon={item.icon} />
          ))}
        </div>
      </Container>
    </PaperSection>
  );
}
