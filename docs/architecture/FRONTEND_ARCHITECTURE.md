# PragyaOS: Master Frontend Architecture & Engineering Blueprint

**Product Name:** PragyaOS  
**Type:** Enterprise Learning Experience Platform (LXP/LMS)  
**Author:** Antigravity (Principal Frontend Architect)  
**Status:** Approved (v2.0 Production Blueprint)

---

## 1. Recommended Folder Structure

The frontend application in `apps/web/src` is structured following a **feature-first, domain-driven architecture with a dedicated Composition Layer**. This design isolates global infrastructure, common UI primitives, and cross-cutting libraries from localized business features.

```
apps/web/src/
├── app/                  # Application initialization, root routes, and global styles
│   ├── App.tsx           # Root Application Component
│   ├── main.tsx          # React 19 entry point and DOM mounting
│   └── routes.tsx        # Top-level route switchboard mapping layout groups
├── assets/               # Global static assets (logos, custom illustrations, generic SVGs)
├── components/           # Global stateless, non-feature-specific UI components
│   ├── feedback/         # Loading indicators, skeletons, error boundary fallbacks
│   └── layout/           # Global grid, containers, and page structural wrappers
├── core/                 # Core infrastructure directories
│   ├── http/             # HTTP Client layer (Axios instances, interceptors, error mapping)
│   │   ├── axios.ts
│   │   ├── interceptors.ts
│   │   ├── refreshQueue.ts
│   │   └── httpErrors.ts
│   ├── api/              # Core API declarations and schema configurations
│   ├── query/            # QueryClient settings, global keys, and default query behaviors
│   │   ├── queryClient.ts
│   │   ├── queryKeys.ts
│   │   └── queryDefaults.ts
│   └── auth/             # Token storage drivers, session parsing, and RBAC control systems
│       ├── session.ts
│       ├── tokenManager.ts
│       └── permissions.ts
├── design-system/        # Design system bridge between tokens and runtime UI
│   ├── tailwind.css      # Core styles & Tailwind directives
│   └── tokens.ts         # Bridge values imported from @pragyaos/theme
├── features/             # Feature-first domain modules (Self-contained boundaries)
│   ├── auth/             
│   ├── catalog/          
│   ├── classroom/        
│   ├── studio/           
│   ├── organization/     
│   ├── credentials/      
│   ├── notifications/    
│   └── settings/         
├── hooks/                # Global React hooks (non-feature-specific, UI-only)
│   ├── useAuth.ts        # Fast access hook to current session and permissions
│   ├── useDebounce.ts    # Debounces inputs for real-time operations
│   └── useMediaQuery.ts  # Media query matching hook for responsive layout branches
├── layouts/              # Top-level responsive page layouts
│   ├── MarketingLayout.tsx   # Premium, high-editorial aesthetic layout (Ellipsus style)
│   ├── WorkspaceLayout.tsx   # Premium, workspace sidebar dashboard layout (Linear style)
│   ├── AuthLayout.tsx        # Minimalistic centered layouts for authentication states
│   └── StudioLayout.tsx      # Multi-panel edit layout for the Instructor curriculum studio
├── lib/                  # Initialization configurations for third-party scripts
│   ├── sentry.ts         # Telemetry, exception tracing, and error reporting
│   └── posthog.ts        # Analytics, user tracking, and custom feature flagging
├── pages/                # Route endpoint entry controllers (Only maps routes to Compositions)
├── providers/            # Orchestration layer for global React Context Providers
│   ├── AuthProvider.tsx  # Direct token management, session state, and RBAC injection
│   └── AppProvider.tsx   # Wrapper combining Redux, Query, Theme, and Toast providers
├── routes/               # Routing guards and permission declarations
│   ├── guards/           # AuthGuard, RoleGuard, PublicOnlyGuard
│   └── config/           # Route list schemas and lazy route definitions
├── services/             # Global cross-cutting infrastructure services
│   ├── media/            # Multipart s3 file upload manager
│   └── storage/          # Encrypted local/session storage driver wrappers
├── store/                # Redux Toolkit global client-side store
│   ├── rootReducer.ts    # Merges feature slices and global UI controls
│   └── index.ts          # Configures middleware, RTK store initialization
├── styles/               # Global raw styling rules, fonts, and animation variables
├── theme/                # Global theme states, custom theme variants
├── types/                # App-specific shared TypeScript definitions
└── utils/                # Global pure utility functions (formatting, validation, date utils)
```

