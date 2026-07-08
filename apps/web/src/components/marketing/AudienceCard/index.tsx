import React from 'react';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export interface AudienceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  benefits?: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  variant?: 'student' | 'instructor' | 'organization';
  className?: string;
}

export function AudienceCard({
  title,
  description,
  icon,
  benefits,
  ctaLabel = 'Explore Coords &rarr;',
  onCtaClick,
  variant = 'student',
  className = '',
}: AudienceCardProps) {
  const borderColors = {
    student: 'border-accent-gold/40 hover:border-accent-gold/80',
    instructor: 'border-accent-blue/40 hover:border-accent-blue/80',
    organization: 'border-accent-purple/40 hover:border-accent-purple/80',
  };

  const handleAction = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.location.href = `/solutions`;
    }
  };

  return (
    <PaperCard
      variant="notebook"
      className={`p-8 flex flex-col justify-between h-72 border hover:shadow-card transition-all text-left bg-surface ${borderColors[variant]} ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="w-9 h-9 rounded-full bg-background-secondary border border-border flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <h3 className="text-h3 font-heading font-extrabold text-text-primary">
            {title}
          </h3>
        </div>
        <p className="text-small text-text-secondary leading-relaxed font-body">
          {description}
        </p>

        {benefits && benefits.length > 0 && (
          <ul className="space-y-2 pt-2">
            {benefits.slice(0, 3).map((ben, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-caption text-text-muted font-body">
                <Check className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>{ben}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        variant="text"
        size="sm"
        className="w-max p-0 text-accent-gold hover:text-text-primary font-semibold text-caption mt-4"
        onClick={handleAction}
      >
        <span dangerouslySetInnerHTML={{ __html: ctaLabel }} />
      </Button>
    </PaperCard>
  );
}
