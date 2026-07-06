import React from 'react';
import { cn } from '@pragyaos/utils';

interface ClusterLayoutProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
  id?: string;
}

/**
 * ClusterLayout organizes content cards/items in an organic staggered grid.
 * Shifts alternate items vertically using the --editorial-organic-shift token
 * to capture the premium, magazine-like Ellipsus-inspired layout style.
 */
export function ClusterLayout({
  children,
  columns = 3,
  className,
  id,
}: ClusterLayoutProps): React.JSX.Element {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div
      id={id}
      className={cn(
        'grid gap-8 md:gap-10 items-start w-full',
        gridCols[columns],
        className
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // Apply visual shift to alternate items to stag-offset column items
        // --editorial-organic-shift (2rem) is applied as dynamic translation
        const isStaggered = index % 2 === 1;

        return (
          <div
            className={cn(
              'transition-transform duration-slow ease-out',
              isStaggered && 'lg:translate-y-8'
            )}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

export default ClusterLayout;
