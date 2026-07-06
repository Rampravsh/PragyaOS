import React from 'react';
import { cn } from '@pragyaos/utils';

interface IllustrationProps {
  children: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  caption?: string;
  className?: string;
  id?: string;
}

/**
 * Illustration wraps assets/visual containers.
 * Restricts visual content to defined aspect ratios and binds semantic captions.
 */
export function Illustration({
  children,
  aspectRatio = 'auto',
  caption,
  className,
  id,
}: IllustrationProps): React.JSX.Element {
  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'aspect-auto',
  };

  return (
    <figure
      id={id}
      className={cn('flex flex-col w-full group overflow-hidden', className)}
    >
      <div
        className={cn(
          'w-full flex items-center justify-center relative overflow-hidden transition-all duration-normal ease-out',
          ratios[aspectRatio]
        )}
      >
        {children}
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground font-sans tracking-wide uppercase transition-opacity duration-normal group-hover:opacity-80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Illustration;
