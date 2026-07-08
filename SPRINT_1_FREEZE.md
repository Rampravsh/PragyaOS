# PragyaOS Frontend — Sprint 1 Freeze Specification

This document details the completed, production-ready PragyaOS Homepage composed during Sprint 1.

---

## 1. Composition Sequence ([Home/index.tsx](file:///g:/PragyaOS/apps/web/src/pages/Home/index.tsx))

The homepage aggregates marketing sections in the following structure:
- **Hero**: Display banner with proof badges and tilted steps illustration.
- **TrustedBy**: Institutional logos cloud.
- **FeatureGrid**: Four capability cards displaying product benefits.
- **LearningJourney**: Visual steps path.
- **AIShowcase**: Dark showcase grid displaying four `AudienceCard` elements.
- **Testimonials**: Reviews cards slider.
- **FAQ**: Accordion drawer queries.
- **CTA**: Final subscription coordinates call.

---

## 2. Aesthetic and Layout Standards

- **Paper Layers Overlap**: Subsequent page elements overlap preceding containers (`-mt-12 md:-mt-20`) to emulate sheets of paper scrolling on top of one another.
- **Typography and Colors**: Preserves Cormorant Garamond serif headings, Manrope body texts, warm cream `#FAF6F0` backgrounds, and gold accents.
- **Accessible Interactions**: FAQ accordions, testimonials navigation, and buttons actions support keyboard focus rings, screen reader roles, and clean layout flow.
- **Doodles Layers**: Floating vectors (planes, stars, leaves, coils) injected dynamically via props coordinates.
