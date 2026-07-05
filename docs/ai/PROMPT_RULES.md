# PragyaOS AI Prompt Rules

These rules are parsed by AI agents writing code for PragyaOS. Follow these constraints without exception.

---

## Rule 1: No Direct State Mutation

*   All data fetch updates must pass through TanStack query caches or Redux Toolkit reducers.
*   Direct assignments like `user.name = "new name"` are blocked. Use immutability updates (`{ ...user, name: "new name" }`).

## Rule 2: Keep Components Pure and Small

*   Components must not exceed 250 lines of code. If a component exceeds this threshold, break it into smaller sub-components or extract business logic into custom hooks.
*   Shared UI components in `packages/ui` must not refer to business concepts (e.g. `User`, `Course`, `Enrollment`). They must receive primitive props (strings, numbers, simple callbacks).

## Rule 3: Use Absolute Paths

*   Relative paths are allowed only for components within the same folder structure.
*   Import modules using the `@/` prefix (e.g. `@/components`, `@/features/classroom/hooks`).
*   Import monorepo shared packages using `@pragyaos/[package-name]`.

## Rule 4: Handle Asynchronous States Explicitly

*   Every network query must explicitly handle:
    *   `isLoading`: Show skeleton screens.
    *   `isError`: Render fallback error boundaries or error alerts.
    *   `data === undefined`: Show empty states with descriptive action triggers.

## Rule 5: Keep Styles Tokenized

*   Do not inject custom hardcoded hex values or pixel sizes.
*   Use tailwind classes mapped to theme tokens (e.g., `text-primary`, `bg-background`, `rounded-md`, `p-4`).
