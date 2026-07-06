import React from 'react';
import { cn } from '@pragyaos/utils';
import OrganicDivider from '@/components/marketing/shared/OrganicDivider';

interface SectionDividerProps {
  variant?: 'organic' | 'geometric';
  className?: string;
}

/**
 * SectionDivider provides divider segments between page content.
 * Supports organic hand-drawn divider lines or geometric borders.
 */
export function SectionDivider({
  variant = 'organic',
  className,
}: SectionDividerProps): React.JSX.Element {
  if (variant === 'organic') {
    return <OrganicDivider className={className} />;
  }

  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto h-[1px] bg-border/60 shrink-0 pointer-events-none select-none',
        className
      )}
    />
  );
}

export default SectionDivider;
