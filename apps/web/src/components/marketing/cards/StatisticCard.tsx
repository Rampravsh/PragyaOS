/**
 * cards/StatisticCard.tsx
 *
 * Statistic card highlighting a single massive numeric metric value.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";
import { EditorialHeadline, EditorialParagraph } from "../shared/Typography";

interface StatisticCardProps {
  value: string | number;
  label: string;
  description?: string;
  className?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  label,
  description,
  className,
}) => {
  return (
    <EditorialCard
      variant="light"
      hoverEffect="lift"
      className={cn("flex flex-col justify-center text-center items-center border border-[var(--border)]", className)}
    >
      {/* Giant numerical metric highlight */}
      <EditorialHeadline
        level={3}
        size="5xl"
        serif={false}
        className="font-mono font-bold tracking-tighter text-[var(--foreground)] mb-[var(--spacing-2)]"
      >
        {value}
      </EditorialHeadline>

      {/* Label and description */}
      <span className="font-sans text-[var(--text-xs)] uppercase tracking-wider font-semibold text-[var(--foreground)] mb-[var(--spacing-1)]">
        {label}
      </span>

      {description && (
        <EditorialParagraph className="text-[var(--text-xs)] text-[var(--muted-foreground)] mt-[var(--spacing-1)] max-w-[200px]">
          {description}
        </EditorialParagraph>
      )}
    </EditorialCard>
  );
};

export default StatisticCard;
