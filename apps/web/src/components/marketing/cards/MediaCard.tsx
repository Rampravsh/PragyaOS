/**
 * cards/MediaCard.tsx
 *
 * Media overlay card containing media covers, overlay text, and media action indicators.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";
import { EditorialTitle, EditorialParagraph } from "../shared/Typography";

interface MediaCardProps {
  title: string;
  category?: string;
  description?: string;
  imageUrl: string;
  isVideo?: boolean;
  actionText?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  category,
  description,
  imageUrl,
  isVideo = false,
  actionText = "Read Article",
  onClick,
  className,
}) => {
  return (
    <EditorialCard
      padding="none"
      variant="light"
      hoverEffect="lift"
      onClick={onClick}
      className={cn("flex flex-col relative aspect-[4/3] w-full overflow-hidden border border-[var(--border)] group", className)}
    >
      {/* Background Cover Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 transition-opacity duration-[var(--duration-normal)] group-hover:from-black/90"
        aria-hidden="true"
      />

      {/* Play indicator overlay (for video variants) */}
      {isVideo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--background)]/90 backdrop-blur-sm text-[var(--foreground)] shadow-[var(--shadow-lg)] transition-all duration-[var(--duration-normal)] group-hover:scale-110">
          <svg
            className="w-6 h-6 stroke-[1.5] fill-current translate-x-0.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-[var(--spacing-6)] text-white">
        {category && (
          <span className="text-[var(--text-xs)] uppercase tracking-wider font-semibold opacity-75 mb-[var(--spacing-1.5)] block">
            {category}
          </span>
        )}

        <EditorialTitle className="text-white font-serif font-light text-[var(--text-lg)] leading-snug mb-[var(--spacing-2)] line-clamp-2">
          {title}
        </EditorialTitle>

        {description && (
          <EditorialParagraph className="text-white/80 text-[var(--text-xs)] mb-[var(--spacing-4)] line-clamp-2 hidden group-hover:line-clamp-2 transition-all duration-[var(--duration-normal)]">
            {description}
          </EditorialParagraph>
        )}

        <span className="text-[var(--text-xs)] font-semibold tracking-wider uppercase text-white/95 mt-[var(--spacing-1)] inline-flex items-center gap-[var(--spacing-1)] group-hover:underline">
          {isVideo ? "Watch Video" : actionText} →
        </span>
      </div>
    </EditorialCard>
  );
};

export default MediaCard;
