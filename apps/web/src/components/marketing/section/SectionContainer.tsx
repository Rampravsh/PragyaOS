import React from 'react';
import { cn } from '@pragyaos/utils';
import EditorialContainer from '@/components/marketing/layout/EditorialContainer';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * SectionContainer coordinates content alignment boundaries within sections.
 * Inherits standard 1200px max-width limits via EditorialContainer.
 */
export function SectionContainer({
  children,
  className,
  id,
}: SectionContainerProps): React.JSX.Element {
  return (
    <EditorialContainer
      className={cn('py-12 md:py-16 lg:py-24 relative z-10', className)}
      id={id}
    >
      <div className="w-full flex flex-col items-center">{children}</div>
    </EditorialContainer>
  );
}

export default SectionContainer;
