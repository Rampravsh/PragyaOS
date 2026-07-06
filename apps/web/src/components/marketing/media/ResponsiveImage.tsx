/**
 * media/ResponsiveImage.tsx
 *
 * Fully responsive image component wrapping images with layout constraints, aspect ratios,
 * and lazy load settings.
 */

import React, { useState } from "react";
import { cn } from "@pragyaos/utils";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "auto";
  fallbackSrc?: string;
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  auto: "aspect-auto",
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = "auto",
  className,
  fallbackSrc,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full bg-[var(--secondary)] rounded-[var(--radius-sm)] transition-all",
        aspectClasses[aspectRatio]
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-[var(--border)]" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage;
