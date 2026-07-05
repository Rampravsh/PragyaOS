# PragyaOS: Master Design System Specification

**Product Name:** PragyaOS  
**Category:** Enterprise Learning Experience Platform (LXP)  
**Author:** Antigravity (Lead Design Systems Architect)  
**Status:** Approved (v1.0 Production Blueprint)

---

## 1. Introduction & Core Philosophy

This document defines the single source of truth for the PragyaOS Design System. It establishes the rules, layouts, tokens, and interactions that govern all React 19 visual implementations, Figma design files, and AI-assisted screen generation pipelines.

The visual identity of PragyaOS is split into two distinct experiences sharing the same token repository:
*   **Marketing Experience (Editorial)**: Focuses on brand storytelling, landing pages, about profiles, and course discovery catalogs. Uses the **Ellipsus-inspired layout style** (organic compositions, wide whitespace, serif headlines, cinematic scroll triggers, and card animations).
*   **Workspace Experience (Productivity)**: Focuses on active learning, curriculum builder studios, member management, and admin panels. Uses the **Linear/Stripe-inspired dashboard utility** (high information density, compact grids, immediate feedback state, and strict keyboard navigation).

---

## 2. Monorepo Theme Folder Structure

The styling token compiler and themes configurations are consolidated inside the shared `@pragyaos/theme` workspace package:

```
packages/theme/
├── src/
│   ├── tokens/                  # Atomized primitive tokens
│   │   ├── colors.ts            # Base colors and gray scales
│   │   ├── semantic-colors.ts   # Dark / Light theme key maps
│   │   ├── typography.ts        # Families, weights, size ranges
│   │   ├── spacing.ts           # Modular 8-point layout units
│   │   ├── sizing.ts            # Component heights and structural limits
│   │   ├── radius.ts            # Border radii definitions
│   │   ├── border.ts            # Border widths and styles
│   │   ├── shadow.ts            # Base shadow variables
│   │   ├── opacity.ts           # Opacity levels for interactions
│   │   ├── blur.ts              # Backdrop filter blur properties
│   │   ├── motion.ts            # Easing curves and speed parameters
│   │   ├── grid.ts              # Column and gutter settings
│   │   ├── container.ts         # Max width layout wrappers
│   │   ├── breakpoints.ts       # Breakpoint specifications
│   │   ├── zIndex.ts            # Layer index definitions
│   │   ├── interaction.ts       # Standard interactive states configurations
│   │   └── elevation.ts         # Depth and transformations definitions
│   ├── themes/                  # Global theme variations
│   │   ├── marketing-light.ts
│   │   ├── marketing-dark.ts
│   │   ├── workspace-light.ts
│   │   └── workspace-dark.ts
│   ├── editorial/               # Structural guidelines for Marketing layouts
│   │   ├── typography.ts
│   │   ├── layout.ts
│   │   └── spacing.ts
│   ├── workspace/               # Structural guidelines for Workspace layouts
│   │   ├── density.ts
│   │   ├── layout.ts
│   │   └── navigation.ts
│   ├── helpers/                 # Utility builders
│   │   ├── createTheme.ts       # Custom theme assembler
│   │   ├── resolveToken.ts      # Nested token resolver
│   │   └── cssVariables.ts      # CSS custom properties builder
│   ├── css/                     # Baseline stylesheet compilation
│   │   ├── variables.css
│   │   └── utilities.css
│   └── index.ts                 # Package main entry export
├── package.json
└── tsconfig.json
```

---

## 3. Token Hierarchy

PragyaOS uses a **three-layer design token system** to ensure changes cascade cleanly across components and experiences:

```
┌─────────────────────────────────────────────────────────┐
│                    PRIMITIVE TOKENS                     │
│  (Pure values: colors.gray.50, spacing.4, radius.md)    │
└───────────────────────────┬─────────────────────────────┘
                            │ (Inherited by)
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    SEMANTIC TOKENS                     │
│  (System meaning: background, border, text.primary)     │
└───────────────────────────┬─────────────────────────────┘
                            │ (Applied to)
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    COMPONENT TOKENS                     │
│  (Component-specific: button.primary.bg, input.border)  │
└─────────────────────────────────────────────────────────┘
```

### Why This Hierarchy Exists
1. **Abstraction Separation**: Designers can rename components or adjust layout semantic colors without modifying base primitive color parameters.
2. **Cascading Modification**: If the primary color changes, updating it in the Semantic layer propagates the change to all components (buttons, input borders, badges) instantly.
3. **Cross-Platform Adaptability**: In React Native versions, the Primitive values map directly to local component states, while the Semantic variables switch depending on the platform theme.

---

## 4. Editorial Visual Language (Marketing Experience)

The Marketing experience is built to communicate quality and inspire exploration through deliberate typography and structural rhythm.

