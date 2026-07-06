/**
 * cards/CoursePreviewCard.tsx
 *
 * Course preview card displaying metadata, ratings, pricing, and action triggers.
 */

import React from "react";
import { cn, formatCurrency } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";
import { EditorialTitle, EditorialParagraph } from "../shared/Typography";
import { EditorialBadge } from "../shared/Badges";
import { MarketingPrimaryButton } from "../shared/Buttons";
import type { CoursePreviewCardProps } from "../shared/types";

export const CoursePreviewCard: React.FC<CoursePreviewCardProps> = ({
  title,
  description,
  category,
  difficulty = "Beginner",
  duration,
  rating = 4.8,
  reviewsCount = 42,
  price = 99,
  originalPrice,
  thumbnailUrl,
  authorName = "Instructor",
  authorAvatarUrl,
  actionHref,
  className,
}) => {
  return (
    <EditorialCard
      padding="none"
      variant="light"
      hoverEffect="glow"
      className={cn("flex flex-col h-full overflow-hidden border border-[var(--border)] group text-left", className)}
    >
      {/* Course Thumbnail Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--secondary)] border-b border-[var(--border)]">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
            <svg
              className="w-12 h-12 stroke-[1.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        )}
        
        {category && (
          <div className="absolute top-[var(--spacing-3)] left-[var(--spacing-3)]">
            <EditorialBadge variant="new" className="backdrop-blur-md bg-[var(--background)]/90">
              {category}
            </EditorialBadge>
          </div>
        )}
      </div>

      {/* Course details segment */}
      <div className="flex-grow flex flex-col justify-between p-[var(--spacing-5)]">
        <div>
          {/* Metadata: Duration and Difficulty */}
          <div className="flex items-center gap-[var(--spacing-3)] text-[var(--text-xs)] text-[var(--muted-foreground)] mb-[var(--spacing-2)] uppercase tracking-wider font-semibold">
            {duration && <span>{duration}</span>}
            {duration && <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />}
            <span>{difficulty}</span>
          </div>

          {/* Title */}
          <EditorialTitle className="font-serif font-light text-[var(--text-lg)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-[var(--spacing-2)] line-clamp-2">
            {title}
          </EditorialTitle>

          {/* Brief Description */}
          {description && (
            <EditorialParagraph className="text-[var(--text-xs)] mb-[var(--spacing-4)] line-clamp-2">
              {description}
            </EditorialParagraph>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-[var(--spacing-4)]">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={cn("w-3.5 h-3.5", i < Math.floor(rating) ? "fill-current" : "stroke-current fill-none")}
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[var(--text-xs)] font-bold text-[var(--foreground)]">{rating}</span>
            <span className="text-[var(--text-xs)] text-[var(--muted-foreground)]">({reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Footer actions: Author, Pricing and Link button */}
        <div className="pt-[var(--spacing-4)] border-t border-[var(--border)]/60 flex items-center justify-between gap-[var(--spacing-4)]">
          {/* Price details */}
          <div className="flex flex-col">
            <span className="text-[var(--text-base)] font-bold text-[var(--foreground)]">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="text-[var(--text-xs)] text-[var(--muted-foreground)] line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* CTA Link button */}
          {actionHref && (
            <MarketingPrimaryButton size="sm" href={actionHref}>
              View Course
            </MarketingPrimaryButton>
          )}
        </div>
      </div>
    </EditorialCard>
  );
};

export default CoursePreviewCard;
