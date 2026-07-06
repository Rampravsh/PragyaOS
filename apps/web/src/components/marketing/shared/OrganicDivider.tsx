import React from 'react';
import { OrganicDivider as PrimitiveDivider } from '@pragyaos/assets';
import { cn } from '@pragyaos/utils';

interface OrganicDividerProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * OrganicDivider wraps the hand-drawn SVG divider from @pragyaos/assets.
 * Used to organically segment editorial sections without stark geometric boundaries.
 */
export function OrganicDivider({
  className,
  color = 'currentColor',
  strokeWidth = 1,
}: OrganicDividerProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-center shrink-0 overflow-hidden py-4 text-border',
        className
      )}
    >
      <PrimitiveDivider
        className="w-full max-w-7xl h-auto"
        color={color}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}

export default OrganicDivider;