```
┌─────────────────────────────────────────────────────────┐
│  H1: Editorial Serif Headline (Lora/Playfair)           │
│  Massive leading space (sectionPaddingY: 80px)          │
│                                                         │
│  ┌───────────────────────┐   ┌───────────────────────┐  │
│  │   Asymmetric Image    │   │  Paragraph Text       │  │
│  │   (Spring Hover)      │   │  (Outfit / 18px text) │  │
│  └───────────────────────┘   └───────────────────────┘  │
│                                                         │
│  Button: Minimal border styling, organic transitions     │
└─────────────────────────────────────────────────────────┘
```

*   **Whitespace**: Horizontal margins use full container widths with section gutters exceeding `5rem` (`py-20`). Whitespace is treated as an active element to frame content, not empty space.
*   **Typography**: Display titles are set in light serif scales (`Lora/Playfair`) with tighter letter spacing (`tracking-tight`).
*   **Layout Style**: Asymmetrical column structures and offset blocks create an organic, custom-built feel.
*   **Transitions**: Layers use smooth scroll-bound fades and pinned scroll animations to structure narrative flows.
*   **Buttons**: Minimalist design. Clean borders with transition eases (`duration-slow`) and subtle spring-loaded scaling transforms (`scale-98` on click) take precedence over heavy filled shapes.
*   **Cards**: Render with thin border rings, avoiding high-contrast drop shadows. Cards expand on hover with offset vertical shifts (`translate-y-[-4px]`).

---

## 5. Workspace Visual Language (Productivity Dashboard)

The Workspace environment focuses on screen real estate efficiency, fast navigation, and clear data visualization.

```
┌─────────────────────────────────────────────────────────┐
│  Top Header Bar (topHeaderHeight: 56px)                 │
├──────────────┬──────────────────────────────────────────┤
│ Sidebar Nav  │ Workspace Grid (Fluid Width 100%)       │
│ (256px)      │                                          │
│              │ * Dense Table: Sans Mono for values      │
│              │ * Forms: Compact inputs (md: 40px height) │
│              │ * Keyboard commands: CMD+K trigger       │
└──────────────┴──────────────────────────────────────────┘
```

*   **Information Density**: View layouts default to `comfortable` density with options to switch to `compact` for dashboard tables and builders.
*   **Tables**: Styled with thin borders, clean backgrounds, and fixed row heights (`h-10` to `h-12`). All numerical metrics and indicators use monospaced fonts (`JetBrains Mono`).
*   **Forms & Inputs**: Labels are positioned inline or stacked directly above inputs to minimize visual height. Focus states apply sharp focus rings (`ring-2 ring-ring`).
*   **Navigation & Workspace Command Palette**:
  - Global Command Palette (`Cmd+K` / `Ctrl+K`) overlays current views to enable immediate search and quick command execution.
  - Collapsible sidebars (`sidebarWidthCollapsed: 72px`) maximize screen real estate during active learning sessions.

---

## 6. Grid and Layout System

PragyaOS uses a responsive grid system that adapts container margins and column counts to screen sizes.

### Grids Blueprint

| Viewport | Screen Width | Columns | Gutter | Margin | Container Mode |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Mobile** | `< 640px` | 4 | `1rem` (16px) | `1rem` (16px) | Fluid (`100%`) |
| **Tablet** | `640px - 1024px` | 8 | `1rem` (16px) | `1.5rem` (24px)| Fluid (`100%`) |
| **Laptop** | `1024px - 1280px`| 12 | `1.5rem` (24px)| `2rem` (32px) | Fixed Editorial (`1200px`) |
| **Desktop**| `> 1280px` | 12 | `1.5rem` (24px)| `2rem` (32px) | Fluid Workspace (`100%`) |

---

## 7. Typography Scale

The type system defines semantic styles paired with responsive scaling properties.

### Typography Specifications

| Category | Size | Line Height | Weight | Letter Spacing | Font Family |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Display** | `3rem` (48px) | `1.15` | Light (300) | `tighter` | Serif (Lora) |
| **Heading** | `2.25rem` (36px)| `1.3` | Semibold (600)| `tight` | Sans (Outfit) |
| **Title** | `1.5rem` (24px) | `1.3` | Medium (500) | `normal` | Sans (Outfit) |
| **Body** | `1rem` (16px) | `1.5` | Normal (400) | `normal` | Sans (Outfit) |
| **Caption** | `0.875rem` (14px)| `1.5` | Normal (400) | `wide` | Sans (Outfit) |
| **Code** | `0.875rem` (14px)| `1.5` | Normal (400) | `normal` | Mono (JetBrains) |

---

## 8. Spacing Scale

PragyaOS implements an 8-point spacing scale to ensure consistent layout structure:

