import React, { useState } from 'react';
import { cn } from '@pragyaos/utils';

interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  className?: string;
}

/**
 * ResponsiveImage wraps HTML5 img tag with a loading block overlay and aspect ratios.
 * Correctly applies a11y alt tags, lazy loading and responsive source sizes.
 */
export function ResponsiveImage({
  src,
  alt,
  srcSet,
  sizes,
  aspectRatio = 'auto',
  className,
  ...props
}: ResponsiveImageProps): React.JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'aspect-auto',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full bg-muted select-none transition-all duration-normal ease-out',
        ratios[aspectRatio]
      )}
    >
      {/* Blurred preview / loading skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-secondary/30 animate-pulse z-10" />
      )}

      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading={props.loading || 'lazy'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-slow ease-out',
          loaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-sm opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
}

export default ResponsiveImage;
