import React from 'react';
import { PaperCard } from '@/components/ui/PaperCard';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  desc?: string; // Backward compatibility
  variant?: 'plain' | 'notebook' | 'accent' | 'outlined';
  illustration?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  desc,
  variant = 'outlined',
  illustration,
  className = '',
}: FeatureCardProps) {
  const displayDescription = description || desc || '';
  const cardVariants = {
    plain: 'bg-surface border border-border hover:shadow-card transition-shadow',
    notebook: 'paper-notebook p-6 hover:shadow-card transition-shadow',
    accent: 'border-accent-gold/45 bg-[#fefdfa] shadow-card',
    outlined: 'border border-border/80 bg-surface hover:border-accent-gold/30 hover:shadow-card transition-all',
  };

  return (
    <PaperCard
      variant={variant === 'notebook' ? 'notebook' : 'plain'}
      className={`p-6 flex flex-col justify-between h-56 select-none text-left ${cardVariants[variant]} ${className}`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          {icon && (
            <div className="w-9 h-9 rounded-full bg-background-secondary border border-border flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          {illustration && <div className="shrink-0 max-h-12 overflow-hidden">{illustration}</div>}
        </div>
        <div className="space-y-1">
          <h4 className="text-body font-heading font-extrabold text-text-primary leading-tight">
            {title}
          </h4>
          <p className="text-small text-text-secondary leading-relaxed font-body">
            {displayDescription}
          </p>
        </div>
      </div>
    </PaperCard>
  );
}
