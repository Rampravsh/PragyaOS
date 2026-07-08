# Frontend Scratch Build Plan & Log

This document tracks the progress, decisions, and future plans for the frontend redesign of PragyaOS inside the `frontend-from-scratch` branch.

---

## 1. Abhi Tak Kya Kiya (What We Have Done So Far)

We successfully isolated and cleaned the frontend architecture to start with a fresh slate.

1. **Created Branch**: Spawned a dedicated branch `frontend-from-scratch` from the main codebase.
2. **Deleted Visual Packages**: Removed the following custom packages entirely from `packages/` directory:
   - `@pragyaos/assets` (Illustrations & decorative assets)
   - `@pragyaos/hooks` (DOM & interaction hooks)
   - `@pragyaos/icons` (SVG icon wrappers)
   - `@pragyaos/theme` (Tailwind presets & CSS variables)
   - `@pragyaos/ui` (Stateless UI primitives)
3. **Decoupled Web App**: 
   - Removed all custom workspace runtime dependencies (`@pragyaos/constants`, `@pragyaos/types`, `@pragyaos/utils`) from `apps/web/package.json`.
   - Now, the web app is completely independent of the rest of the workspace packages.
4. **Cleared Source Code**: Emptied the entire `apps/web/src` directory.
5. **Created Clean Entry Point**: Initialized a minimal React 19 + Tailwind v4 + Vite application shell inside `apps/web/src/` with the following files:
   - `vite-env.d.ts` (Vite client types declaration)
   - `index.css` (Tailwind import directive)
   - `App.tsx` (Simple header container)
   - `main.tsx` (Application DOM mounting point)
6. **Verifications**: Ran `pnpm install` and verified that both `apps/api` (backend) and `apps/web` (frontend) build and type-check cleanly.

---

## 2. Kyu Kiya (Why We Did It)

The clean-up was performed to achieve the following architectural goals:

- **Clean Slate**: The previous frontend setup was heavily coupled with complex token abstractions, themes, and shared packages that made direct modifications difficult. Starting from scratch allows us to implement custom designs without legacy constraints.
- **De-complexification**: Eliminating multi-package overhead. By placing types, utilities, assets, and components directly inside the `apps/web/src/` directory, we remove the friction of rebuilds (`tsup` watch compilation loops) for workspace packages.
- **Self-Containment**: The web application is now 100% self-sufficient. Developers can build features, styling, and routes in a single folder without jumping back and forth across different package boundaries.

---

## 3. Aage Kya Karne Wale Hain (What We Are Going To Do Next)

To build the new frontend from scratch, we will execute the following plan sequentially:

### Phase 1: Base Application Setup
1. **Directory Structure**: Create a highly scalable structure under `apps/web/src/`:
   - `/components` (Global components like buttons, input fields, modals)
   - `/features` (Domain-specific features like auth, courses, workspace)
   - `/hooks` (Custom hooks like query wrappers or event listners)
   - `/layouts` (Layout frames e.g., AuthLayout, DashboardLayout)
   - `/pages` (Router pages mapping to specific URLs)
   - `/routes` (Routing configurations and route guards)
   - `/styles` (Tailwind v4 themes and custom overrides)
   - `/utils` (Frontend helper functions)
2. **Global Styling**: Define the custom theme tokens (Colors, Typography, Spacing, Animations) directly inside `apps/web/src/index.css` using Tailwind v4 custom `@theme` variables.

### Phase 2: Core Routing & Authentication Flow
1. **Routing Engine**: Wire up `react-router-dom` in `main.tsx` to handle page transitions.
2. **Authentication Pages**: Build the interfaces for the user onboarding flow:
   - `/login` (Login screen with email/password and social login options)
   - `/register` (User registration page)
   - `/forgot-password` & `/reset-password` (Password recovery flow)
3. **Route Guards**: Set up route guards to redirect unauthenticated users away from private workspace views.

### Phase 3: Portal & Workspace Dashboard
1. **Dashboard Shell**: Create a sidebar/topbar-based portal dashboard layout.
2. **Core Widgets**: Build dashboards with functional sections (e.g. course stats, current learning progress, notifications).
3. **API Integration**: Integrate HTTP requests (Axios + React Query) to communicate directly with the local running `@pragyaos/api` backend service.