### Directory Responsibilities

1. **`app/`**: Root mounting hub. Houses routing registrations and app bootstrappers. No page layout or visual elements reside here.
2. **`assets/`**: Static binary resources (images, SVGs, manifest configurations).
3. **`components/`**: Stateless, logic-free presentation blocks. Only contains shared structural layouts (e.g., grids, generic tables).
4. **`core/`**: System infrastructure. Splitting is strictly enforced between Http network clients (`core/http`), API endpoint templates (`core/api`), query caching setups (`core/query`), and authentication managers (`core/auth`).
5. **`design-system/`**: Runtime translation layer. Bridges token keys from `@pragyaos/theme` to Tailwind classes and custom variable sets.
6. **`features/`**: Modular domain capsules containing isolated hooks, types, APIs, local components, and local layouts.
7. **`hooks/`**: Global reusable web hooks. Devoid of business context (e.g., handles viewport bounds or touch inputs).
8. **`layouts/`**: Page frames defining workspace shells (e.g. sidebars) vs marketing editorial grids.
9. **`lib/`**: Vendor integrations. Wraps vendor APIs to isolate the app from breaking SDK updates.
10. **`pages/`**: Route entry points. A page file acts purely as an orchestrator. It imports a single **Composition**, matches it to a top-level **Layout**, and sets the page title. It contains zero business logic.
11. **`providers/`**: Context provider list. Handles nesting order to avoid index file clutter.
12. **`routes/`**: Route paths definitions, parameters schemas, and auth permission gates.
13. **`services/`**: Bridges browser capabilities and data actions (e.g. video processing or local database cache sync).
14. **`store/`**: Redux state. Manages collaborative variables (e.g. floating player state or workspaces command panel toggle).
15. **`styles/`**: Baseline styles, animations, font declarations, and raw CSS variables.
16. **`theme/`**: Manages styling variables (Light, Dark, and Custom Themes) and coordinates them with local storage preferences.
17. **`types/`**: Shared generic client typings (e.g., list interfaces or SVG element properties).
18. **`utils/`**: Stateless calculations and formatting algorithms (e.g., numbers, currency).

---

## 2. Monorepo Shared Package Responsibilities

PragyaOS maps monorepo packages inside `packages/` utilizing `pnpm workspaces` and `Turborepo` to enforce dependency boundaries:

```
packages/
├── constants/            # Common domain values, system roles, validation limits
├── hooks/                # Generic React interaction hooks (UI/DOM oriented only)
├── icons/                # High-performance SVG wrappers (No raw SVGs in UI markup)
├── theme/                # Design tokens, typography variables, breakpoints, motion transitions
├── types/                # Shared enterprise domain interfaces (User, Course, Credential)
├── ui/                   # High-fidelity reusable UI primitives (Inputs, Buttons, Modals)
└── utils/                # Pure TypeScript utility algorithms
```

### Monorepo Dependency Matrix

| Package | Purpose | Excludes | Web/Native Portability |
| :--- | :--- | :--- | :--- |
| `packages/ui` | Generic design system primitives. Wraps Radix Headless primitives. | Business rules, API client calls, global store selectors. | High (Decouple styling, layout primitives ready to map to React Native). |
| `packages/theme` | Consolidated Design Tokens (Spacing, Typography scale, Radius values, Colors, Breakpoints, Motion Curves). | JSX markup, layouts, elements style rules. | 100% (Exports JSON and raw CSS variables). |
| `packages/icons` | React SVG component wrappers. Consolidates SVG imports, controls viewbox styling, and standardizes sizing. | Raw inline SVG markup inside features. | High (Components wrapper path nodes for React Native SVGs). |
| `packages/hooks` | Low-level DOM interaction hooks (`useClickOutside`, `useLocalStorage`). | Feature states, network loaders. | Medium (DOM-dependent. Native variants must implement replacement drivers). |
| `packages/utils` | Pure stateless helper methods. | React elements, state hooks, window references. | 100% (Standard Pure ES modules). |
| `packages/constants` | Hardcoded configuration files, roles enum list, input limitations. | Volatile setups, REST API links. | 100% (Static parameters). |
| `packages/types` | Unified contract TypeScript models matching backend specs. | Business actions, runtime modules. | 100% (Type structures). |

