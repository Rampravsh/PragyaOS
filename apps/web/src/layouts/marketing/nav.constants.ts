import type {
  UnderlineVariant,
  CircleVariant,
} from "@/components/marketing/shared/AnimatedNavLink";

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  color?: string;
  circleColor?: string;
  underlineVariant?: UnderlineVariant;
  circleVariant?: CircleVariant;
}

export const MARKETING_NAV_ITEMS: NavItem[] = [
  {
    label: "Courses",
    href: "/courses",
    hasDropdown: true,
    underlineVariant: "short",
    circleVariant: "random",
  },
  {
    label: "For Instructors",
    href: "/instructors",
    underlineVariant: "double",
    circleVariant: "random",
  },
  {
    label: "Features",
    href: "/features",
    hasDropdown: true,
    underlineVariant: "short",
    circleVariant: "random",
  },
  { label: "Pricing", href: "/pricing", underlineVariant: "double", circleVariant: "random" },
  {
    label: "Resources",
    href: "/resources",
    hasDropdown: true,
    underlineVariant: "short",
    circleVariant: "random",
  },
];
