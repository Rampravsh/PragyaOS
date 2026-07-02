# Database Architecture & Foundation

This folder documents PostgreSQL standards, database design patterns, and Prisma workflow operations for PragyaOS.

---

## 1. Database Standards & Conventions

### Naming Conventions
*   **Tables**: Pluralized, snake_case (`users`, `organizations`, `role_permissions`). Mapped in Prisma using the `@@map("table_name")` block.
*   **Columns**: Mapped to database-native snake_case naming keys (`first_name`, `created_at`) using the `@map("column_name")` attribute.
*   **Models**: Singularized, PascalCase inside JS/TS.

### Primary Keys & Identifiers
*   We use **UUID v4** exclusively for primary keys (`id` columns).
*   **Why UUID?** UUID v4 provides global uniqueness across systems, fits perfectly with PostgreSQL's native `uuid` binary datatype (which stores them as a space-efficient 16-byte value), and is fully scalable when transitioning to distributed multi-regions databases.

### Timestamps & Date Formats
All tables must contain standard timestamps configured to utilize timezone offsets:
*   `created_at`: `Timestamptz`, default to `now()`.
*   `updated_at`: `Timestamptz`, updated automatically on row mutations.
*   `deleted_at`: Nullable `Timestamptz`, tracks soft deletion milestones.

### Soft Deletion Strategy
*   Rows are never hard-deleted from core entity tables (e.g. `users`, `organizations`). Instead, we toggle `deleted_at` timestamps.
*   Prisma query middleware intercepts requests, automatically appending `WHERE deleted_at IS NULL` filters to queries.

### Optimistic Concurrency Control
*   Core transactional models contain a `version` integer column (starting at `0`).
*   To prevent concurrent overwrites during heavy update paths, updates verify that the row's version matches the initial state retrieved:
    `UPDATE table SET val = :val, version = version + 1 WHERE id = :id AND version = :currentVersion`

### Cascade Deletion Rules
*   **Restrict**: Used on crucial parent-child relationships (e.g., `User` belongs to `Organization`). An organization deletion is rejected if it contains active users to prevent orphaned entities.
*   **Cascade**: Used on purely dependent join tables (e.g., deleting a role deletes its `RolePermission` and `UserRole` associations).

---

## 2. Command Pipeline Reference

### Development Workflow
Configure your local environment variables (`DATABASE_URL` in `.env`) pointing to PostgreSQL.

```bash
# 1. Generate local Prisma Client bindings
pnpm --filter=@pragyaos/api exec prisma generate

# 2. Spin up local migrations and apply schema updates
pnpm --filter=@pragyaos/api exec prisma migrate dev --name init_database_foundation

# 3. Seed default roles, permissions, and admin accounts
pnpm --filter=@pragyaos/api exec prisma db seed
```

### Production Deployments
In production, schema migrations are applied sequentially using the Prisma deploy interface:

```bash
# Apply pending migrations safely
pnpm --filter=@pragyaos/api exec prisma migrate deploy
```
