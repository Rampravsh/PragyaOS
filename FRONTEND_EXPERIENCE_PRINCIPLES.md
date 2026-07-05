# PragyaOS Frontend Experience Principles

These principles form the foundation for all user interface design and engineering decisions across the PragyaOS ecosystem. Every developer, designer, and AI agent must adhere to these rules when building or modifying screens.

---

## 1. The Marketing Experience Tells Stories; The Workspace Completes Work

PragyaOS serves two distinct user behaviors, and the UI must bifurcate to support them.

*   **Marketing Experience (Brand & Discovery)**:
    *   **Behavior**: High engagement, organic exploration, content consumption.
    *   **Style**: Ellipsus-inspired premium editorial design. Large serif typography, generous white space, cinematic media displays, sticky panel transitions, and scroll-bound animations.
    *   **Rule**: Prioritize visual storytelling, brand trust, and organic transitions. Do not crowd the page with tools or dense data.
*   **Workspace Experience (Learning & Productivity)**:
    *   **Behavior**: High speed, execution-focused, dense context switching.
    *   **Style**: Linear/Stripe-inspired dashboard utility. Compact layout grids, system sans-serif fonts, keyboard navigation (`Cmd+K` palette), immediate state feedback, and high visual hierarchy density.
    *   **Rule**: Remove storytelling decor. Prioritize screen real estate, speed, and hotkeys.

---

## 2. Whitespace is a Design Element, Not Empty Space

Whitespace is used actively to guide user attention and group cognitive contexts.

*   **Proximity**: Elements that are close together are assumed to be related. Use a unified spacing scale to reinforce grouping.
*   **Breathing Room**: In the marketing experience, double the default vertical padding to create an editorial feel. In the workspace, optimize padding to maximize information density without cluttering.
*   **Rule**: Never add border lines if spacing alone can establish structural divisions.

---

## 3. Motion Explains Hierarchy and State

Animations are not decorative; they are functional.

*   **Directional Flow**: Entering panels must follow the user's focus vector (e.g., drawer sliding in from the right shifts active workspace control, not vice versa).
*   **Feedback Loops**: Every primary button click must have a physical reactive spring motion, and every asynchronous transition must be backed by matching skeleton loaders.
*   **Rule**: Every motion must draw from the tokenized easing curves in `@pragyaos/theme`. Random/arbitrary spring or transition values are forbidden.

---

## 4. Typography Creates Trust and Structure

Typography forms the structural grid of our content.

*   **Font Pairing**: Pair a highly structured Serif font (e.g., Lora/Playfair) for marketing headlines with a clean, high-performance Sans-Serif font (e.g., Outfit/Inter) for dashboards and user actions.
*   **Type Scale**: Stick strictly to the defined font-size and line-height multipliers. 
*   **Rule**: Keep font weights semantic. Bold is reserved for headers or critical highlights; do not use it purely for decorative emphasis.

---

## 5. Speed is a Feature

Performance directly correlates with user retention and productivity.

*   **Perceived Performance**: Render layout shells instantly; use placeholders or skeletal states before background HTTP client fetches complete.
*   **Interaction Time**: Active actions (e.g., toggle state changes, local tab shifts) must update immediately in the client, using optimistic cache updates if server network delay is expected.
*   **Rule**: Main initial bundle size must stay below 150KB (gzip). Keep lazy-loaded page route modules below 50KB.

---

## 6. Consistency Beats Novelty

Users learn patterns, not screens. Consistency reduces cognitive load.

*   **Pattern Reuse**: If a table component or action popover exists, reuse it. Do not design custom variations for specific features unless the existing component cannot support the requirements.
*   **Component Purity**: Components must match their atomic guidelines. 
*   **Rule**: UI elements must be drawn from `@pragyaos/ui` or local composition patterns. Custom inline styles and non-tokenized values are prohibited.

---

## 7. Accessibility is Part of Design from Day One

Accessibility (A11y) is a core requirement, not a feature backlog item.

*   **Semantic HTML**: Code components using proper native markup (`<button>`, `<main>`, `<nav>`) to preserve structural visibility for assistive technologies.
*   **Focus Management**: Focus states must have high-visibility focus rings. Modals, drop-down menus, and dialog drawers must lock focus and support keyboard escape vectors.
*   **Rule**: All text and visual elements must satisfy WCAG 2.1 AA color contrast compliance (minimum 4.5:1 ratio for body copy).

---

## 8. Every Interaction Must Reduce Friction

Design interfaces that anticipate user intent.

*   **Command Palette**: Build a universal shortcut engine (`Cmd+K`) to enable power users to execute commands without using a mouse.
*   **Inline Actions**: Provide contextual menus and inline edit fields instead of forcing users to navigate to settings or sub-pages to modify details.
*   **Rule**: Any critical workflow (e.g. creating a course module or previewing a lesson) must take no more than three clicks from the main dashboard.

---

## 9. Every Component Must Justify Its Existence

Avoid visual clutter and code bloat.

*   **Single Responsibility**: Components must solve one layout or interaction challenge. If a component grows past 250 lines, it must be decomposed.
*   **Decluttering**: Remove visual embellishments (shadow layers, gradient fills, duplicate labels) if they do not aid readability or hierarchy.
*   **Rule**: If a component does not directly contribute to storytelling (marketing) or task execution (workspace), remove it.
