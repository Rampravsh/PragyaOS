import React from 'react';
import { EditorialStack } from '@pragyaos/ui';

interface ContentStackProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ContentStack stacks elements vertically with defined spacing intervals.
 * Reuses @pragyaos/ui EditorialStack.
 */
export function ContentStack({
  children,
  gap = 'md',
  className,
}: ContentStackProps): React.JSX.Element {
  return (
    <EditorialStack gap={gap} className={className}>
      {children}
    </EditorialStack>
  );
}

export default ContentStack;
