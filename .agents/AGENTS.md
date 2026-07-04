# PragyaOS Workspace Rules

## Architecture Regression Checklist

Before implementing or merging any future backend domain modules (such as Commerce, Payments, or Reviews), you MUST verify compliance with the following design standards:

1.  **No Direct Database Access in Services**: The Prisma database client `prisma` must NEVER be imported or invoked directly inside any service or controller file. All database reads and writes must be wrapped inside dedicated repositories (e.g. `UserRepository`, `CourseRepository`, `CourseModuleRepository`, `LearningUnitRepository`).
    *   *Exception*: Complex database transaction blocks coordinating multiple repositories (e.g., `prisma.$transaction(...)`) belong in the domain service layer.
2.  **Lightweight Probe Exceptions**: All standard controllers must utilize `SuccessResponse` wrappers (`SuccessResponse.send(res, data)` and `SuccessResponse.created(res, data)`).
    *   *Exception*: Lightweight liveness/readiness health probes (`/live` and `/ready`) return raw text payloads.
3.  **HttpStatus Constants Only**: The code must never use raw magic integers for HTTP status codes (e.g., `400`, `401`, `500`). Enforce usage of the `HttpStatus` enum imported from `@pragyaos/constants`.
4.  **Zod Schema Validation**: Every input payload must be parsed and validated at the router or controller entrypoint using standard Zod schemas and the `validate(schema, payload)` wrapper.
5.  **Swagger Documentation**: Every route file must export Swagger/OpenAPI documentation decorators defining requests, responses, parameter formats, and error cases.
6.  **Security & RBAC Controls**: Every endpoint must be guarded by security middleware (e.g. `requireAuth`) and role-based permissions checks (e.g. `requireRole(role)` or `Guard.Permission(permission)`).
7.  **Test Coverage**: Write unit/integration tests matching standard Vitest patterns verifying happy paths, edge cases, input boundary validations, and RBAC enforcement.
