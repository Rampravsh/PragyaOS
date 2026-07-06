/**
 * cards/LogoCard.tsx
 *
 * Monochrome container card for displaying brand or partner logos.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";

interface LogoCardProps {
  src: string;
  alt: string;
  className?: string;
}

export const LogoCard: React.FC<LogoCardProps> = ({ src, alt, className }) => {
  return (
    <EditorialCard
      padding="sm"
      variant="cream"
      hoverEffect="zoom"
      className={cn(
        "flex items-center justify-center aspect-[16/9] w-full border border-[var(--border)] group transition-all duration-[var(--duration-fast)]",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-h-[40px] max-w-[80%] object-contain filter grayscale opacity-45 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]"
      />
    </EditorialCard>
  );
};

export default LogoCard;
