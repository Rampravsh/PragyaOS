import React from 'react';
import { cn } from '@pragyaos/utils';
import {
  EditorialHeading,
  EditorialParagraph,
  EditorialCaption,
} from '@/components/marketing/shared/Typography';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  serif?: boolean;
}

/**
 * SectionHeader compiles metadata blocks and action items for sections.
 * Supports flexible alignment and customizable serif typography settings.
 */
export function SectionHeader({
  title,
  eyebrow,
  description,
  actions,
  align = 'center',
  className,
  serif = true,
}: SectionHeaderProps): React.JSX.Element {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const paragraphAlignments = {
    left: 'left' as const,
    center: 'center' as const,
    right: 'right' as const,
  };

  return (
    <div
      className={cn(
        'flex flex-col max-w-3xl mb-12 md:mb-16 gap-4',
        alignmentClasses[align],
        className
      )}
    >
      {/* Eyebrow marker */}
      {eyebrow && (
        <EditorialCaption className="text-primary/70">
          {eyebrow}
        </EditorialCaption>
      )}

      {/* Main Section Title */}
      <EditorialHeading level={2} serif={serif} className="leading-tight">
        {title}
      </EditorialHeading>

      {/* Description copy */}
      {description && (
        <EditorialParagraph
          lead
          align={paragraphAlignments[align]}
          className="text-muted-foreground mt-2"
        >
          {description}
        </EditorialParagraph>
      )}

      {/* Action buttons row */}
      {actions && (
        <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
          {actions}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
