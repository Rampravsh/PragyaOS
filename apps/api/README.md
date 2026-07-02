# PragyaOS API Service

The production-grade modular monolith API engine for PragyaOS Learning Experience Platform.

## Technology Stack
*   **Engine**: Node.js + Express
*   **Language**: TypeScript
*   **Database Interface**: Prisma ORM + PostgreSQL
*   **Memory Store**: Redis + BullMQ (Task Queue)
*   **Logging**: Winston + Morgan

---

## Local Development Setup

### 1. Prerequisites
Ensure you have the following installed locally:
*   Node.js (v20 or higher)
*   pnpm (v9 or higher)
*   Docker & Docker Compose (for local PostgreSQL and Redis instances)

### 2. Configuration Setup
Copy the environment variables template and configure the variables:
```bash
cp .env.example .env
```

### 3. Execution Commands
From the workspace root directory:

```bash
# Install all dependencies across workspaces
pnpm install

# Start database and redis services
docker-compose up -d

# Start backend in development reload mode
pnpm --filter=@pragyaos/api dev

# Build production artifacts
pnpm --filter=@pragyaos/api build

# Run backend integration tests
pnpm --filter=@pragyaos/api test
```

---

## Key Project Conventions
*   **Strict Env Checks**: Missing environment configurations will cause the server to fail-fast at boot.
*   **Consistent Response envelopes**: All responses wrap data inside standard success or pagination JSON envelopes.
*   **Traceable Logging**: Every HTTP request is appended with a correlation `x-request-id` header traced in logging outputs.
*   **Modular Organization**: Modules are encapsulated in `src/modules/[moduleName]/` including schemas, services, and routing tables.
