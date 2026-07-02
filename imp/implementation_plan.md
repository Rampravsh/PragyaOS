# PragyaOS: Repository Setup & Implementation Blueprint

**Product Name:** PragyaOS  
**Type:** Modern Learning Experience Platform (LXP)  
**Author:** Antigravity (Lead Software Engineer / Technical Lead)  
**Status:** Under Review (Feedback Requested)

---

## 1. Monorepo Folder Structure Design

The PragyaOS repository is structured as a monorepo managed with **pnpm Workspaces** and **Turborepo** to maximize resource sharing, cache builds, and unify dependency governance.

```
/pragyaos
├── .github/                   # CI/CD Workflows
├── apps/                      # Deployable applications
├── packages/                  # Shared internal libraries
├── tooling/                   # Build and lint configurations
├── docs/                      # Technical plans, schemas, and ADRs
├── scripts/                   # Workspace shell scripts
├── docker/                    # Docker environments
├── pnpm-workspace.yaml        # Workspace catalog definition
├── turbo.json                 # Turborepo task settings configuration
└── package.json               # Monorepo root configurations
```

### Root Directory Breakdown
*   **`.github/`**: Houses GitHub actions workflows (`ci.yml` for automated test suites and linters, `cd.yml` for automated container builds and deployments).
*   **`apps/`**: The deployment layer. Contains the direct consumer-facing applications (Express API backend, Vite React client).
*   **`packages/`**: Shared internal workspace packages containing libraries, configurations, and core assets reused across apps.
*   **`tooling/`**: Houses configuration presets (e.g., shared ESLint, Prettier, Tailwind configurations) to avoid duplicate configurations.
*   **`docs/`**: Central storage for architecture decision records (ADRs), developer onboarding guides, schema models, and database design maps.
*   **`scripts/`**: Automation scripts written in Bash/Node for tasks like database seeding, local testing setups, and workspaces migrations.
*   **`docker/`**: Contains environment configurations (e.g., `redis.conf`, postgres init queries, local mock storage configs) to support clean docker-compose setups.

---

## 2. Deployable Applications Layout (`apps/`)

Deployable items reside in `/apps`, representing the decoupled, scale-independent runtime components of the architecture.

```
/apps
├── /api                       # Modular Monolith Express API
│   ├── prisma/                # Migrations & schema definitions
│   └── src/                   # Source files
└── /web                       # Vite React Client Single Page App
    ├── public/                # Static public resources
    └── src/                   # React code
```

### Application Folder Breakdown
*   **`apps/api` (Backend Core)**: Contains the Express server. It houses database integration via Prisma and orchestrates business domain processing.
*   **`apps/web` (Frontend Client)**: The React client application. Consumes the API backend, managing views and handling route routing locally.

---

## 3. Shared Workspace Packages (`packages/`)

To support code sharing and prevent duplication, reusable code and configurations are isolated into sub-packages within `/packages`.

```
/packages
├── /ui                        # Shared Design System Elements
├── /types                     # Shared TypeScript interfaces & Zod schemas
├── /config                    # Shared env-mapping helpers
├── /eslint-config             # Reusable ESLint profiles
├── /typescript-config         # Base tsconfig presets
└── /utils                     # Generic helper utility scripts
```

### Workspace Packages Breakdown
*   **`packages/ui`**: Contains shared components (e.g., buttons, input fields, badges) designed to match the brand system. Used to build the Vite client and admin portals.
*   **`packages/types`**: Shared types, interfaces, and Zod schemas shared between the Express backend and React frontend (e.g., request payloads, user model shapes).
*   **`packages/config`**: Configuration constants, workspace settings, and shared utility configurations.
*   **`packages/eslint-config`**: Shared linting configurations to enforce code style consistency across all applications and packages.
*   **`packages/typescript-config`**: Shared base TypeScript configurations (`tsconfig.base.json`) for backend applications, frontend applications, and shared libraries.
*   **`packages/utils`**: Reusable helper functions (date formatters, hash generators, currency converters) shared across applications.

---

## 4. Backend Architecture: Feature-Based Modular Monolith

`apps/api` adopts a **Feature-Based Modular Monolith** architecture. This structures code by domain modules rather than technical layers, making it easy to migrate modules into independent microservices later if scaling demands require it.

```
/apps/api/src
├── /config                    # App engine settings, connection keys
├── /common                    # Base exceptions, HTTP statuses
├── /core                      # Security middleware, base modules
├── /database                  # DB connections, seeds
├── /middlewares               # Global interceptors
├── /modules                   # Feature domain modules
├── /lib                       # Logger, cache wrappers
├── /services                  # Global domain orchestrations
├── /jobs                      # Asynchronous tasks
├── /queues                    # BullMQ queue managers
├── /events                    # Module events handlers
├── /routes                    # Express router aggregator
├── /docs                      # Swagger/OpenAPI yaml configurations
├── /tests                     # Integration testing suites
├── /types                     # Backend-specific types
└── /utils                     # Local helpers
```

