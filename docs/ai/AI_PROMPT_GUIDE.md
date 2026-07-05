# PragyaOS AI Prompt Guide

This guide defines how developers and AI coding agents interact with the PragyaOS codebase. Because PragyaOS is developed using AI-assisted workflows, maintaining a structured, repetitive approach is crucial to keeping the workspace clean and preventing code regression.

---

## 1. How to Prompt for New Features

When prompting an AI agent to build a new feature inside the PragyaOS workspace, always divide the request into three distinct phases. Do not ask the agent to write the entire feature in a single prompt.

### Phase 1: Data Contracts and Type Definitions
1. Provide the backend OpenAPI spec for the target route.
2. Ask the AI to create/extend type interfaces inside `packages/types/src/index.ts`.
3. Ask the AI to write the repository implementation inside `apps/web/src/features/your-feature/api/` (matching `CourseRepository` styles) with input/output validations using Zod.

### Phase 2: React State and Mutations Hook
1. Prompt the AI to build TanStack Query hooks inside `apps/web/src/features/your-feature/hooks/` using the updated repository.
2. Instruct the AI to write optimistic state updates for immediate user actions.

### Phase 3: Compositions and Components Layout
1. Request page compositions inside `apps/web/src/features/your-feature/compositions/` to lay out the UI shell.
2. Leverage headless primitives from `@pragyaos/ui` and tokens from `@pragyaos/theme`.
3. Wire the layout into the routing configuration.

---

## 2. Context Injection Rules

Before asking an AI agent to write or modify code, you must supply the necessary architectural constraints:

1. **System Rules Injection**: Always pass the `AGENTS.md` and `FRONTEND_ARCHITECTURE.md` references in the prompt context.
2. **Contract Pinning**: Pass the relevant endpoints from `docs/api/API_CONTRACT_V1.md`.
3. **No Placeholders**: Explicitly prompt: *"Write the complete file contents without omitting code blocks or inserting `// TODO: Implement later` statements."*

---

## 3. Standard AI Prompt Template

Use the following template for prompting coding tasks:

```markdown
You are a Staff Frontend Engineer implementing [Feature Name] in PragyaOS.

CONTEXT:
- Monorepo structure using pnpm workspace and Turborepo.
- Backend API contract is frozen. Endpoints: [list routes or link API_CONTRACT_V1.md].
- Code styling uses Tailwind CSS and tokens from `@pragyaos/theme`.

COMPLIANCE RULES:
- Extend `packages/types` for data interfaces.
- No direct database/Axios calls inside components; use the Repository pattern.
- Place screen layouts in `features/[feature-name]/compositions/`.
- Pages only orchestrate compositions.

TASK:
Implement [Detailed feature task description].
```
