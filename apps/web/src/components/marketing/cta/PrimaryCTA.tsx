/**
 * cta/PrimaryCTA.tsx
 *
 * Centered call-to-action layout section with headline, description, actions,
 * and ambient doodles/decorations.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialSection from "../section/EditorialSection";
import { SectionHeading, SectionDescription, SectionActions, SectionBackground, SectionDecoration } from "../section";
import { MarketingPrimaryButton, MarketingSecondaryButton } from "../shared/Buttons";

interface PrimaryCTAProps {
  title: string;
  description: string;
  primaryActionText: string;
  primaryActionHref: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  className?: string;
  dots?: boolean;
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  title,
  description,
  primaryActionText,
  primaryActionHref,
  secondaryActionText,
  secondaryActionHref,
  className,
  dots = true,
}) => {
  return (
    <EditorialSection
      variant="default"
      organicDivider={false}
      className={cn("relative border-y border-[var(--border)]", className)}
    >
      {/* Grid Pattern Background */}
      <SectionBackground dots={dots} />

      {/* Floating Sparkle and Scribble Ornaments */}
      <SectionDecoration type="sparkle" position="top-right" opacity={0.3} />
      <SectionDecoration type="scribble" position="bottom-left" opacity={0.2} />

      {/* Content wrapper */}
      <div className="relative z-10 py-[var(--spacing-8)] text-center max-w-3xl mx-auto">
        <SectionHeading level={2} align="center" size="4xl">
          {title}
        </SectionHeading>

        <SectionDescription align="center">
          {description}
        </SectionDescription>

        <SectionActions align="center">
          <MarketingPrimaryButton href={primaryActionHref} size="lg">
            {primaryActionText}
          </MarketingPrimaryButton>
          
          {secondaryActionText && secondaryActionHref && (
            <MarketingSecondaryButton href={secondaryActionHref} size="lg">
              {secondaryActionText}
            </MarketingSecondaryButton>
          )}
        </SectionActions>
      </div>
    </EditorialSection>
  );
};

export default PrimaryCTA;