### Feature Module Sub-Structure
Every module inside `apps/api/src/modules/` is self-contained:

```
/modules/[moduleName]          # e.g., /modules/courses
├── /controllers               # Handles HTTP requests and responses
├── /services                  # Core business logic processing
├── /repositories              # Direct database read/write queries
├── /schemas                   # Zod payload structures
├── /dto                       # Data Transfer Object mappings
├── /interfaces                # Domain interfaces
├── /routes                    # Express sub-router paths
├── /constants                 # Domain status codes and messages
├── /types                     # Local TypeScript types
├── /utils                     # Local helpers
└── /validators                # Route-level validation middleware
```

*   **`controllers`**: Parses incoming HTTP requests, maps queries, and returns JSON envelopes.
*   **`services`**: Contains the core business logic (e.g., enrollment eligibility checks). Can invoke repositories or publish events.
*   **`repositories`**: Interacts directly with the database using Prisma. Other modules cannot access this module's database tables directly.
*   **`schemas`**: Zod validation schemas for request bodies, headers, and query parameters.
*   **`dto`**: Structures and sanitizes output payloads before they are returned to the client.
*   **`interfaces`**: Exported TypeScript interfaces for inter-module communication.
*   **`routes`**: Maps endpoint paths to controller actions.
*   **`constants`**: Module-specific constants (e.g., `COURSE_STATUS = { DRAFT: 'draft', PUBLISHED: 'published' }`).
*   **`validators`**: Middleware that validates payloads against Zod schemas before running controllers.

---

## 5. Frontend Architecture: Feature-Based Structure

`apps/web/src` organizes components by feature domain, with common, reusable UI components stored in a central folder.

```
/apps/web/src
├── /app                       # App wrapper, main provider setups
├── /components                # Shared UI elements
├── /features                  # Feature domain components
├── /hooks                     # Global custom React hooks
├── /layouts                   # Page layouts (Sidebar, Portal, Landing)
├── /pages                     # Routing views
├── /routes                    # React Router configs
├── /services                  # HTTP connection clients (Axios instance)
├── /store                     # RTK slices
├── /theme                     # Styling tokens
├── /assets                    # Client assets (images, SVGs)
├── /constants                 # App state definitions
├── /contexts                  # Custom React Context stores
├── /providers                 # App providers wrapper
├── /types                     # Types configurations
├── /utils                     # Local formatting scripts
└── /lib                       # Configured library instances
```

### Feature Module Sub-Structure
Features in `apps/web/src/features/` are modular:

```
/features/[featureName]        # e.g., /features/course-player
├── /components                # Feature-specific components
├── /hooks                     # Feature-specific hooks
├── /services                  # API fetch helpers
├── /store                     # RTK slice for local state
└── /types                     # Feature-specific types
```

---

## 6. Configuration Files Inventory

Below are the configuration files required to initialize the repository, organized by location.

```
/pragyaos
├── package.json                   # Root workspace controls
├── pnpm-workspace.yaml            # Monorepo workspaces index
├── turbo.json                     # Turborepo task configs
├── tsconfig.json                  # Root TS mappings
├── .gitignore                     # Git file exclusion rules
├── eslint.config.js               # Global ESLint configuration
├── prettier.config.js             # Global code formatting settings
├── docker-compose.yml             # Dev environment orchestrations
├── .env.example                   # Baseline env variables template
└── README.md                      # Onboarding instructions

/apps/api
├── package.json                   # Backend dependencies file
├── tsconfig.json                  # Backend compilation options
├── Dockerfile                     # API deployment configuration
├── src/config/swagger.ts          # OpenAPI layout configuration
└── prisma/schema.prisma           # Prisma database schema definition

/apps/web
├── package.json                   # Frontend dependencies file
├── tsconfig.json                  # Web compilation options
├── tailwind.config.ts             # Tailwind design tokens configurations
├── vite.config.ts                 # Vite bundle orchestration config
└── Dockerfile                     # Frontend static hosting config

/packages/*
├── tsconfig.json                  # Shared module compilation options
└── package.json                   # Shared library configuration
```

---

## 7. Dependency Installation Flow

