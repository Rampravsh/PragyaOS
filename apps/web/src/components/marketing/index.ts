/**
 * marketing/index.ts
 *
 * Master barrel export file for the PragyaOS Marketing Component Library.
 * Consumers can import any component directly:
 *   import { EditorialSection, MarketingPrimaryButton, FeatureCard } from "@/components/marketing";
 */

export * from "./shared";
export * from "./section";
export * from "./cards";
export * from "./media";
export * from "./cta";
export { default as EditorialSection } from "./section/EditorialSection";
export { default as SectionHeading } from "./section/SectionHeading";
export { default as SectionEyebrow } from "./section/SectionEyebrow";
export { default as SectionDescription } from "./section/SectionDescription";
export { default as SectionDivider } from "./section/SectionDivider";
export { default as SectionBackground } from "./section/SectionBackground";
export { default as SectionDecoration } from "./section/SectionDecoration";
export { default as SectionContent } from "./section/SectionContent";
export { default as SectionActions } from "./section/SectionActions";
export { default as EditorialCard } from "./cards/EditorialCard";
export { default as FeatureCard } from "./cards/FeatureCard";
export { default as CoursePreviewCard } from "./cards/CoursePreviewCard";
export { default as LogoCard } from "./cards/LogoCard";
export { default as MediaCard } from "./cards/MediaCard";
export { default as QuoteCard } from "./cards/QuoteCard";
export { default as StatisticCard } from "./cards/StatisticCard";
export { default as ResponsiveImage } from "./media/ResponsiveImage";
export { default as DecorativeAsset } from "./media/DecorativeAsset";
export { default as VideoFrame } from "./media/VideoFrame";
export { default as Illustration } from "./media/Illustration";
export { default as PrimaryCTA } from "./cta/PrimaryCTA";
export { default as SecondaryCTA } from "./cta/SecondaryCTA";
export { default as NewsletterCTA } from "./cta/NewsletterCTA";
