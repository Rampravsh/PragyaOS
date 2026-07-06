import React from 'react';
import { CenteredLayout } from '@pragyaos/ui';
import { cn } from '@pragyaos/utils';

interface EditorialContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * EditorialContainer defines the standard max-width bounding box (1200px)
 * for PragyaOS marketing content rows.
 * Reuses @pragyaos/ui CenteredLayout mapping standard md constraints.
 */
export function EditorialContainer({
  children,
  className,
  id,
}: EditorialContainerProps): React.JSX.Element {
  return (
    <CenteredLayout
      maxWidth="md"
      className={cn('w-full px-4 md:px-6 lg:px-8', className)}
      id={id}
    >
      {children}
    </CenteredLayout>
  );
}

export default EditorialContainer;