---

## 3. Dual-Environment Experience Architecture

The frontend application splits into two visual environments sharing the same design system but serving opposing user intents.

```
                  ┌─────────────────────────────────┐
                  │      SHARED DESIGN SYSTEM       │
                  │       (@pragyaos/theme)         │
                  └────────────────┬────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│     ENVIRONMENT A: MARKETING    │                 │     ENVIRONMENT B: WORKSPACE    │
├─────────────────────────────────┤                 ├─────────────────────────────────┤
│ * Purpose: Storytelling, Brand  │                 │ * Purpose: Speed, Task Control  │
│ * Aesthetic: Ellipsus Editorial │                 │ * Aesthetic: Linear / Stripe    │
│ * Layout: Organic, Wide Spaces  │                 │ * Layout: Dense Grid, Keyboard  │
│ * Fonts: Serif Headers, Sans    │                 │ * Fonts: Sans / Mono UI Font    │
└─────────────────────────────────┘                 └─────────────────────────────────┘
```

### Environment A: Marketing Experience (Editorial Brand Shell)
*   **Purpose**: Brand representation, course catalog search, landing pages, about section, blog, and billing options.
*   **Visual Philosophy**: Inspired by *Ellipsus*. Large editorial headers, generous whitespace, organic vertical alignment, layered parallax page scrolling, pinned columns, and cinematic element entry motions.
*   **Typography**: Serif font scales (e.g. Lora, Playfair) for headlines, paired with lightweight Outfit/Inter body fonts.
*   **Layout Rule**: Limit dashboard elements. Padding scales are doubled vertically (e.g. `py-20` is the default section spacing). Chrome elements are hidden to emphasize content.

### Environment B: Workspace Experience (Productivity Studio & Portal)
*   **Purpose**: Classroom, curriculum builder, lesson viewer, instructor analytics, organization portal, user setting screens.
*   **Visual Philosophy**: Inspired by *Linear, Stripe, and GitHub*. Productivity first, high information density, fast responsiveness, and keyboard-centric focus states.
*   **Typography**: Clean, high-performance Sans-Serif font (Outfit/Inter) combined with Monospace fonts (JetBrains Mono) for numbers, status codes, and timers.
*   **Layout Rule**: Dense, structured grid arrangements. Sidebars are highly nested and collapse. Primary actions are mapped to hotkeys to allow complete keyboard navigation.

### Coexistence Strategy
Both environments run within a single SPA bundle under `apps/web/src`, sharing the exact same theme token engine (`@pragyaos/theme`) and primitive components (`@pragyaos/ui`). The separation is managed at the Layout and Layout Theme level:
1. **Marketing Shell**: Uses `layouts/MarketingLayout.tsx` which applies light/neutral paper backgrounds (`bg-background`), large text styles (`font-serif`), and expanded padding configurations.
2. **Workspace Shell**: Uses `layouts/WorkspaceLayout.tsx` which overrides base typography with system sans-serif styles (`font-sans`), tightens container borders (`gap-2`, `p-4`), and attaches global keyboard listener context providers for the Command Palette.

---

## 4. Composition Layer

To keep page components lightweight and maintain feature decoupling, PragyaOS introduces a **Composition Layer** between Pages and Features.

```
┌──────────────────┐
│    Page Layer    │  <-- apps/web/src/pages/ (Only defines route link and main Layout)
└────────┬─────────┘
         │ (Imports single composition)
         ▼
┌──────────────────┐
│Composition Layer │  <-- features/catalog/compositions/ (Orchestrates feature widgets)
└────────┬─────────┘
         │ (Wires state and events)
         ├──────────────────────────┐
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐
│  Feature Widget  │       │  Feature Widget  │  <-- features/catalog/components/ (Domain UI)
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         └─────────────┬────────────┘
                       ▼
            ┌────────────────────┐
            │ Shared UI Primitives│  <-- packages/ui/ (Stateless inputs, buttons)
            └────────────────────┘
```

