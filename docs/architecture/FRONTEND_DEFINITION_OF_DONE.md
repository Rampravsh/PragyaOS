# Frontend Definition of Done (DoD)

This document establishes the mandatory quality gates that every frontend user interface, layout, component, hook, or state integration must pass before it is considered complete.

---

## 1. Compliance Checklist

Before declaring a task done, verify compliance with the following:

### Build & Compiler
- [ ] **Successful Build**: The monorepo builds successfully using `pnpm build` without warnings.
- [ ] **Zero TypeScript Errors**: Running `tsc --noEmit` in both apps and packages compiles with zero errors.
- [ ] **Zero Lint Violations**: Running `pnpm lint` returns no code style or architectural boundary errors.

### Design System Compliance
- [ ] **Zero Redefined/Hardcoded Colors**: Colors must use Tailwind presets (e.g. `bg-primary`, `text-muted-foreground`) or reference semantic variables.
- [ ] **Zero Hardcoded Spacing/Sizing**: Paddings, margins, gaps, widths, and heights must align to the token scale (`p-4`, `gap-3`).
- [ ] **No Local Tokens**: No inline custom themes or local color declarations are added.
- [ ] **Tailwind Arbitrary Exceptions**: Arbitrary classes (e.g., `[var(--...)]`) are used **only** for properties without standard presets (like clip-paths, grid layout grids, and complex CSS filters).

### Component Complexity Limits
- [ ] **File Length**: Component files must not exceed 250 lines.
- [ ] **Props Count**: Props interfaces must not exceed 6 custom parameters (excluding native HTML attributes).
- [ ] **JSX Nesting**: JSX elements must not go deeper than 3 levels (extract sub-views if they exceed this limit).

### Monorepo Boundaries
- [ ] **Strict Import Direction**: UI primitives are imported from `@pragyaos/ui`, icons from `@pragyaos/icons`, assets from `@pragyaos/assets`, and hooks from `@pragyaos/hooks`. No package imports code from `apps/*`.
- [ ] **Component Classification**: Primitives (stateless elements) reside in `@pragyaos/ui`. Shared product layouts are under `apps/web/src/components/shared`. Domain features are strictly encapsulated under `apps/web/src/features`.
- [ ] **Path Aliases**: All imports use absolute path mappings (e.g. `@/*`) rather than relative parents (`../../`).

### Accessibility (A11y)
- [ ] **Semantic Markup**: Elements use semantic tags (`<nav>`, `<header>`, `<main>`, `<button>`) instead of generic `div` triggers.
- [ ] **Keyboard Accessible**: All active actions are reachable via keyboard `Tab` controls and confirmable via `Enter`/`Space`.
- [ ] **Focus Rings**: Visual indicators are attached using `focus-visible:ring-2`.
- [ ] **No Inline SVGs**: All vector shapes are encapsulated within packages.

### Performance
- [ ] **React Hooks Optimization**: Unnecessary renders are prevented by memoizing complex outputs.
- [ ] **Code Splitting**: Routes and feature entry points are lazy-loaded.

---

## 2. Documentation Rules

Whenever code changes occur:
*   **Theme Token Changes**: Update `docs/frontend/DESIGN_SYSTEM.md` or equivalent.
*   **Package Boundary Changes**: Update `docs/architecture/PACKAGE_OWNERSHIP.md`.
*   **Architecture Shifts**: Update `docs/architecture/FRONTEND_ARCHITECTURE.md`.
*   **Engineering Rules Shifts**: Update `.agents/AGENTS.md`.
