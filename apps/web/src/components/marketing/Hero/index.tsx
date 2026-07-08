import React from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface HeroProps {
  title: string;
  subtitle: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  illustration?: React.ReactNode;
  badges?: string[];
  stats?: { value: string; label: string }[];
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
}

export function Hero({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  illustration,
  badges,
  stats,
  topDecoration,
  bottomDecoration,
  paperVariant = 'hero',
  backgroundVariant = 'cream',
}: HeroProps) {
  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      padding="lg"
    >
      <Container width="desktop" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, idx) => (
                <Badge key={idx} variant="gold" className="text-caption font-semibold uppercase tracking-wider">
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-display-xl font-heading text-text-primary leading-tight font-extrabold max-w-xl">
            {title}
          </h1>

          <p className="text-body-lg text-text-secondary leading-relaxed font-body max-w-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {primaryAction && (
              <Button variant="primary" size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" size="lg" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-divider mt-8 max-w-md">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-display-sm font-heading font-extrabold text-accent-gold block leading-none">
                    {stat.value}
                  </span>
                  <span className="text-caption text-text-muted font-body font-semibold uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-6 flex justify-center relative z-10">
          {illustration}
        </div>

      </Container>
    </PaperSection>
  );
}