### Responsibility of Compositions
*   **State Coordination**: Compositions combine multiple feature components and coordinate local state between them.
*   **Data Orchestration**: Compositions invoke TanStack query hooks to pull data from backend repositories and pass it down as props. This keeps individual components layout-agnostic and easy to test.
*   **Form Bounds**: Compositions wrap components in `React Hook Form` scopes and manage error mapping, page-level loaders, and event tracking.
*   **Isolation**: Pages never import feature-specific components directly. A Page file imports only a single Composition (e.g. `CourseBuilderComposition.tsx`) and renders it within the selected layout shell.

### Directory Configuration Example

```
features/studio/
├── components/                  # Pure visual components
│   ├── CurriculumTree.tsx       # Renders module list, sends drag events
│   └── PublishChecklist.tsx     # Displays checks status panel
├── compositions/                # Composition wrappers coordinating views
│   └── StudioWorkspace.tsx      # Fetches Course details, binds Tree and Checklist, manages submit
└── index.ts                     # Exports StudioWorkspace as the feature entry point
```

---

## 5. Standard Feature Template

To maintain a consistent codebase across all feature domains, every folder inside `features/` must implement this standardized structure:

```
features/your-feature/
├── api/                  # TanStack Query mutations/queries and repository interfaces
│   ├── useFeatureQuery.ts
│   └── useFeatureMutation.ts
├── components/           # Private, stateless domain-specific UI components
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
├── compositions/         # Composition files coordinating multiple widgets & data streams
│   └── FeatureDashboardComposition.tsx
├── hooks/                # Local custom hooks encapsulating feature business state
│   └── useFeatureCalculations.ts
├── lib/                  # Configurations for feature-specific libraries (e.g., markdown parser)
├── schemas/              # Zod validation schemas matching contract parameters
│   └── feature.schema.ts
├── services/             # Context-specific business logic (e.g., custom buffer parsing)
├── store/                # Redux Toolkit feature slice definition
│   └── featureSlice.ts
├── types/                # Local TypeScript interfaces unique to this feature
│   └── feature.types.ts
├── utils/                # Pure helper functions specific to feature operations
│   └── featureFormatter.ts
├── constants/            # Feature-specific static configurations
│   └── feature.constants.ts
└── index.ts              # Feature Entry Barrel (Only exports public Compositions & Types)
```

### Folder Responsibilities

1. **`api/`**: Binds TanStack Query keys to HTTP repository requests. Bypasses direct fetch methods inside view files.
2. **`components/`**: Private UI components. These are styled using design system tokens but are kept stateless and layout-agnostic.
3. **`compositions/`**: The orchestration files. Compositions tie components, forms, and network state together into a functional view.
4. **`hooks/`**: Encapsulates state rules and computations (e.g., tracking current video playback position).
5. **`lib/`**: Keeps third-party setup logic (e.g., code editor) separated from the core React components.
6. **`schemas/`**: Housing for Zod schemas. Handles input validations before submitting payloads to backend controllers.
7. **`services/`**: Computations that don't belong in hooks or components (e.g., converting dynamic file streams).
8. **`store/`**: Local Redux slices. Manages local feature UI states (e.g., toggled sidebar views).
9. **`types/`**: Interfaces and types restricted to this business scope.
10. **`utils/`**: Math and formatting helpers specific to this feature.
11. **`constants/`**: Local configurations (e.g. default settings, error status codes).
12. **`index.ts`**: The feature's public API. It exports only the main compositions and public types.

---

## 6. Restructured Core Architecture

To decouple core operations from React views, the global `core/` directory is split into four dedicated modules:

```
core/
├── http/             # Network Transport Layer (Axios instance, Interceptors, Queue)
├── api/              # Consolidated Repository Index (Maps endpoints to Repositories)
├── query/            # TanStack Cache setup, Query Keys registry
└── auth/             # Session Storage managers, JWT managers, Permission arrays
```

