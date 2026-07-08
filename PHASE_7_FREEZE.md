# PragyaOS Frontend — Phase 7 Freeze Specification

This document details the modular homepage components, section structures, and decoration inputs configured for PragyaOS.

---

## 1. Modular Section Components

Every section has been built into a self-contained component under `src/components/marketing/`:
- **Hero** ([Hero/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/Hero/index.tsx)): Renders high-fidelity hero banner displays.
- **TrustedBy** ([TrustedBy/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/TrustedBy/index.tsx)): Renders monochrome organizational logos lists.
- **SectionHeading** ([SectionHeading/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/SectionHeading/index.tsx)): Manages Tag headings.
- **FeatureGrid & FeatureCard** ([FeatureGrid/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/FeatureGrid/index.tsx)): Coordinates responsive column grids.
- **LearningJourney** ([LearningJourney/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/LearningJourney/index.tsx)): Horizontal timeline stepping stepper.
- **AIShowcase** ([AIShowcase/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/AIShowcase/index.tsx)): Highlight split layout for AI workspace features.
- **AudienceCard** ([AudienceCard/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/AudienceCard/index.tsx)): Configurable Student, Instructor, and Organization cards.
- **Stats** ([Stats/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/Stats/index.tsx)): Renders metrics charts.
- **Testimonials** ([Testimonials/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/Testimonials/index.tsx)): Testimonials slide carousel.
- **CTA** ([CTA/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/CTA/index.tsx)): Action buttons banner.
- **FAQ** ([FAQ/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/FAQ/index.tsx)): Accordion QA drawer lists.

---

## 2. Re-export Barrel Index

All components are barrel exported in [src/components/marketing/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/index.tsx). The index file preserves backwards compatibility for Phase 4 page files by retaining all original custom component exports (`ComparisonTable`, `BlogCard`, `ResourceCard`, `ContactForm`, etc.).

---

## 3. Decoration Injection Guidelines

Every major component supports decoration properties:
- `paperVariant`: 'plain' | 'notebook' | 'dark-showcase' | 'sticky-note' | 'paper-stack' | 'hero'
- `backgroundVariant`: 'cream' | 'white' | 'dark'
- `topDecoration` / `bottomDecoration`: custom SVG icons (e.g. `PaperPlane`, `Star`, `Leaves`, `Arrow` primitive coordinates).
This layout allows the composing pages to inject vector details and stack layers without modifying core files.
