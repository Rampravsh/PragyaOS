/**
 * Marketing Shell — Shared Types
 * apps/web/src/layouts/marketing/types.ts
 */

// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  /** Display label shown in the navigation */
  label: string;
  /** Route path (passed to react-router-dom <Link>) */
  href: string;
  /** Optional children for dropdown menus (future) */
  children?: NavItem[];
  /** If true, the item opens in a new browser tab */
  external?: boolean;
}

// ─── Layout Props ──────────────────────────────────────────────────────────────

export interface MarketingLayoutProps {
  children: React.ReactNode;
  /**
   * Navigation items for the primary header nav.
   * Defaults to the standard PragyaOS marketing nav if omitted.
   */
  navItems?: NavItem[];
  /**
   * Footer navigation columns.
   * Omit to use the default footer structure.
   */
  footerColumns?: FooterColumn[];
  /** Apply dark theme variant */
  dark?: boolean;
}

// ─── Section ──────────────────────────────────────────────────────────────────

/**
 * Background variant for a MarketingSection.
 *
 * | Variant       | Background                       |
 * |---------------|----------------------------------|
 * | default       | var(--background) paper cream    |
 * | muted         | var(--muted) slightly off-white  |
 * | dark          | var(--foreground) deep charcoal  |
 * | transparent   | fully transparent                |
 */
export type MarketingSectionVariant =
  | "default"
  | "muted"
  | "dark"
  | "transparent";

export interface MarketingSectionProps {
  children: React.ReactNode;
  variant?: MarketingSectionVariant;
  /**
   * Render an OrganicDivider SVG at the section bottom.
   * Useful for soft editorial transitions between sections.
   */
  organicDivider?: boolean;
  /** Additional className to apply to the outer section element */
  className?: string;
  /** HTML id for anchor-link scrolling */
  id?: string;
  /** Override the vertical padding. Uses editorialSpacing tokens if omitted. */
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  /** aria-label for the section landmark */
  "aria-label"?: string;
}

// ─── Container ─────────────────────────────────────────────────────────────────

export type ContainerVariant = "editorial" | "wide" | "narrow" | "full";

export interface MarketingContainerProps {
  children: React.ReactNode;
  /** Max-width variant driven by container tokens */
  variant?: ContainerVariant;
  className?: string;
  as?: React.ElementType;
}

// ─── Grid ──────────────────────────────────────────────────────────────────────

export interface EditorialGridProps {
  children: React.ReactNode;
  className?: string;
  /** Gap override — defaults to grid token gutter values */
  gap?: "none" | "sm" | "md" | "lg";
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

// ─── Header ───────────────────────────────────────────────────────────────────

export interface MarketingHeaderProps {
  navItems: NavItem[];
}
