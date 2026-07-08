# PragyaOS Frontend — Phase 3 Freeze Specification

This document details the visual implementation, architecture, and responsive behaviors of the marketing homepage for PragyaOS.

---

## 1. Homepage Composition

The homepage is composed inside [src/pages/Home/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/index.tsx) by stacking the following isolated sections:

1. **HeroSection** ([Hero/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/Hero/index.tsx)): Renders display typography, CTA actions, avatar reviews, and a 2x2 grid representing learning stages (Learn, Practice, Build, Achieve) decorated with pinned notes and plane doodles.
2. **FeaturesSection** ([Features/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/Features/index.tsx)): Displays features (Engaging Content, Learn Together, Track Progress, Earn & Achieve) inside hover-lifted cards.
3. **ShowcaseSection** ([Showcase/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/Showcase/index.tsx)): Renders a dark editorial dashboard mock showing course paths, weekly study stats, and responsive mobile mockups.
4. **AudienceSection** ([Audience/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/Audience/index.tsx)): Renders cards designed specifically for Students, Instructors, Teams, and Lifelong Learners.
5. **TestimonialsSection** ([Testimonials/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/Testimonials/index.tsx)): Displays reviews inside tactile tilted sticky notes with tape and pins details.
6. **CTASection** ([CTA/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/sections/CTA/index.tsx)): Presents final start banner with checklist items and target targets.

---

## 2. Reuse of Existing Primitives & Layouts

No duplicate components were created. We fully consumed the variables, animations, and elements built in previous phases:
- **Layout Shells**: Composed under `MarketingLayout` inside `src/routes/router.tsx` to automatically render the dismissible `AnnouncementBar`, global scrolled-blurred `Header`, layout transitions, and grid `Footer`.
- **UI Primitives**: Leveraged `Button` (interactive scaling), `PaperCard` (ruling notebook/grid patterns), `StickyNote` (yellow/green/blue tilted note shapes), `Avatar` (fallback initials), and vector `Doodles` (stars, plane paths, leaves, handwritten underlines).

---

## 3. Responsive & Breakpoint Behaviors

- **Hero Step Grid**: Collapses from a 2x2 block grid on desktop to a single column vertical path on small devices.
- **Showcase Mockups**: On mobile widths, the secondary floating mobile mockup card hides gracefully, adjusting the central desktop dashboard mockup to scale fully.
- **Layout Adaptability**: All padding values are declared using fluid tailwind parameters (e.g. `p-6 md:p-8`, `container-desktop`) to prevent horizontal scroll leaks on smaller viewports.

---

## 4. Accessibility (A11y) Actions

- **Screen Readers**: Declared appropriate labels (`aria-label`, `aria-modal`) for interactive drawer overlay triggers and dismiss buttons.
- **Semantic HTML Hierarchy**: Consistently utilized structured headings (`h1` display for hero, sequential `h2`/`h3` subheadings) and layout wrappers (`<section>`, `<aside>`, `<nav>`).
- **Focus Indicators**: Preserved default outline rings and visual highlights on keyboard-focused button elements.

---

## 5. Performance Optimizations

- **Vite Code Splitting**: Implemented lazy load imports (`React.lazy`) for pages in the router to separate vendor dependencies from route-specific layout bundles.
- **CSS Variable Merging**: Used Tailwind CSS v4 variables configuration which combines theme styles cleanly into a single stylesheet chunk without layout-thrashing resets.

---

## 6. Future Extension Points

- **Routing Layouts**: The router structure is configured so that future courses, dashboards, and profile editor pages can be registered directly inside children arrays under `WorkspaceLayout` or `AuthLayout`.
- **Tactile Sheets**: Components support passing custom `stack` elevations and `variant` styling keys (grid vs notebook) to render new study modules consistently.