To maintain monorepo stability, packages and dependencies must be installed in a strict sequence:

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Core Configuration                            │
│ Install Turborepo, ESLint, TypeScript, Prettier, Husky │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Shared Config Packages                        │
│ Initialize configurations, workspace types, and utils │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: Backend Infrastructure                        │
│ Install Express, Prisma, Zod, Redis, BullMQ, Winston   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: Frontend Component Systems                    │
│ Install React, Vite, Tailwind CSS, RTK, TanStack Query │
└────────────────────────────────────────────────────────┘
```

### Target Package Directory:

*   **Monorepo Dev Dependencies:** `turbo`, `typescript`, `eslint`, `prettier`, `husky`, `lint-staged`.
*   **Shared Types & Utilities:** `zod`, `tsup`.
*   **Backend Dependencies:** `express`, `@prisma/client`, `zod`, `redis`, `bullmq`, `winston`, `morgan`, `cors`, `helmet`, `bcrypt`, `jsonwebtoken`, `multer`, `cloudinary`, `razorpay`, `nanoid`, `dotenv`.
*   **Frontend Dependencies:** `react`, `react-dom`, `react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`, `axios`, `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`.

---

## 8. Project Conventions

### Naming Guidelines
*   **Code Folders**: `kebab-case` (e.g., `audit-logs`).
*   **Backend Controllers/Services**: `camelCase` (e.g., `courseService.ts`).
*   **Frontend Components**: `PascalCase` (e.g., `VideoPlayer.tsx`).
*   **TypeScript Types/Interfaces**: `PascalCase` (e.g., `interface CourseMetadata`).
*   **CSS Class Selections**: Tailwind utility patterns.

### Absolute Mappings (Import Aliases)
```json
// apps/api/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@config/*": ["./src/config/*"],
      "@common/*": ["./src/common/*"],
      "@modules/*": ["./src/modules/*"],
      "@lib/*": ["./src/lib/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}

// apps/web/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@store/*": ["./src/store/*"],
      "@theme/*": ["./src/theme/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

### Environment Configurations
*   Local environments must never contain production connection strings.
*   Required parameters are documented in `.env.example`.
*   Zod validation runs on app startup to verify that all required environment variables are present and valid:
    ```typescript
    // config/env.ts
    const envSchema = z.object({
      PORT: z.string().transform(Number),
      DATABASE_URL: z.string().url(),
      REDIS_URL: z.string().url(),
      JWT_SECRET: z.string(),
    });
    ```

### Commits & Branches
*   **Branches**: Use task-specific branch names: `feat/auth-rtr`, `fix/course-reorder`, `docs/setup-monorepo`.
*   **Commit Format**: Adhere to the Conventional Commits specification:
    *   `feat(payments): integrate checkout webhooks`
    *   `fix(builder): fix lesson drag-and-drop offsets`
    *   `chore(deps): update prisma versions`

### Testing Approach
*   **Backend Testing**: Unit and integration testing using Vitest, with Supertest for API endpoint verification.
*   **Frontend Testing**: Component testing using Vitest and React Testing Library, with Playwright for end-to-end integration tests.

---

## 9. Implementation Roadmap

```
Milestone 1: Repository Foundation & Core System Configs
├── Init root package.json, pnpm workspace, turbo.json
├── Configure tsconfig presets, ESLint rules, and Prettier rules
└── Run verification test checks to confirm monorepo linkage
Milestone 2: Database Schema & Core API Foundation
├── Configure prisma database connections
├── Build Express server app layout, log managers, global error handler
└── Set up Redis caching and rate-limiting middleware
Milestone 3: Authentication, RBAC, and Profile APIs
├── Implement JWT token verification and secure Refresh Token rotation
├── Build middleware checks for Role-Based Access Control (RBAC)
└── Implement register, login, and user profile CRUD APIs
Milestone 4: Core Course Engine
├── Design database models for Courses, Chapters, and Lessons
└── Build course creation and lesson drag-and-drop builder routes
Milestone 5: Media Upload & Asynchronous Video Ingestion
├── Set up direct-to-cloud file uploads using pre-signed URLs
└── Configure BullMQ queues for asynchronous video transcoding
Milestone 6: Checkout, Purchases, and Student Enrollments
├── Set up payments system and secure webhook controllers
└── Implement course registration logic and database transaction scopes
Milestone 7: Focus Learning Tools: Progress Tracker & Certificates
├── Implement lesson progress tracking and percentage calculations
└── Build PDF Certificate generator worker using Puppeteer
Milestone 8: Admin Operations Panel & Audits Logs
├── Build moderation interface for courses reviews and user profiles
└── Set up audit logging middleware to track sensitive admin actions
Milestone 9: Frontend Architecture Setup & Shell
├── Initialize Vite client using Tailwind CSS & Design System tokens
└── Set up React Router and Redux Toolkit base store configurations
Milestone 10: Screen Implementations & Final Testing
├── Build student dashboard, course player, and instructor dashboard
└── Run integration tests (k6 load checks, Playwright end-to-end tests)
```
