/**
 * cards/FeatureCard.tsx
 *
 * Feature card with vector icons, headings, and optional text links.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";
import { EditorialTitle, EditorialParagraph } from "../shared/Typography";
import { EditorialBadge } from "../shared/Badges";
import { MarketingTextButton } from "../shared/Buttons";
import type { FeatureCardProps } from "../shared/types";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  badgeText,
  actionText,
  actionHref,
  className,
}) => {
  return (
    <EditorialCard
      variant="light"
      hoverEffect="lift"
      className={cn("flex flex-col h-full justify-between items-start text-left", className)}
    >
      <div className="w-full">
        {/* Header containing icon and badge */}
        <div className="flex justify-between items-start w-full mb-[var(--spacing-4)] md:mb-[var(--spacing-6)]">
          {icon && (
            <div className="flex items-center justify-center p-[var(--spacing-3)] rounded-[var(--radius-sm)] bg-[var(--secondary)] text-[var(--foreground)]">
              {icon}
            </div>
          )}
          {badgeText && <EditorialBadge variant="default">{badgeText}</EditorialBadge>}
        </div>

        {/* Feature Title */}
        <EditorialTitle className="mb-[var(--spacing-2)] leading-snug">
          {title}
        </EditorialTitle>

        {/* Description Body */}
        <EditorialParagraph className="mb-[var(--spacing-6)] text-[var(--text-sm)]">
          {description}
        </EditorialParagraph>
      </div>

      {/* Action link at card bottom */}
      {actionText && actionHref && (
        <MarketingTextButton href={actionHref} className="mt-auto">
          {actionText} →
        </MarketingTextButton>
      )}
    </EditorialCard>
  );
};

export default FeatureCard;
