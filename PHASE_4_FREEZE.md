# PragyaOS Frontend — Phase 4 Freeze Specification

This document details the public marketing site setup, component catalog blocks, and responsive structures built for PragyaOS.

---

## 1. Reusable Marketing Component Library

We created common layout components inside [src/components/marketing/index.tsx](file:///g:/PragyaOS/apps/web/src/components/marketing/index.tsx):
- `MarketingHero`: Centred titles, gold italics outlines, and action buttons.
- `FeatureGrid`: Outlined cards listing capability descriptions.
- `LogoCloud`: Brand partnerships logs using muted high-contrast text.
- `ComparisonTable`: Pricing matrices comparing plan specifications.
- `FAQAccordion`: Keyboard accessible accordion items.
- `StatsGrid`: Metric number indicators.
- `TeamGrid`: Profiles company creators.
- `CareersGrid`: Career role locations.
- `BlogCard`: Article summaries.
- `ResourceCard`: Downloads.
- `DocumentationSidebar`: Categories guides panel.
- `ContactForm`: Inbox submissions.

---

## 2. Page Architectures Composed

We mapped the pages as lazy-loaded routes in [router.tsx](file:///g:/PragyaOS/apps/web/src/routes/router.tsx):
- **Features** ([Features/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Features/index.tsx)): Capabilities showcase.
- **Solutions** ([Solutions/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Solutions/index.tsx)): Tab switcher for Students, Instructors, and Organizations.
- **Pricing** ([Pricing/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Pricing/index.tsx)): plan cards, spec grids, billing FAQs.
- **About** ([About/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/About/index.tsx)): Stories, corporate team profiles, visual timelines.
- **Resources** ([Resources/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Resources/index.tsx)): Downloadable materials lists.
- **Blog** ([Blog/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Blog/index.tsx)): Article searches, category switchers, outlines, authors.
- **Documentation** ([Documentation/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Documentation/index.tsx)): Side documentation articles.
- **Help Center** ([HelpCenter/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/HelpCenter/index.tsx)): Category guides and support contact links.
- **Contact** ([Contact/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Contact/index.tsx)): Maps coordinates and form inquiries.
- **Careers** ([Careers/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Careers/index.tsx)): Cultural benefits and roles.
- **FAQ** ([FAQ/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/FAQ/index.tsx)): Accordions catalog.
- **Legal Guidelines** ([Legal/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Legal/index.tsx)): Privacy, Terms, and Cookies page layout.
- **Error Bounds** ([NotFound/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/NotFound/index.tsx), [ServerError/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/ServerError/index.tsx)): Brand fallback bounds.

---

## 3. Responsive Adaptations

- **Sidebar Mappings**: On small tablets/mobiles, the Documentation sidebar stacks above text contents or collapses into top listings.
- **Grids & Columns**: All grid templates use fluid class indicators (e.g. `grid-cols-1 md:grid-cols-3`) to adjust proportions dynamically.

---

## 4. Accessibility (A11y) Decisions

- **Keyboard navigation**: FAQ accordions list items toggle using Enter or Space, with focus markers visible on outlines.
- **Doc Sidebars**: Documentation and category switcher buttons follow clean focus states and include text fallback helpers.

---

## 5. Performance Optimizations

- **Vite Split Chunks**: Vite builds route components as isolated dynamic imports, ensuring visitors only load necessary code for the active route.
- **Asset reuse**: Reused SVG shapes and doodles vectors directly from Phase 1/2 barrel components, keeping CSS payloads under 68kB.

---

## 6. Future Extension Points

- **Solutions Paths**: Easily append custom corporate solutions categories inside `content` structures.
- **New Articles**: Place new post objects inside the Blog database lists to automatically add them to search indexes and category tabs.
