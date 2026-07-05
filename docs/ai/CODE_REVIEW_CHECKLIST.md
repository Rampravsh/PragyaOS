# Code Review Checklist

Use this checklist during PR reviews to audit code quality, monorepo import boundaries, and execution efficiency.

---

## 1. Import Boundaries & Dependency Direction

- [ ] **No Circular References**: Packages do not import from `apps/*`, and features do not cross-import from other features directly.
- [ ] **Barrel Access**: All feature imports target the feature's root `index.ts`. No deep paths are present.
- [ ] **Shared UI Autonomy**: Components inside `packages/ui` do not depend on business logic or global app stores.

---

## 2. API & Data Handling

- [ ] **Direct API Calls Blocked**: Components do not use raw Axios or fetch methods. All queries wrap inside defined repository functions.
- [ ] **Zod Validation Active**: Outgoing payloads and incoming network data pass through schema validation checks.
- [ ] **Token Refresh Compliance**: Endpoint calls are piped through the centralized Axios client to ensure support for token queuing on expiration.

---

## 3. Component Complexity & Performance

- [ ] **Size Limitations**: Active TSX files do not exceed 250 lines of code.
- [ ] **Sub-component Splitting**: Large view structures are broken down into small, single-responsibility files.
- [ ] **Optimization Hooks**: Heavy calculations or filter operations use `useMemo`/`useCallback` hooks to prevent redundant updates.

---

## 4. Test Verification

- [ ] **Utility Coverage**: Math, formatting, and date algorithms in `packages/utils` have 100% test coverage.
- [ ] **MSW Mocks**: Integration tests mock REST endpoints using MSW handlers rather than making live network requests.
- [ ] **Authorisation Paths**: Custom routes are tested against role-restricted requests to verify access control.
