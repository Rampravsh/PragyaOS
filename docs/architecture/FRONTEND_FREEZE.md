# PragyaOS Frontend Architecture Freeze (v1.0)

This document declares that the frontend architecture of PragyaOS is officially **Frozen**. No further structural refactoring, folder reorganizations, theme engine alterations, or monorepo package boundary shifts are permitted. All future development effort must focus solely on building screens, components, features, tests, and performance updates.

---

## 1. Freeze Details

*   **Status**: **FROZEN**
*   **Version**: `1.0`
*   **Date**: July 6, 2026
*   **Approved By**: Principal Frontend Architect

---

## 2. Frozen Architectural Specifications

The following areas are frozen and must remain unmodified:

### 1. Folder Structure
*   `apps/web/src` follows the domain-driven feature-first layout (`features/`, `components/`, `layouts/`, `pages/`, `routes/`, `store/`).
*   No new global folder groupings may be created under `apps/web/src` without explicit architect approval.

### 2. Package Boundaries
*   Every workspace package boundary is locked as defined in [PACKAGE_OWNERSHIP.md](file:///g:/PragyaOS/docs/architecture/PACKAGE_OWNERSHIP.md).
*   No reverse imports (e.g. `packages/ui` importing from `apps/*`) are permitted.

### 3. Theme & Visual Ownership
*   `@pragyaos/theme` owns every visual decision (Colors, Typography, Spacing, Sizing, Radius, Grid, Containers, Motion, Elevation, Opacity, Blur, Breakpoints, Interaction States, Focus States, Layering).
*   No local style sheets or components may introduce a custom visual token.

### 4. Tailwind Configuration
*   All web applications must consume `pragyaPreset` from `@pragyaos/theme/tailwind/preset`.
*   No local brand hex codes or utility overrides should be added.

### 5. Component Classification
*   Components must fall strictly into **Primitive** (`packages/ui`), **Shared Composite** (`apps/web` shared composites), or **Application Component** (`apps/web` features/layouts).
*   Product components (e.g. `CoursePreviewCard`) must never pollute the primitive packages.

### 6. Engineering Standards & Quality Gates
*   All work must pass the automated and manual checks defined in [FRONTEND_DEFINITION_OF_DONE.md](file:///g:/PragyaOS/docs/architecture/FRONTEND_DEFINITION_OF_DONE.md) and [.agents/AGENTS.md](file:///g:/PragyaOS/.agents/AGENTS.md).

---

## 3. Stabilization Protocol

Any future architectural deviation requires:
1.  **RFC Proposal**: Documenting the rationale.
2.  **Architect Review**: Formal review by the Principal Frontend Architect.
3.  **ADR Synchronization**: Formal logging in `docs/architecture/ADR/`.
