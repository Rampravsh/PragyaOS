import React from 'react';
import { cn } from '@pragyaos/utils';
import BackgroundLayer from '@/components/marketing/shared/BackgroundLayer';

interface EditorialSectionProps {
  children: React.ReactNode;
  variant?: 'cream' | 'light' | 'dark' | 'transparent';
  pattern?: React.ReactNode; // Optional background pattern component (e.g. EditorialPattern)
  className?: string;
  id?: string;
}

/**
 * EditorialSection defines the base structural container for marketing page segments.
 * Manages rendering depths, background colors, patterns, and dynamic content layers.
 */
export function EditorialSection({
  children,
  variant = 'light',
  pattern,
  className,
  id,
}: EditorialSectionProps): React.JSX.Element {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden w-full z-10',
        variant === 'dark' ? 'dark' : '',
        className
      )}
    >
      {/* Background layer establishing background values */}
      <BackgroundLayer variant={variant}>
        {/* Render background patterns if attached */}
        {pattern}
      </BackgroundLayer>

      {/* Main section content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

export default EditorialSection;
