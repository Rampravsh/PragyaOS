# PragyaOS Frontend Implementation Roadmap

This document outlines the strict execution phases for implementing and building screens across PragyaOS. Every milestone must be completed in order.

---

```
┌──────────────────────────────────────────────┐
│       PHASE 0: Architecture Stabilization    │ (Critical Core Alignment)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 1: Marketing Foundation         │ (Primitive Extractor & Setups)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 2: Landing Experience           │ (Public Landing & Catalog Screens)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 3: Authentication               │ (Login, Registration, Verification)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 4: Student Workspace            │ (Classroom, Modules, Portals)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 5: Instructor Studio            │ (Course Builder, Studio Panels)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 6: Admin Portal                 │ (Settings, User Admin, Organization)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 7: Performance & Polish         │ (Bundle optimizations, transitions)
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        PHASE 8: Production Readiness         │ (Final audits & build deployment)
└──────────────────────────────────────────────┘
```

---

## Phases Breakdown

### Phase 0: Architecture Stabilization
*   **Goal**: Lock down core configurations and resolve entrypoint issues.
*   **Tasks**:
    *   Align React versions across all packages to `^18.2.0`.
    *   Register `@pragyaos/theme/tailwind/preset` preset in `apps/web/tailwind.config.ts`.
    *   Refactor [main.tsx](file:///g:/PragyaOS/apps/web/src/main.tsx) to mount routing and App providers.
    *   Inject dynamic CSS variables for all 4 themes inside `index.css`.
    *   Finalize and freeze monorepo boundaries.

### Phase 1: Marketing Foundation
*   **Goal**: Extract and promote UI primitives into `@pragyaos/ui`.
*   **Tasks**:
    *   **Phase 1A**: Extract Button, Badge, Typography, and base Card.
    *   **Phase 1B**: Extract Dialog, Popover, Tooltip, Tabs, and Accordion.
    *   **Phase 1C**: Extract base Layouts, shared Forms, and search inputs.
    *   Relocate inline SVG icons to `@pragyaos/icons`.
    *   Map standard path aliases (`@/*`).

### Phase 2: Landing Experience
*   **Goal**: Build out the public pages.
*   **Tasks**:
    *   Implement Marketing layout, header, footer.
    *   Build landing sections using promoted primitives and shared composites.
    *   Build Course Discovery catalog search index.

### Phase 3: Authentication
*   **Goal**: Secure portal gateway.
*   **Tasks**:
    *   Implement auth router layouts.
    *   Connect Zod forms, logins, registrations, and refresh hooks.

### Phase 4: Student Workspace
*   **Goal**: Classroom and study dashboards.
*   **Tasks**:
    *   Build student portals, classroom views, unit playlists, and certificates.

### Phase 5: Instructor Studio
*   **Goal**: Course creation tools.
*   **Tasks**:
    *   Build curriculum builder trees, module publishers, and drag-and-drop components.

### Phase 6: Admin Portal
*   **Goal**: System administrative configuration.
*   **Tasks**:
    *   Implement organization workspaces, settings, role gates, and users dashboards.

### Phase 7: Performance & Polish
*   **Goal**: Fine-tune user experience.
*   **Tasks**:
    *   Analyze bundles, optimize lazy-loading, check tree shaking, and fine-tune Framer Motion curves.

### Phase 8: Production Readiness
*   **Goal**: Release readiness checklist.
*   **Tasks**:
    *   A11y audits, visual regressions, test sweeps, and final lock builds.