### Core HTTP Layout (`core/http/`)
Handles raw request execution, network errors, and auth header injection.

*   `axios.ts`: Instantiates Axios with base headers, default timeouts, and cross-origin setup.
*   `interceptors.ts`: Coordinates request triggers (token validation) and response handlers (refresh tokens).
*   `refreshQueue.ts`: Manages queue array buffers to catch and retry pending requests when token is expired.
*   `httpErrors.ts`: Maps raw HTTP status codes to custom frontend exceptions.

### Core API Layout (`core/api/`)
Coordinates endpoints mapping and encapsulates Repository wrappers.

```typescript
// apps/web/src/core/api/index.ts
export { CourseRepository } from '@/features/catalog/api/CourseRepository';
export { UserRepository } from '@/features/auth/api/UserRepository';
export { NotificationRepository } from '@/features/notifications/api/NotificationRepository';
```

### Core Query Layout (`core/query/`)
Orchestrates cache validation thresholds and defines central keys mapping.

*   `queryClient.ts`: Configures standard QueryClient cache behavior:
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,    // 30 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
```
*   `queryKeys.ts`: Global Query Key Registry mapping to prevent syntax typos:
```typescript
export const queryKeys = {
  courses: {
    all: ['courses'] as const,
    list: (filters: any) => [...queryKeys.courses.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.courses.all, 'detail', id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
  }
};
```

### Core Auth Layout (`core/auth/`)
Manages browser credentials, scopes parsing, and RBAC control hooks.

*   `tokenManager.ts`: Abstracted interface for local and cookie storage keys.
*   `session.ts`: Decodes JWT tokens and extracts user profile properties.
*   `permissions.ts`: Maps system role arrays to permission actions (e.g. `COURSE_PUBLISH`).

---

## 7. Command Palette Architecture

To support high-productivity workspace requirements, a global command palette engine (`Cmd+K` / `Ctrl+K`) is built into the application core.

```
[Cmd+K Key Press] ──► Opens Dialog UI Overlay 
                            │
                            ├──────────────────────────┐ (Dynamic Search Input)
                            ▼                          ▼
               [ TanStack Query Cache ]     [ Redux Palette Store ]
               (Queries Courses, Lessons,   (Navigates views, toggles dark
                Users, and Credentials)      theme, triggers quick commands)
```

### Functional Capabilities
1. **Search Index Navigation**: Direct text search targeting courses, student records, modules, certificates, and unread notifications.
2. **Settings Short-cuts**: Quick toggles for theme options, profile options, and keyboard bindings.
3. **Workspace Actions**: Triggering actions like duplicating courses, initiating cloud video uploads, and clearing local caches.
4. **Command Extensibility**: Design framework is structured to easily integrate natural language queries for future AI assistant utilities.

### State Orchestrations
- **Toggle State**: Handled globally in the Redux store (`store/paletteSlice.ts`) to let any component open the palette.
- **Search Queries**: Bypasses local state delays by mapping search strings to TanStack Query hooks. Hooks leverage debouncing to prevent API spam.

---

## 8. Motion Design System Tokens

Transitions are governed by token arrays exported from `@pragyaos/theme`. Random CSS transition speeds or dynamic values are strictly forbidden.

### Durations Scale
```typescript
export const durations = {
  instant: "0ms",
  fast: "150ms",    // Tooltips, hover scales
  normal: "250ms",  // Page route entry, card expansions
  slow: "450ms",    // Dialog pops, drawer slider screens
  delight: "800ms", // Success checkmark animations
};
```

### Easing Curves
```typescript
export const easingCurves = {
  linear: "linear",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  pop: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Emulates physical spring bounces
};
```

### Spring Presets (Framer Motion Configs)
```typescript
export const springPresets = {
  default: { stiffness: 180, damping: 12 },
  bouncy: { stiffness: 300, damping: 15 },
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 400, damping: 28 }, // For dense UI elements (menus, dropdowns)
};
```

### Transition Patterns
- **Page Transitions**: Framer Motion `AnimatePresence` configuration mapping:
  ```json
  {
    "initial": { "opacity": 0, "y": 12 },
    "animate": { "opacity": 1, "y": 0 },
    "exit": { "opacity": 0, "y": -12 }
  }
  ```
- **Modal Modifiers**: Pops from center using scaling transforms (`scale: 0.95` to `scale: 1`) combined with snapping spring curves.
- **Drawers Sliders**: Slides out from viewport bounds (`x: "100%"` to `x: 0`) with smooth decay easing configurations.

---

## 9. Expanded Design Tokens Engine

`@pragyaos/theme` serves as a complete design token engine, exposing the following token namespaces:

### Colors Tokens
- **Base Color Palette**: Raw slate, zinc, neutral, stone, orange, emerald, blue, violet scales.
- **Semantic Tokens**: Light and dark variables mapping (`background`, `foreground`, `primary`, `secondary`, `destructive`, `border`, `input`, `ring`, `success`, `warning`).

### Typography Tokens
- **Families**: Outfit/Inter (Dashboard Sans), JetBrains Mono (Dashboard Mono), Lora/Playfair (Editorial Serif).
- **Scale**: `xs` (12px), `sm` (14px), `base` (16px), `lg` (18px), `xl` (20px), `2xl` (24px), `3xl` (30px), `4xl` (36px), `5xl` (48px).
- **Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700).

### Spacing Scale
A 16-step modular scale: `0` (0px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px).

### Border Tokens
- **Widths**: None (0px), Thin (1px), Medium (2px), Thick (4px).
- **Radii**: None (0px), sm (2px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px).

### Shadows and Opacities
- **Shadows**: None, sm, md, lg, xl, and focus rings halo glows.
- **Opacities**: None (0), Hover overlay (0.08), Active clicks (0.12), Muted items (0.4), Disabled items (0.5), Solid (1).

### Z-Index, Layering, and Focus Rings
- **Z-Index**: `hide` (-1), `base` (0), `dropdown` (1000), `sticky` (1020), `fixed` (1030), `modal` (1050), `toast` (1080).
- **Semantic Layering**: Defines stacking hierarchy for overlays (e.g. popover must stack above drawer).
- **Focus Rings**:
  - `standard`: `ring-2 ring-ring ring-offset-2 ring-offset-background outline-none`
  - `editorial`: `outline outline-offset-4 outline-primary`

---

## 10. Route and Guards Architecture

Application routing uses structured layout trees based on authentication state and user roles.

```
/ (Root)
│
├── [Public Marketing Layout] (Editorial theme)
│   ├── / (Landing page)
│   ├── /catalog (Course discovery)
│   └── /courses/:slug (Course detail)
│
├── [Auth Layout] (Minimal centered)
│   ├── /auth/login
│   └── /auth/register
│
├── [Workspace Layout] (Dense dashboard, requires Auth)
│   ├── /portal (Student Dashboard)
│   │     └── /classroom/:courseId (Guarded: role === STUDENT)
│   │
│   ├── /studio (Instructor Workspace)
│   │     └── /builder/:courseId (Guarded: role === INSTRUCTOR/ADMIN)
│   │
│   └── /admin (Admin Control)
│         └── /settings (Guarded: role === ADMIN)
```

### Route Guard Implementation Details
Pages are wrapped in guard components that resolve session claims before mounting children.
*   `requireAuth`: Redirects to `/auth/login` if the user is unauthenticated. Binds target path to route history state for redirection after login.
*   `requireRole`: Restricts access to specific role claims. Non-matching claims are redirected to `/unauthorized`.
*   `requirePermission`: Performs fine-grained check of user permission scopes (e.g., verifies user has `CREDENTIAL_REVOKE` permission before mounting revocation view).

---

## 11. Engineering Rules & Performance Budgets

To keep development standards high across the engineering team:

### 1. Folder Ownership
- Shared packages in `packages/*` are owned by the infrastructure team. Changes require review from the Lead Frontend Architect.
- Feature directories in `apps/web/src/features/*` are owned by their respective domain teams. Cross-import rules are strictly enforced.

### 2. Dependency Ownership & Boundaries
- Views **cannot** import direct database clients or raw HTTP libraries.
- Features **cannot** import components from other features. Shared elements must be promoted to the `/components` folder or `@pragyaos/ui`.
- `packages/ui` can only import from `@pragyaos/theme` and `@pragyaos/icons`. It must not import any application-specific types or hooks.

### 3. File Size & Component Limits
- **Maximum TSX Component Size**: 250 lines of code. Exceeding this requires extracting sub-views or custom hooks.
- **Maximum Utility File Size**: 150 lines of code.
- **Complexity Limit**: Nesting inside components must not go deeper than three layers. Extract deep logic into custom helper methods.

### 4. Naming Conventions
- React Components: `PascalCase.tsx`
- Custom Hooks: `camelCase.ts` starting with `use`
- Folder Names: `kebab-case`
- Style Modules: `[name].module.css`

### 5. Performance Budgets
- **Initial Bundle Size**: `< 150KB` gzip.
- **Lazy-Loaded Route Chunks**: `< 50KB` gzip.
- **Time to Interactive (TTI)**: `< 1.5s` on mobile networks.
- **Lighthouse Performance Score**: `> 90` across all landing and search index routes.

### 6. Accessibility & Testing Budgets
- **A11y Compliance**: 100% keyboard nav support on interactive elements, minimum contrast ratio of 4.5:1, and clean aria attributes.
- **Testing Coverage**: 100% coverage on core utilities in `packages/utils`, 85% coverage on business hooks.
- **Integration Coverage**: High priority flows (e.g., billing, auth refresh, course creation) must be covered by integration tests using MSW handlers.

---

## 12. AI-First Development Integration

PragyaOS uses AI-assisted development workflows. These standards ensure AI coding agents build code that is consistent and safe from regressions.

### Standardizing AI Workflows
Developers and agents must reference the following templates under `docs/ai/` to enforce coding guidelines:
*   [AI_PROMPT_GUIDE.md](file:///g:/PragyaOS/docs/ai/AI_PROMPT_GUIDE.md): Defines prompting protocols, context injection configurations, and phased development plans.
*   [SCREEN_SPECIFICATION_TEMPLATE.md](file:///g:/PragyaOS/docs/ai/SCREEN_SPECIFICATION_TEMPLATE.md): Outlines layout structures, state layers, and interaction maps before generating screens.
*   [COMPONENT_SPECIFICATION_TEMPLATE.md](file:///g:/PragyaOS/docs/ai/COMPONENT_SPECIFICATION_TEMPLATE.md): Defines typescript signatures, aria roles, and dependency lists before coding individual components.
*   [PROMPT_RULES.md](file:///g:/PragyaOS/docs/ai/PROMPT_RULES.md): Lists core coding rules for AI agents (e.g., absolute imports, async state setups, immutable updates).
*   [DESIGN_REVIEW_CHECKLIST.md](file:///g:/PragyaOS/docs/ai/DESIGN_REVIEW_CHECKLIST.md): Code review checklist verifying token compliance, responsive configurations, and contrast rules.
*   [CODE_REVIEW_CHECKLIST.md](file:///g:/PragyaOS/docs/ai/CODE_REVIEW_CHECKLIST.md): Code review checklist tracking monorepo boundary compliance, performance budgets, and unit tests.

---

## 13. Compliance Checklist for Future Backend Modules

All UI integrations must follow these architecture rules:
1. **Direct API calls inside views are blocked**: API requests must go through hooks or repositories.
2. **Zod payload validation must be configured on submission**: Inputs must match defined API contract types.
3. **All pages must render using route loaders**: Ensures pages load dynamically and handle exceptions gracefully.
4. **Any visual change must respect theme tokens**: Do not use hardcoded hex values. Use CSS custom variables.
5. **No inline SVGs inside application code**: Icon graphics must wrap inside `@pragyaos/icons`.
6. **Views do not assemble feature modules directly**: All route entries must pull from the Composition Layer.
7. **Every animation must draw from tokens**: Arbitrary CSS transitions or spring configs are strictly prohibited.
