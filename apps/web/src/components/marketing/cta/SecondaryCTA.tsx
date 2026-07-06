/**
 * cta/SecondaryCTA.tsx
 *
 * Split-screen layout call-to-action component.
 * Features:
 * - Editorial headline, paragraph and button on one side.
 * - Image frame, video, or graphic wrapper on the other side.
 * - Responsive orientation flip.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialSection from "../section/EditorialSection";
import { SplitLayout } from "../shared/Layouts";
import { ContentCluster } from "../shared/Layouts";
import { SectionHeading, SectionDescription } from "../section";
import { MarketingPrimaryButton, MarketingSecondaryButton } from "../shared/Buttons";
import ResponsiveImage from "../media/ResponsiveImage";

interface SecondaryCTAProps {
  title: string;
  description: string;
  primaryActionText: string;
  primaryActionHref: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  imageUrl: string;
  imageAlt?: string;
  imageOnRight?: boolean;
  className?: string;
}

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  title,
  description,
  primaryActionText,
  primaryActionHref,
  secondaryActionText,
  secondaryActionHref,
  imageUrl,
  imageAlt = "CTA Illustration",
  imageOnRight = true,
  className,
}) => {
  const textContent = (
    <ContentCluster
      heading={
        <SectionHeading level={2} align="left" size="3xl" className="mb-0">
          {title}
        </SectionHeading>
      }
      description={
        <SectionDescription align="left" className="mx-0 mb-0">
          {description}
        </SectionDescription>
      }
      actions={
        <>
          <MarketingPrimaryButton href={primaryActionHref}>
            {primaryActionText}
          </MarketingPrimaryButton>
          {secondaryActionText && secondaryActionHref && (
            <MarketingSecondaryButton href={secondaryActionHref}>
              {secondaryActionText}
            </MarketingSecondaryButton>
          )}
        </>
      }
      align="left"
    />
  );

  const mediaContent = (
    <div className="w-full relative rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow-md)] border border-[var(--border)]">
      <ResponsiveImage
        src={imageUrl}
        alt={imageAlt}
        aspectRatio="video"
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <EditorialSection variant="default" className={className}>
      <SplitLayout
        ratio="1:1"
        align="center"
        gap="lg"
        reverseOnMobile={false}
      >
        {imageOnRight ? (
          <>
            {textContent}
            {mediaContent}
          </>
        ) : (
          <>
            {mediaContent}
            {textContent}
          </>
        )}
      </SplitLayout>
    </EditorialSection>
  );
};

export default SecondaryCTA;
