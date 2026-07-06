import React, { useId } from 'react';
import { AssetProps } from '@pragyaos/assets';
import { cn } from '@pragyaos/utils';

interface EditorialPatternProps {
  // Pattern React component from @pragyaos/assets (e.g. TinyCrossPattern, HandDotGrid, EditorialGrid)
  pattern: React.ComponentType<AssetProps>;
  className?: string;
  color?: string;
  opacity?: number;
  width?: number; // width of pattern tile
  height?: number; // height of pattern tile
}

/**
 * EditorialPattern takes a static grid/cross pattern from @pragyaos/assets
 * and compiles it as a repeating SVG <pattern> background fill layer.
 * Enforces zero SVG duplication and optimizes DOM node counts.
 */
export function EditorialPattern({
  pattern: PatternComponent,
  className,
  color = 'currentColor',
  opacity = 0.08, // Subtle default background overlay
  width = 200,
  height = 200,
}: EditorialPatternProps): React.JSX.Element {
  const patternId = useId();

  return (
    <svg
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none select-none z-0',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          {/* Render the core drawing paths inside the defs tile */}
          <PatternComponent color={color} opacity={opacity} />
        </pattern>
      </defs>
      {/* Fill container width/height with repeating pattern */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export default EditorialPattern;