```
Value:   0    0.5   1    1.5   2    2.5   3    4    5    6    8    10   12   16   20   24
Pixels:  0px  2px   4px  6px   8px  10px  12px 16px 20px 24px 32px 40px 48px 64px 80px 96px
```

### Spacing Contexts
*   **Micro Spacing (`0.5` to `1.5`)**: Elements inside controls, inline spacing for icon-text pairs.
*   **Small Spacing (`2` to `3`)**: Padding within inputs, spacing between form fields, list item separation.
*   **Medium Spacing (`4` to `5`)**: Card padding, margins between related content sections.
*   **Large Spacing (`6` to `8`)**: Outer page padding, margins between unrelated content sections.
*   **Section Spacing (`10` to `16`)**: Padding for marketing sections, large content divides.
*   **Page/Editorial Spacing (`20` to `24`)**: Spacing for large storytelling elements and hero section offsets.

---

## 9. Motion Design System

Animations are defined in tokens to ensure transitions are smooth, purposeful, and consistent.

*   **Page Transitions**: Route loads use a fast fade-in combined with a vertical slide (`y: 12` to `0` over `250ms` using `easeOut` easing).
*   **Modals & Dialogs**: Scale up from `0.95` with a snappy spring curve (`stiffness: 400`, `damping: 28`). Focus is trapped instantly.
*   **Drawers**: Slide in from viewport boundaries (`x: "100%"`) over `450ms` using `easeInOut` curves.
*   **Micro-interactions**: Hover actions scale elements (`scale-102` or `translate-y-[-2px]`) over `150ms` with transition eases.
*   **Skeletons**: Skeletons animate with an infinite pulse opacity transition (`opacity: 0.4` to `0.8` over `1500ms`).
*   **Accessibility (Reduced Motion)**:
    When the user browser has `prefers-reduced-motion: reduce` enabled, all duration tokens fallback to `0.01ms` to bypass structural transforms and scaling effects.

---

## 10. Component Token System Specifications

Every component must derive its visual attributes from design tokens. Below are the structural component rules:

### Core Components Specifications

#### 1. Buttons
*   **Primary**: `bg-primary text-primary-foreground focus-ring-standard active:scale-98`
*   **Secondary**: `bg-secondary text-secondary-foreground hover:bg-muted`
*   **Ghost**: `hover:bg-muted text-foreground transition-colors duration-fast`

#### 2. Inputs
*   **Default**: `h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-ring-standard`
*   **State variations**:
    - *Error*: `border-destructive ring-destructive`
    - *Disabled*: `opacity-50 cursor-not-allowed pointer-events-none`

#### 3. Cards
*   **Marketing Card**: `p-6 bg-card border border-border rounded-xl transition-all duration-normal hover:translate-y-[-4px]`
*   **Workspace Tile**: `p-4 bg-card border border-border rounded-md shadow-sm`

#### 4. Media Player
*   **Controls Toolbar**: Locked to `h-14 bg-background/80 blur-md border-t` layout bounds.
*   **Timeline Scrub**: Hover expansion from `h-1` to `h-2` height tokens.

#### 5. Toast Notifications
*   **Container**: Docked to bottom-right, layered at `zIndex.toast` (1080).
*   **Entrance**: Slide up from bottom using snap spring parameters.

---

## 11. Core Design Principles

1. **Whitespace is a Feature**: Whitespace is used to frame content and establish hierarchy. Do not fill empty space with borders or backgrounds.
2. **Typography Before Decoration**: High-contrast, well-proportioned typography is prioritized over icons, shadows, and graphical decorations.
3. **Borders Before Shadows**: Layout divisions are established using clean border lines before relying on heavy drop shadows.
4. **Motion Explains Hierarchy**: Transitions are used to guide user attention and explain relationships between UI elements (e.g. nested lists sliding into place).
5. **Consistency Beats Novelty**: Standardized patterns are reused across features to reduce cognitive load and simplify development.
6. **Accessibility by Default**: High color contrast, semantic HTML, and keyboard navigation are built into components from the start.
7. **Performance First**: Minimal initial bundle sizes and optimized lazy loading ensure immediate view renders.
8. **AI-Friendly System**: Clean token separations and modular layouts allow AI coding agents to generate consistent designs.

---

## 12. Responsive Token Scaling

Tokens scale dynamically across viewports to maintain layout proportion:

*   **Spacing Adaptability**: Margin values scale down on mobile screens. For example, a card list spacing token of `spacing.8` (32px) on desktop scales down to `spacing.4` (16px) on mobile viewports.
*   **Typography Adaptability**: Headlines utilize CSS custom clamp functions to scale smoothly based on screen width:
    ```css
    h1 {
      font-size: clamp(2rem, 5vw, 3.75rem);
    }
    ```
*   **Navigation Adaptability**: Sidebars are hidden on mobile viewports, shifting navigation controls to bottom tabs or slide-out menu drawers.
