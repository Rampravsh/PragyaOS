# PragyaOS Frontend — Phase 6 Freeze Specification

This document details the reusable marketing layouts, container grids, section variants, and independent decorations configured for PragyaOS.

---

## 1. Reusable Layout Shell

- **MarketingLayout** ([MarketingLayout/index.tsx](file:///g:/PragyaOS/apps/web/src/layouts/MarketingLayout/index.tsx)): Unified root wrapper that manages child outlets or custom JSX child elements. Houses the sticky header, footer, announcement bar, and dynamic CTA banner.
- **AnnouncementBar** ([AnnouncementBar/index.tsx](file:///g:/PragyaOS/apps/web/src/components/layout/AnnouncementBar/index.tsx)): Toggles visibility using Framer Motion `<AnimatePresence>` to execute close animations.
- **CtaBanner** ([CtaBanner/index.tsx](file:///g:/PragyaOS/apps/web/src/components/layout/CtaBanner/index.tsx)): High-fidelity CTA panel mapping action hooks and checkmark lists.
- **Newsletter Subscription Form**: Embedded inside the global Footer, incorporating mock state machines for loading, success, and error outcomes.

---

## 2. Layout Primitives (PaperSection & Containers)

- **PaperSection** ([PaperSection.tsx](file:///g:/PragyaOS/apps/web/src/components/ui/PaperSection.tsx)): Implements physical journal styles. Supports:
  - `plain`: Clean paper sheet background.
  - `notebook`: Lined notebook rulings with left margin rules.
  - `dark-showcase`: Dark dot-grid sheet settings.
  - `sticky-note`: Tilting amber pastel notes.
  - `paper-stack`: 3D stacked sheet offset shadow layerings.
  - `hero`: Large vertical padding sections.
- **Containers** ([Container/index.tsx](file:///g:/PragyaOS/apps/web/src/components/layout/Container/index.tsx)): Standardised content width boundaries:
  - `WideContainer`: 1200px max width.
  - `ContentContainer`: 1000px max width.
  - `ReadingContainer`: 680px reading text column.
  - `HeroContainer`: Fluid/full layout setting.

---

## 3. Independent Decorations Layer

Defined in [components/ui/Decorations.tsx](file:///g:/PragyaOS/apps/web/src/components/ui/Decorations.tsx) as separate SVG vectors:
- `PaperPlane`: Handdrawn flying plane.
- `Star` & `Leaves`: Foliage and sparkle doodles.
- `Arrow`: Direction helper.
- `BrushMark`: Ink stroke marks.
- `PaperClip`: Tilted metallic clip lines.
- `MaskingTape`: Transparent sticky tape rectangles.
- `PushPin`: 3D pin mockup.
- `HandwrittenNote`: Lined card scrap.

---

## 4. Scroll & Style Behaviors

- **Sticky Header transition**: Header transforms to backdrop-blur with shadow highlights when the user scrolls down past 20px.
- **Overlap scrolling**: Negatives margins (`-mt-12`) enable paper sections to scroll over one another, simulating journal pages.
