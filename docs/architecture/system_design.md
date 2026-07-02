# PragyaOS: Master System Design & Engineering Blueprint

**Product Name:** PragyaOS  
**Type:** Modern Learning Experience Platform (LXP)  
**Author:** Antigravity (SaaS Architecture & Engineering Design Group)  
**Status:** Under Review (Feedback Requested)

---

## Part 1: High-Level System Architecture

### High-Level Architecture
PragyaOS utilizes a **Modular Monolith** architecture with a React SPA frontend and a Node.js/Express backend, communicating over a secure RESTful API layer. The architecture is engineered to transition to a Distributed Microservices pattern when scaling requirements demand separate horizontal scaling of specific high-load domains (such as video transcoding, search index ingestion, or interactive quiz engines).

```
               [ React SPA Client (Vite + TS) ]
                              │
                    ( HTTPS / TLS 1.3 )
                              │
                              ▼
                [ Nginx / API Gateway / CORS ]
                              │
     ┌────────────────────────┼────────────────────────┐
     │ Route (e.g. /api/auth) │ Route (/api/courses)   │ Route (/api/jobs)
     ▼                        ▼                        ▼
┌──────────────────────────────────────────────────────────────┐
│                  Express Application Monolith                │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────┐    ┌────────────────┐    ┌────────────┐  │
│  │  Auth Module   │    │ Course Module  │    │ Job Runner │  │
│  └───────┬────────┘    └───────┬────────┘    └─────┬──────┘  │
│          │ Inter-module events (EventEmitter / MediatR pattern)   │
└──────────┼─────────────────────┼───────────────────┼─────────┘
           │                     │                   │
           ▼                     ▼                   ▼
    ┌──────────────┐      ┌──────────────┐    ┌──────────────┐
    │  PostgreSQL  │      │ Redis Cache  │    │ Redis Queue  │
    │ (Transactional)│     │ & Session    │    │  (BullMQ)    │
    └──────────────┘      └──────────────┘    └──────┬──────┘
                                                     │
                                                     ▼
                                              [ Background ]
                                              [  Workers   ]
```

### Modular Monolith vs. Microservices
*   **Modular Monolith:** A single deployment unit where the internal codebase is split into strictly encapsulated modules. Modules can only interact with each other via defined interfaces or an internal in-process event bus.
*   **Microservices:** Autonomous services deployed independently, each owning its database and communicating via network protocols (gRPC, HTTP/REST, AMQP).

### Why Modular Monolith is Selected
1.  **Reduced Operational Complexity:** Managing Kubernetes clusters, service meshes (Istio/Linkerd), distributed tracing (Jaeger), and distributed transaction management (Saga pattern) introduces immense overhead. For Version 1, speed of delivery, ease of testing, and deployment simplicity are paramount.
2.  **Strict Domain Boundaries:** Code is organized by domain modules. Each module contains its controllers, service layer, data access, and validators. This prevents spaghetti code and ensures database queries do not cross domain boundaries.
3.  **Low Latency & High Performance:** Inter-module communication occurs via in-process function calls or memory events, avoiding network roundtrip latencies inherent in microservices.
4.  **Database Simplicity:** Maintaining a single, logical PostgreSQL database simplifies relational joins, transaction scopes, database migrations, and backups while keeping logical separation between schemas.

### Future Migration Strategy
If a module (e.g., *Video Processing* or *Analytics*) requires independent scaling:
1.  **Decouple Data Access:** Move table joins to the application layer. Ensure the module accesses data via other modules' public service APIs, not direct DB queries.
2.  **Migrate to In-Memory Event Bus:** Transition internal EventEmitters to an external message broker (RabbitMQ or Apache Kafka).
3.  **Extract the Codebase:** Pull the module's folder out of the monorepo structure into its workspace.
4.  **Database Split:** Extract its tables into a separate database schema/instance.
5.  **Provision Network Gateway Routing:** Configure the API Gateway to route paths (e.g., `/api/v1/analytics/*`) to the new service.

### API Gateway Design
*   **Layer Structure:** An Nginx instance acts as a reverse proxy, handling SSL termination, CORS pre-flight requests, request rate limiting, and gzip compression.
*   **Request Routing:** Forwards requests matching `/api/v1/*` to the Node.js application server. Static UI requests are served directly from cloud storage buckets or cached at CDN edge locations.

### Module Communication
*   **Direct In-Process API Calls (Synchronous Queries):** When Module A needs data from Module B synchronously, it imports Module B's exported Service interface. (e.g., `CourseService` calling `UserService.getUserDetails(userId)`).
*   **Internal Event Bus (Asynchronous Operations):** Module A publishes an event to an in-memory event broker (Node's `EventEmitter` or a custom event dispatcher pattern). Other modules listen to these events to trigger side-effects asynchronously. (e.g., `OrderCompletedEvent` triggers `EnrollmentService.enrollStudent` and `NotificationService.sendReceipt`).

### Event-Driven Architecture
*   **Local Broker:** A centralized `EventBus` class wraps Node's `EventEmitter` with type-safe payloads defined via TypeScript interfaces.
*   **Decoupled Handlers:** Handlers perform light tasks immediately or offload heavy processes to BullMQ tasks to keep the HTTP request-response cycle fast.

### Queue Architecture
*   **Engine:** Redis-backed **BullMQ**.
*   **Design Pattern:** A cluster of background worker processes run in separate Node.js threads/dynos. The Express API publishes job parameters (e.g., video upload location, recipient email) to the Redis-backed queues. Background workers consume these jobs, handling retries, delays, and reporting back completion status.

### Caching Architecture
*   **Write-Through Caching:** Used for frequently read, static configurations (e.g., Categories, System Settings). Updates write to the database and invalidate the cached key in Redis.
*   **Cache-Aside (Lazy Loading):** Used for heavy queries (e.g., Course Detail page, Dashboard Summaries). The system looks up the Redis cache first; on a cache miss, it reads from PostgreSQL, populates Redis with an explicit Time-To-Live (TTL), and returns the payload.
*   **Invalidation Strategy:** Updates to entities trigger automatic key evictions (e.g., publishing a new lesson invalidates the specific course's cache keys).

### Core Workflows

#### 1. Authentication Flow
```
[Client] ──( POST /auth/login )──> [Auth Controller] ──( Validate Credentials )
   ▲                                       │
   │ <──( Set-Cookie: HTTP-Only Refresh,   ▼
   │      Body: Access Token, User Info )─── [Issue Access (JWT) & Refresh Token]
```

#### 2. Authorization Flow
1.  Client presents `Authorization: Bearer <Access Token>`.
2.  `AuthMiddleware` verifies JWT signature and extracts `userId` and `role`.
3.  `RBACMiddleware(allowedRoles)` checks if the user's role is permitted.
4.  For resource-specific validation (e.g., *Is this user the owner of this course?*), an entity-ownership middleware validates the resource parameter against `userId`.

#### 3. Payment Flow
1.  **Initiation:** Student triggers checkout. API creates a database `Order` (status: `PENDING`) and registers a Razorpay payment order.
2.  **Execution:** Client receives the order ID, boots the Razorpay checkout overlay, and processes payment.
3.  **Webhook Verification:** Razorpay sends a signed webhook payload to the API server upon success.
4.  **Completion:** The webhook handler verifies the signature, updates the `Order` to `PAID`, transitions the payment state, triggers the `EnrollmentService` via an event, and generates an invoice.

#### 4. Video Upload Flow
```
[Instructor] ─( GET /uploads/presigned )─> [API Server] ─( Generate Signatures )─> [Instructor]
                                                                                        │
[Instructor] ────────────────────( Upload Direct )──────────────────────────────> [Storage Bucket]
                                                                                        │
[API Server] <───────────────( Webhook / Callback: Complete )───────────────────────────┘
```
The video processing queue transcodes the raw upload into multiple HLS resolutions, generating a manifest playlist (`.m3u8`).

#### 5. Course Publishing Workflow
1.  Instructor clicks "Publish" on a draft course.
2.  Backend triggers validator schema (verifies minimum lessons, pricing config, preview images).
3.  Course status transitions to `PENDING_REVIEW`.
4.  Platform Admin reviews content; approves course.
5.  Status changes to `PUBLISHED`, trigger database indexes update, and invalidates search caches.

#### 6. Enrollment Workflow
1.  Successful payment or free course subscription triggers `EnrollmentService.create`.
2.  A unique student enrollment record links the `Student` to the `Course`.
3.  Progress tracker initializes a progress matrix (lessons status set to incomplete).
4.  System emits `StudentEnrolledEvent` to send onboarding emails.

#### 7. Progress Tracking Workflow
1.  Course Player calls `POST /api/v1/progress/complete` when a lesson is finished.
2.  Database updates progress table (flags lesson ID as complete).
3.  Aggregator computes current completion percentage of the parent Section and Course.
4.  If progress reaches 100%, an event is published to spawn the PDF Certificate generation worker.

#### 8. Notification Workflow
1.  Events publish payload to `NotificationQueue`.
2.  The job defines target channels (In-app, Email).
3.  Email job calls Resend API; In-App job writes to `Notification` table and triggers a SSE (Server-Sent Events) broadcast if client is online.

---

## Part 2: Backend Module Designs

### Authentication Module
*   **Purpose:** Handles identity verification, credential management, and token lifecycles.
*   **Responsibilities:** Password hashing, multi-factor setup, token issuance, refresh token rotation validation.
*   **Dependencies:** `Users`, `Organizations`, `Redis` (for token blacklist and rate limiting).
*   **Public APIs:** `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, `POST /auth/forgot-password`, `POST /auth/reset-password`.
*   **Database Ownership:** Operates on credentials, tokens, session metadata tables.
*   **Future Scalability:** Can be completely abstracted as an OAuth2/OIDC server or replaced with external providers (e.g., Keycloak, Auth0).

### Users Module
*   **Purpose:** Domain management of user metadata, profile settings, and system roles.
*   **Responsibilities:** Profiling, account locking, state transitions (active, suspended).
*   **Dependencies:** `Roles & Permissions`, `Organizations`.
*   **Public APIs:** `GET /users/me`, `PUT /users/me`, `GET /users/:id` (public profile), `PATCH /users/:id/status`.
*   **Database Ownership:** `users`, `profiles` tables.
*   **Future Scalability:** Denormalize frequent user profiles to cache storage.

### Organizations Module
*   **Purpose:** Multi-tenant configuration isolation.
*   **Responsibilities:** Managing tenant workspaces, billing plans, custom domains, visual configurations.
*   **Dependencies:** `Users`.
*   **Public APIs:** `GET /organizations/:id`, `POST /organizations`, `PUT /organizations/:id/settings`.
*   **Database Ownership:** `organizations`, `organization_settings` tables.
*   **Future Scalability:** Schema-based isolation or dedicated DB clusters per premium tenant.

### Roles & Permissions Module
*   **Purpose:** Role-Based Access Control logic checks.
*   **Responsibilities:** Map permissions to roles, evaluate permission trees at request runtime.
*   **Dependencies:** `Users`.
*   **Public APIs:** `GET /roles`, `POST /roles/:id/permissions` (admin only).
*   **Database Ownership:** `roles`, `permissions`, `roles_permissions` join table.
*   **Future Scalability:** Cache roles/permissions matrix in Redis memory for zero-latency middleware verification.

### Courses Module
*   **Purpose:** Primary engine for content listings, catalog structure, and meta descriptors.
*   **Responsibilities:** Course state lifecycle, filtering, validation, pricing setup.
*   **Dependencies:** `Categories`, `Users` (Instructors), `Organizations`.
*   **Public APIs:** `GET /courses`, `GET /courses/:slug`, `POST /courses`, `PUT /courses/:id`, `DELETE /courses/:id`.
*   **Database Ownership:** `courses` table.
*   **Future Scalability:** Read replica routing for public catalog queries.

### Categories Module
*   **Purpose:** Hierarchical taxonomies mapping courses to subject areas.
*   **Responsibilities:** Manage category trees (parent-child relationships).
*   **Dependencies:** None.
*   **Public APIs:** `GET /categories`, `POST /categories` (admin only), `PUT /categories/:id`.
*   **Database Ownership:** `categories` table.
*   **Future Scalability:** Long-lived cache layer. Categories rarely change.

### Lessons Module
*   **Purpose:** Manage unit learning material.
*   **Responsibilities:** Content retrieval, video references, file attachments, ordering indexes.
*   **Dependencies:** `Sections`, `Courses`.
*   **Public APIs:** `POST /lessons`, `PUT /lessons/:id`, `DELETE /lessons/:id`, `PATCH /lessons/:id/reorder`.
*   **Database Ownership:** `lessons` table.
*   **Future Scalability:** Split content body storage to block storage/NoSQL if heavy interactive elements are added.

### Sections Module
*   **Purpose:** Grouping system for lessons inside a course.
*   **Responsibilities:** Maintain learning units chronologically.
*   **Dependencies:** `Courses`.
*   **Public APIs:** `POST /sections`, `PUT /sections/:id`, `PATCH /sections/:id/reorder`.
*   **Database Ownership:** `sections` table.
*   **Future Scalability:** Keep logic bounded strictly inside Courses boundaries.

### Enrollments Module
*   **Purpose:** Intersecting logic connecting learners to their courses.
*   **Responsibilities:** Verify accessibility, expiration dates, track general course progression.
*   **Dependencies:** `Users`, `Courses`.
*   **Public APIs:** `GET /enrollments/my`, `POST /enrollments/free`, `GET /enrollments/course/:id/status`.
*   **Database Ownership:** `enrollments` table.
*   **Future Scalability:** Relational table scaling via horizontal partitioning by user ID.

### Payments Module
*   **Purpose:** Gateway coordination client.
*   **Responsibilities:** Order verification, invoice generation, signature validation, ledger book entries.
*   **Dependencies:** `Orders`, `Enrollments`.
*   **Public APIs:** `POST /payments/verify-webhook`, `POST /payments/initialize`.
*   **Database Ownership:** `transactions`, `payouts` ledger.
*   **Future Scalability:** Plug-in structure to support global gateways without breaking core flows.

### Orders Module
*   **Purpose:** Core shopping-cart lifecycle tracker.
*   **Responsibilities:** Calculate pricing, tax, discounts, maintain history of purchasing operations.
*   **Dependencies:** `Payments`, `Courses`.
*   **Public APIs:** `GET /orders/history`, `POST /orders`, `GET /orders/:id`.
*   **Database Ownership:** `orders`, `order_items` tables.
*   **Future Scalability:** Archive historical orders over 7 years to external cold stores.

### Reviews Module
*   **Purpose:** Sentiment collection and ratings display.
*   **Responsibilities:** Aggregating course rating figures, checking verified purchaser flags.
*   **Dependencies:** `Courses`, `Users`.
*   **Public APIs:** `GET /courses/:id/reviews`, `POST /courses/:id/reviews`, `DELETE /reviews/:id`.
*   **Database Ownership:** `reviews` table.
*   **Future Scalability:** Async calculations of course ratings via event listeners.

### Certificates Module
*   **Purpose:** Manage credentials and awards verification.
*   **Responsibilities:** Cryptographic sign generation, template overlay generation, verification validation.
*   **Dependencies:** `Users`, `Courses`, `Enrollments`.
*   **Public APIs:** `GET /certificates/:hash`, `GET /certificates/my`.
*   **Database Ownership:** `certificates` table.
*   **Future Scalability:** Store issued certificates as static files in cloud storage with permanent CDN endpoints.

### Assignments Module
*   **Purpose:** Managing hands-on learning tasks.
*   **Responsibilities:** Receive student submissions, track grading states, manage deadlines.
*   **Dependencies:** `Lessons`, `Enrollments`.
*   **Public APIs:** `POST /assignments`, `POST /submissions`, `PATCH /submissions/:id/grade`.
*   **Database Ownership:** `assignments`, `assignment_submissions` tables.
*   **Future Scalability:** Store uploads in designated secure (private) S3 buckets.

### Quizzes Module
*   **Purpose:** Micro-assessments inside learning checkpoints.
*   **Responsibilities:** Shuffle questions, score results, compute statistics, control timers.
*   **Dependencies:** `Lessons`, `Enrollments`.
*   **Public APIs:** `GET /quizzes/:id`, `POST /quizzes/:id/submit`.
*   **Database Ownership:** `quizzes`, `quiz_questions`, `quiz_attempts` tables.
*   **Future Scalability:** In-memory session tracking for active attempts in Redis to avoid constant database writes.

### Progress Module
*   **Purpose:** Granular step tracker.
*   **Responsibilities:** Monitor completion of lessons, active watch times.
*   **Dependencies:** `Users`, `Lessons`, `Enrollments`.
*   **Public APIs:** `POST /progress/toggle`, `GET /progress/course/:id`.
*   **Database Ownership:** `progress_records` table.
*   **Future Scalability:** Use a high-write speed storage engine or batch inserts if real-time scroll telemetry is introduced.

### Bookmarks Module
*   **Purpose:** Virtual bookmarks mapping to items/times.
*   **Responsibilities:** Save specific timestamp tags or resource markers.
*   **Dependencies:** `Users`, `Lessons`.
*   **Public APIs:** `POST /bookmarks`, `GET /bookmarks`, `DELETE /bookmarks/:id`.
*   **Database Ownership:** `bookmarks` table.
*   **Future Scalability:** Purely client-driven or light tables.

### Notes Module
*   **Purpose:** Text annotations tied to lessons.
*   **Responsibilities:** CRUD for user-authored text notes.
*   **Dependencies:** `Users`, `Lessons`.
*   **Public APIs:** `GET /notes`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id`.
*   **Database Ownership:** `notes` table.
*   **Future Scalability:** Database indexing optimization on composite user-lesson IDs.

### Analytics Module
*   **Purpose:** Internal business intelligence.
*   **Responsibilities:** Aggregate view times, revenue charts, growth metrics, conversion ratios.
*   **Dependencies:** `Orders`, `Enrollments`, `Courses`, `Users`.
*   **Public APIs:** `GET /analytics/instructor`, `GET /analytics/admin`.
*   **Database Ownership:** Mostly reads from other modules, writes to cache for fast dashboard returns.
*   **Future Scalability:** Move to a columnar store (e.g., ClickHouse) or read replicas to isolate heavy aggregation scripts.

### Notifications Module
*   **Purpose:** Communication dispatch engine.
*   **Responsibilities:** Format content templates, register read states, orchestrate push/email.
*   **Dependencies:** `Users`.
*   **Public APIs:** `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all`.
*   **Database Ownership:** `notifications` table.
*   **Future Scalability:** In-memory queuing using BullMQ; clean up read messages older than 30 days automatically.

### Uploads Module
*   **Purpose:** File storage interface gateway.
*   **Responsibilities:** Generating pre-signed upload URLs, verifying MIME types, calling malware scanners.
*   **Dependencies:** `Users`.
*   **Public APIs:** `POST /uploads/presigned`.
*   **Database Ownership:** `uploads_registry` table.
*   **Future Scalability:** Direct uploads to cloud objects (S3/R2) bypasses application compute bottlenecks entirely.

### Search Module
*   **Purpose:** Search and filter indices optimizer.
*   **Responsibilities:** Dynamic text index generation, multi-parameter catalog matching.
*   **Dependencies:** `Courses`.
*   **Public APIs:** `GET /search`.
*   **Database Ownership:** Read-only access to catalogs or indexing databases.
*   **Future Scalability:** Integrate dedicated search backends (Elasticsearch, Meilisearch, Algolia).

### Admin Module
*   **Purpose:** Control center workspace for platform operators.
*   **Responsibilities:** System settings toggle, instructor onboard reviews, audit reviews.
*   **Dependencies:** All modules.
*   **Public APIs:** `GET /admin/dashboard`, `POST /admin/courses/:id/status`.
*   **Database Ownership:** Reads across schemas.
*   **Future Scalability:** Separate dashboard routes to reduce impact on main production transactional resources.

### Settings Module
*   **Purpose:** Configuration store.
*   **Responsibilities:** Manage platform fees, feature flag states, branding attributes.
*   **Dependencies:** `Organizations`.
*   **Public APIs:** `GET /settings`, `PUT /settings`.
*   **Database Ownership:** `system_settings` table.
*   **Future Scalability:** High Redis cache hit distribution.

### Audit Logs Module
*   **Purpose:** Security transaction compliance ledger.
*   **Responsibilities:** Immutable write of sensitive actions (role changes, financial revisions, logins).
*   **Dependencies:** `Users`.
*   **Public APIs:** `GET /audit-logs` (Super Admin only).
*   **Database Ownership:** `audit_logs` (Insert only).
*   **Future Scalability:** Move logs to object storage (cold logs) or specialized logging engines.

---

## Part 3: Database Boundaries & Boundaries Strategy

To prevent coupling in the modular monolith, the application database enforces boundaries at the logical software layer:
1.  **Strict Schema Isolation:** No database-level cross-module joins are allowed in standard controller logic. If Module A needs data related to Module B, it must execute a service function to get the target IDs, then map details.
2.  **Access Rules:** Tables in a module's domain can only be queried directly by that module's service files. Other modules query via public interfaces.

```
                    ┌────────────────────────┐
                    │  Modular Monolith API  │
                    └────────┬──────┬────────┘
                             │      │
           ┌─────────────────┘      └─────────────────┐
           ▼                                          ▼
┌──────────────────────┐                   ┌──────────────────────┐
│     Auth Service     │                   │    Course Service    │
└──────────┬───────────┘                   └──────────┬───────────┘
           │ (Direct DB read)                         │ (Direct DB read)
           ▼                                          ▼
┌──────────────────────┐                   ┌──────────────────────┐
│  Auth/User Tables    │ <─── NO JOINS ──> │    Course Tables     │
│ (users, credentials) │                   │  (courses, lessons)  │
└──────────────────────┘                   └──────────────────────┘
```

### Main Entities & Relationships
*   `organizations` (1:N) `users`
*   `users` (1:1) `profiles`
*   `users` (1:N) `enrollments`
*   `users` (1:N) `orders`
*   `courses` (1:N) `sections` (1:N) `lessons`
*   `lessons` (1:1) `quizzes`
*   `lessons` (1:1) `assignments`
*   `courses` (1:N) `enrollments`
*   `orders` (1:N) `order_items`

### Indexes
*   `users(email)` - Unique Index.
*   `courses(slug)` - Unique Index.
*   `courses(status, published_at)` - Composite index for fast search queries.
*   `enrollments(user_id, course_id)` - Composite Unique index to prevent duplicate enrollments.
*   `progress_records(enrollment_id, lesson_id)` - Composite Unique index for progression status checkups.
*   Foreign Key Columns: Indexes on all foreign key columns (e.g., `course_id`, `user_id`) to accelerate standard joins within module limits.

### Soft Delete Strategy
Critical entity tables (e.g., `courses`, `lessons`, `users`) implement soft deletion:
*   A nullable timestamp column `deleted_at` is added.
*   Read queries automatically append `WHERE deleted_at IS NULL` (configured globally via Prisma middleware).
*   Unique indexes include the `deleted_at` field or utilize conditional partial indexes (e.g., `CREATE UNIQUE INDEX users_email_active_idx ON users(email) WHERE deleted_at IS NULL;`) to allow recycling of names/emails if accounts are deleted.

### Audit Fields
All transactional tables contain:
*   `created_at`: Timestamp (Default: Now)
*   `updated_at`: Timestamp (Default: Now, auto-updates on row modifications)
*   `created_by`: UUID (tracks agent origin)
*   `updated_by`: UUID (tracks modifier agent origin)

### Optimistic Locking
To prevent lost updates (e.g., concurrent edits to a course syllabus or stock inventory counts):
*   Add a `version` integer column (Default: 0).
*   Updates query the row matching `id` and `version`.
*   The query increments the version: `UPDATE courses SET title = :title, version = version + 1 WHERE id = :id AND version = :current_version`.
*   If rows affected equals 0, a concurrency error is raised, prompting state rehydration.

### Versioning
*   **Database Migrations:** Managed strictly through sequential SQL files generated by Prisma. Direct database modification is prohibited. Migrations run automatically on server build hooks under isolated environments.

---

## Part 4: Redis Strategy & Schema Design

Redis acts as a low-latency cache, session repository, rate-limiting store, and message bus coordinator.

### Cache Strategy & Key Namespaces
```
Namespace               │ Data Structure │ TTL         │ Purpose
────────────────────────┼────────────────┼─────────────┼───────────────────────────────────
cache:course:<id>       │ String (JSON)  │ 24 Hours    │ Course landing page metadata cache
cache:catalog:page:<n>  │ String (JSON)  │ 1 Hour      │ Cached landing paginated catalog results
session:user:<userId>   │ Hash           │ 7 Days      │ User active session context attributes
rate:ip:<ipAddress>     │ String         │ 1 Minute    │ Rate limiter sliding window counter
otp:verify:<userId>     │ String         │ 10 Minutes  │ Multi-factor authorization codes
reset:token:<userId>    │ String         │ 1 Hour      │ Password reset token validity checks
```

### Session Storage
*   Stores critical user session values (IP address, user agent, permissions cache).
*   On authentication verify checks, the database query is bypassed if the cache contains the active session payload.

### Rate Limiting
*   Utilizes a sliding-window counter algorithm implemented via Redis Lua scripts using sorted sets (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`).
*   Ensures consistent execution even under high concurrent volumes.

### Leaderboard System (Gamification)
*   Uses Sorted Sets (`ZADD`, `ZINCRBY`, `ZREVRANGE`).
*   Tracks student progression rankings based on XP points earned by completing assignments and quizzes.
*   *Key:* `gamification:leaderboard:monthly`.

### OTP & Auth Token Lifecycles
*   Temporary operations write directly to Redis with explicit `SETEX` commands.
*   Upon validation, the key is immediately destroyed via `DEL` to prevent replay exploits.

### BullMQ Integration
*   BullMQ utilizes Redis as a fast FIFO queue engine using Redis lists and hashes.
*   The BullMQ namespace uses key prefixes: `bull:<queue_name>:*`.
*   Requires a Redis instance with persistence (`AOF` enabled) to ensure queued tasks are not lost in the event of a Redis restart.

---

## Part 5: BullMQ Job Architectures

```
                    ┌────────────────────────┐
                    │  Modular Monolith API  │
                    └───────────┬────────────┘
                                │ (Add Job parameters)
                                ▼
                   ┌──────────────────────────┐
                   │    Redis (BullMQ)        │
                   └────────────┬─────────────┘
                                │ (Fetch Job)
                                ▼
                   ┌──────────────────────────┐
                   │    Background Worker     │
                   └────────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│  Email Job   │        │ Video Trans. │        │ Certificate  │
└──────────────┘        └──────────────┘        └──────────────┘
```

### Queue Breakdown

#### 1. Email Queue (`email-queue`)
*   **Job Types:** Welcome emails, password resets, payment invoices.
*   **Throughput Target:** Fast execution (sub-second release from queue).
*   **Worker Strategy:** Scales based on traffic volume. Connects directly to SMTP/Resend API.

#### 2. Notification Queue (`notification-queue`)
*   **Job Types:** Push notifications, Slack alerts, internal messaging system broadcasts.
*   **Worker Strategy:** Batches operations to prevent socket bottlenecks.

#### 3. Certificate Queue (`certificate-queue`)
*   **Job Types:** PDF Generation.
*   **Execution Profile:** Heavy CPU footprint (Puppeteer/PDF generation libraries).
*   **Worker Strategy:** Dedicated workers limited to 1 concurrent task per CPU core to prevent resource exhaustion.

#### 4. Video Processing Queue (`video-processing-queue`)
*   **Job Types:** Transcode raw files into dynamic HLS playlists.
*   **Worker Strategy:** Offloaded to a specialized service (Cloudinary or AWS Elemental MediaConvert). The worker monitors processing states via webhooks or API polling.

#### 5. Thumbnail Queue (`thumbnail-queue`)
*   **Job Types:** Crop uploaded course images into standard asset formats.
*   **Execution Profile:** Medium CPU (uses standard C-sharp binaries or `sharp` package).

#### 6. Analytics Queue (`analytics-queue`)
*   **Job Types:** Aggregate event logs, calculate monthly billing totals, update leaderboard scores.
*   **Worker Strategy:** Scheduled execution (cron jobs) running during low-traffic windows.

#### 7. Cleanup Queue (`cleanup-queue`)
*   **Job Types:** Evict expired soft-deleted records, flush expired static uploads.
*   **Execution Profile:** Scheduled cron execution.

### Retry & Concurrency Control Policies
*   **Default Retries:** 3 attempts.
*   **Backoff Strategy:** Exponential backoff with jitter: `delay = Min(cap, base * 2^attempt) + jitter`.
*   **Concurrency limits:**
    *   `video-processing-queue`: Concurrency = 1 (CPU intensive).
    *   `email-queue`: Concurrency = 20 (Network/I/O bound).

### Dead Letter Queue (DLQ) Strategy
*   Jobs exceeding max retry limitations transition to the `failed` state in Redis.
*   A monitoring listener captures failed job logs and records stack traces to the database audit logging table.
*   Alerting integrations (e.g., Slack, Sentry) notify the operations team.
*   Administrators can replay failed jobs from the Admin Dashboard via standard CLI commands.

---

## Part 6: Security Architecture & Threat Modeling

### STRIDE Threat Model

| Threat | Vulnerability Area | Mitigation Strategy |
| :--- | :--- | :--- |
| **Spoofing** | Invalid User Impersonation | Enforce strict HTTPS, secure flags on HTTP-only cookies, MFA for admins, and cryptographic refresh token rotations. |
| **Tampering** | Parameter Manipulation | Cryptographically sign all parameters, use Zod for strict structural validation, and enforce input sanitization. |
| **Repudiation** | Denying Financial Actions | Maintain immutable, insert-only audit logs with digital signatures for tracking administrators' actions. |
| **Information Disclosure** | Data Leakage | Enforce database encryption at rest, run periodic dependency checks (npm audit), and block generic API stack trace outputs. |
| **Denial of Service** | Resource Exhaustion | Deploy Redis-backed API rate limiters, configure Nginx request buffering, and enforce file upload restrictions at the CDN level. |
| **Elevation of Privilege** | RBAC Vulnerabilities | Enforce strict backend check verification on every endpoint, validate route authorization scopes, and write automated tests for RBAC boundaries. |

### Token Security: JWT Strategy & Refresh Token Rotation
*   **Access Token:** Short-lived JWT (15-minute lifetime), stored in-memory on the client (never in LocalStorage/SessionStorage) to mitigate XSS attacks.
*   **Refresh Token:** Stored in a secure, HTTP-only, SameSite=Strict, Encrypted Cookie with the `/auth/refresh` path scope.
*   **Refresh Token Rotation (RTR):** Each time a refresh token is exchanged, a new pair is issued, and the old refresh token is immediately blacklisted in Redis.
*   **Replay Detection:** If a client requests a token exchange using an already blacklisted refresh token, the server assumes token theft has occurred, invalidates all sessions for that user ID, and logs a security alert.

### Authentication & Authorization Middleware
1.  **Token Processing:** Extract headers and cookies, verify token signatures, and handle expired token errors.
2.  **Schema Check:** Execute `RBACMiddleware(requiredPermissions)` to verify the user has the required roles and permissions.
3.  **Tenant Bound Verification:** Validate that the targeted resource (e.g., a student profile or course syllabus) belongs to the user's organization.

### Comprehensive Input & File Validation
*   **Inputs:** Validated on entry using strict Zod schemas. Any payload containing unexpected fields is immediately rejected before business logic executes.
*   **Files:**
    *   Validate MIME types using magic byte signatures, not file extensions.
    *   Sanitize filenames to prevent path traversal vulnerability vectors (`../../`).
    *   Files are uploaded directly to Cloudflare R2 / AWS S3 using pre-signed URLs to prevent temporary directory exhaustion on the application server.

### Security Configurations
*   **Helmet:** Extensively configures security headers (e.g., Content-Security-Policy (CSP), Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options).
*   **CORS:** Configures explicit origins (wildcard values are forbidden in production) and allows only safe HTTP methods.
*   **CSRF Strategy:**
    *   Session cookies utilize `SameSite=Strict`.
    *   Sensitive mutations (`POST`, `PUT`, `DELETE`) require custom request headers (e.g., `X-Requested-With` or custom headers containing security hashes) to bypass basic form-based CSRF attempts.

### Injection & Cross-Site Scripting (XSS) Protections
*   **SQL Injection:** Prevented by using Prisma ORM parameterized queries. Raw SQL queries are restricted and must use parameterized placeholders.
*   **XSS Protection:** Output sanitization (using DOMPurify on the frontend) blocks HTML injection inside rich text fields.

### Secrets Management
*   Secrets are stored as environment variables.
*   In production, secrets are injected at runtime using cloud managers (e.g., AWS Secrets Manager, Infisical, or Railway Env manager). No production credentials are committed to the codebase.

---

## Part 7: Folder Structure Design

PragyaOS uses a **Monorepo** structure managed with **pnpm Workspaces** and **Turborepo** for build optimization.

```
/pragyaos
├── .github/
│   └── workflows/
│       ├── ci.yml                 # linting, testing, and type checking
│       └── cd.yml                 # automated containerized deployment
├── apps/
│   ├── api/                       # Modular Monolith Backend
│   │   ├── prisma/
│   │   │   ├── schema.prisma      # Centralized database schema
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── config/            # environment variables, DB, Redis config
│   │   │   ├── middlewares/       # auth, validator, rate-limiter logic
│   │   │   ├── modules/           # self-contained domain modules
│   │   │   │   ├── auth/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── schemas/   # zod validators
│   │   │   │   │   └── index.ts   # public interface exports
│   │   │   │   ├── courses/
│   │   │   │   └── payments/
│   │   │   ├── routes.ts          # central routing table
│   │   │   └── app.ts             # Express entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/                       # Frontend SPA (React + Vite)
│       ├── src/
│       │   ├── components/        # presentation layout components
│       │   ├── hooks/             # custom react hooks
│       │   ├── pages/             # routing views
│       │   ├── store/             # Redux toolkit configuration
│       │   └── styles/            # Tailwind base configurations
│       ├── Dockerfile
│       └── package.json
│
├── packages/                      # Shared Code
│   ├── typescript-config/         # base TS configuration patterns
│   ├── eslint-config/             # ESLint base configurations
│   ├── ui/                        # Shared design system components
│   └── types/                     # Shared interface schemas
│
├── docker-compose.yml             # Local developer runtime setup
├── package.json                   # workspace config file
├── pnpm-workspace.yaml            # pnpm packages catalog definition
└── turbo.json                     # Turborepo task settings configuration
```

---

## Part 8: Engineering Standards & Coding Guidelines

### Naming Conventions
*   **Folders:** kebab-case (e.g., `audit-logs`).
*   **TypeScript Files:** camelCase (e.g., `courseService.ts`).
*   **React Component Files:** PascalCase (e.g., `CoursePlayer.tsx`).
*   **Database Tables:** Snake_case (plural) (e.g., `quiz_attempts`).
*   **Environment Variables:** UPPER_SNAKE_CASE (e.g., `REDIS_PASSWORD`).

### REST API Naming Conventions
*   Endpoints must represent resources as plural nouns: `/api/v1/courses`, not `/api/v1/getCourse`.
*   Nest relationships logically: `/api/v1/courses/:courseId/lessons`.
*   HTTP Methods:
    *   `GET` for resource lookup.
    *   `POST` for resource creation.
    *   `PUT` for full resource updates.
    *   `PATCH` for partial resource updates.
    *   `DELETE` for resource deletion.

### Data Transfer Objects (DTO) Strategy
*   Define Zod schemas representing payloads input/output boundaries.
*   DTO validation runs within middleware before controllers execute, ensuring business logic operates on validated data structures.

### Standardized JSON Response Format
API responses use a consistent envelope format:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

If an error is returned:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested course could not be located.",
    "details": []
  }
}
```

### Centralized Error Handling Pattern
*   All controllers are wrapped in a generic async handler wrapper (or use Express 5 native async error routing).
*   Any error thrown in services transitions to a customized `AppError` base class containing HTTP status codes, security flags, and specific classification strings.
*   A global error middleware catches these events, records stack traces via Winston, and translates user-facing responses based on environment settings.

### Logging Strategy
*   Uses **Winston** and **Morgan** for logging.
*   **Levels:** `error` for application crashes/vulnerabilities, `warn` for deprecations/slow paths, `info` for general server cycles.
*   Outputs are formatted as JSON in production for easy ingestion by log aggregators (e.g., Datadog, ELK).

### Git & Branching Strategy
*   Enforce **Conventional Commits** (e.g., `feat(auth): add refresh token rotation`).
*   **Branch Model:** Trunk-based development with short-lived feature branches (`feature/auth-rtr`) merged into `main` via Pull Requests.
*   PR merge conditions: CI checks (linter, tests, build) must pass, and the PR must be approved.

---

## Part 9: Infrastructure Cost Optimization & CDN Analysis

### Storage & CDN Comparisons

| Provider | Storage Cost (per GB) | Bandwidth Cost (per GB) | Pros | Cons |
| :--- | :--- | :--- | :--- | :--- |
| **AWS S3 + CloudFront** | $0.023 | $0.085 | Enterprise security, features, scalability. | Complex configuration, high data transfer costs. |
| **Cloudflare R2** | $0.015 | **$0.000** (Free egress) | Zero egress fees, Cloudflare CDN integration. | Lacks native video transcoding services. |
| **Backblaze B2** | $0.006 | $0.010 | Low storage cost, simple pricing model. | Higher latency, needs separate CDN configuration. |
| **Bunny CDN** | $0.010 | $0.005 | Low cost, simple UI, fast global delivery. | Video pricing billed separately. |
| **Cloudinary** | $0.890 (Credits package) | Billed via credits | Native video transcoding, optimization pipeline. | Expensive at scale. |

### Application & Database Hosting Comparisons

| Platform | Compute (Server) | DB (Managed Postgres) | Pros | Cons |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase** | $25/mo (Pro) | Included | Auth, DB, Realtime, vector out of the box. | Vendor lock-in on custom features. |
| **Neon** | Serverless / API run | Serverless scale pricing | Instant branching, scales down to zero. | Auto-cold starts can cause initial latency spikes. |
| **Render** | $7/mo (Starter) | $15/mo (Starter) | Simple setup, good UI. | Cold starts on free tier, basic networking controls. |
| **Railway** | Usage-based | Usage-based | Fast deployment, developer-friendly. | Costs can scale rapidly with traffic spikes. |

### Optimized Low-Cost Production Stack
*   **App Server:** Run Docker container on a **Railway / Render** starter instance ($7–$15/mo).
*   **Database:** Use **Supabase / Neon** Pro ($25/mo) for managed PostgreSQL.
*   **Storage & CDN:** Use **Cloudflare R2** for file storage to eliminate egress bandwidth fees. Use **Bunny CDN Stream** for secure, low-cost video hosting and transcode operations ($0.01/GB transcoded).
*   **Job Queue Backend:** Use a managed Redis instance (e.g., **Upstash** or Render Redis) ($10/mo).

### Estimated Monthly Costs Analysis

#### Profile 1: 100 Monthly Active Users (Small Start)
*   Compute (Railway Developer Tier): $5.00
*   Database (Supabase Free/Neon Serverless): $0.00 (under free tiers limits)
*   Storage (Cloudflare R2 - 20GB): $0.00 (under 10GB free cap + minor usage)
*   Video Delivery (Bunny Stream - 50GB egress): $0.50
*   Redis / BullMQ (Upstash Serverless): $0.00
*   **Total Estimated: ~$5.50 / month**

#### Profile 2: 1,000 Monthly Active Users (Growing Product)
*   Compute (Railway Starter / Render Web Service): $7.00
*   Database (Supabase Pro / Neon Pro): $25.00
*   Storage (Cloudflare R2 - 100GB): $1.35 (Free egress)
*   Video Delivery (Bunny Stream - 500GB egress): $5.00
*   Redis / BullMQ (Render Redis / Upstash Pro): $10.00
*   **Total Estimated: ~$48.35 / month**

#### Profile 3: 10,000 Monthly Active Users (Scaling SaaS Platform)
*   Compute (Render Instances - 2 nodes with load balancer): $30.00
*   Database (Neon / Supabase Scale Tier): $60.00
*   Storage (Cloudflare R2 - 1TB): $14.85
*   Video Delivery (Bunny Stream - 5TB egress): $50.00
*   Redis / BullMQ (Render Redis Production): $20.00
*   Transactional Mail (Resend Premium): $20.00
*   **Total Estimated: ~$194.85 / month**

---

## Part 10: Top 25 Engineering Decisions

### 1. Monorepo vs. Polyrepo
*   **Problem:** Code duplication, version conflicts, and difficult dependency management across front-end/back-end repositories.
*   **Chosen Solution:** Monorepo using **pnpm Workspaces** and **Turborepo**.
*   **Alternative:** Separate repositories (Polyrepo).
*   **Reason:** Simplifies code sharing (e.g., sharing type definitions between frontend and backend), provides a unified build pipeline via Turborepo, and reduces setup time for developers.
*   **Trade-offs:** Can lead to larger repository size, and requires configuring build pipelines to prevent unnecessary builds of unaffected applications.

### 2. Framework Choice: Node.js/Express vs. NestJS
*   **Problem:** Choose a backend framework that balances structure with development speed.
*   **Chosen Solution:** **Express** organized in strict modular domains.
*   **Alternative:** NestJS.
*   **Reason:** Express is lightweight, has a low learning curve, and allows the architecture team to implement custom, lightweight encapsulation patterns without the decorators, dependency-injection overhead, and NestJS-specific paradigms.
*   **Trade-offs:** Relies on the development team to enforce coding standards, as Express lacks NestJS's opinionated, out-of-the-box structure.

### 3. Database Selection: PostgreSQL vs. MongoDB
*   **Problem:** Select a database that balances data integrity, relationship modeling, and query flexibility.
*   **Chosen Solution:** **PostgreSQL**.
*   **Alternative:** MongoDB.
*   **Reason:** Financial ledgers, course enrollments, and user roles require strict relational constraints, transactional guarantees (ACID), and robust foreign-key integrity.
*   **Trade-offs:** Requires schema migrations when updating structures, which can be slower than schema-less databases during early prototyping.

### 4. ORM Tooling: Prisma vs. TypeORM vs. Kysely
*   **Problem:** Choose a database interface that provides type-safety without introducing performance bottlenecks.
*   **Chosen Solution:** **Prisma ORM**.
*   **Alternative:** TypeORM or Kysely.
*   **Reason:** Prisma provides automated migration generation and type-safety by auto-generating TS types from the database schema.
*   **Trade-offs:** Prisma can run slower for large batch inserts and complex queries, which we mitigate by falling back to raw SQL queries for performance-critical aggregation paths.

### 5. Caching Layer: Redis Cache vs. In-Memory Node Cache
*   **Problem:** Cache query results without consuming server memory.
*   **Chosen Solution:** **Redis**.
*   **Alternative:** In-memory Node caches (e.g., node-cache).
*   **Reason:** In-memory caches are tied to specific server processes. If we scale to multiple instances, their caches become inconsistent. Redis runs as an independent, centralized store.
*   **Trade-offs:** Adds infrastructure dependency and introduces latency from network roundtrips between the app server and Redis.

### 6. Authentication Storage: LocalStorage vs. Cookies for Tokens
*   **Problem:** Store authentication tokens securely without exposing them to XSS or CSRF exploits.
*   **Chosen Solution:** **Secure, HTTP-only, SameSite=Strict Cookie** for Refresh Tokens and **In-Memory** for Access Tokens.
*   **Alternative:** Storing both tokens in client LocalStorage.
*   **Reason:** LocalStorage is accessible to any script running on the page, making tokens vulnerable to theft via Cross-Site Scripting (XSS).
*   **Trade-offs:** Cookie-based authentication requires configuring CORS and SameSite attributes correctly, and introduces potential CSRF vulnerabilities if not mitigated.

### 7. File Delivery: Cloudflare R2 vs. AWS S3
*   **Problem:** Host assets (PDFs, images) without incurring high bandwidth egress charges.
*   **Chosen Solution:** **Cloudflare R2**.
*   **Alternative:** AWS S3.
*   **Reason:** Cloudflare R2 does not charge egress bandwidth fees. Since learners download large assets (handouts, manuals), R2 offers significant cost savings.
*   **Trade-offs:** R2 lacks the rich feature set, access control policies, and deep integrations of AWS S3.

### 8. Queue Management: BullMQ vs. RabbitMQ
*   **Problem:** Process background tasks asynchronously without adding heavy middleware dependencies.
*   **Chosen Solution:** **BullMQ** running on Redis.
*   **Alternative:** RabbitMQ or Apache Kafka.
*   **Reason:** BullMQ is built on Redis, which we already use for caching. This avoids the cost of provisioning and maintaining a separate message broker like RabbitMQ.
*   **Trade-offs:** Redis queues are memory-bound. If workers fall behind, high job volumes can consume Redis memory and affect caching performance.

### 9. Validation Strategy: Zod vs. class-validator
*   **Problem:** Validate request payloads at runtime.
*   **Chosen Solution:** **Zod**.
*   **Alternative:** class-validator.
*   **Reason:** Zod works directly with TypeScript schemas, allowing us to generate types from validation schemas. It does not rely on experimental decorators.
*   **Trade-offs:** Zod schemas are defined at runtime, which can require more boilerplate than decorator-based validations.

### 10. Frontend Build Tool: Vite vs. Create React App (CRA)
*   **Problem:** Optimize frontend build times and developer experience.
*   **Chosen Solution:** **Vite**.
*   **Alternative:** Webpack / Create React App.
*   **Reason:** Vite uses native ES modules to compile code on-demand during development, leading to faster startup and Hot Module Replacement (HMR) times.
*   **Trade-offs:** Vite requires minor configuration changes when using older CommonJS dependencies.

### 11. Global State Management: Redux Toolkit (RTK) vs. Context API
*   **Problem:** Manage global client state (e.g., auth, settings) across the application.
*   **Chosen Solution:** **Redux Toolkit (RTK)**.
*   **Alternative:** React Context API.
*   **Reason:** Context API triggers re-renders of all child components whenever state changes, which can impact performance. RTK uses selectors to limit re-renders to target components.
*   **Trade-offs:** RTK adds boilerplate code and increases the bundle size.

### 12. Client-Server Sync: TanStack Query (React Query) vs. Redux Thunk
*   **Problem:** Fetch and cache server data on the frontend without writing redundant code.
*   **Chosen Solution:** **TanStack Query**.
*   **Alternative:** Redux Thunks and custom fetching logic.
*   **Reason:** TanStack Query abstracts caching, background updates, request deduplication, and loading states out of the box.
*   **Trade-offs:** Introduces another library dependency and requires managing cache invalidation logic on the frontend.

### 13. UI Components: Tailwind CSS vs. Component Libraries (MUI/Chakra)
*   **Problem:** Build a premium, custom UI without bloating bundle sizes.
*   **Chosen Solution:** **Tailwind CSS**.
*   **Alternative:** Material UI (MUI) or Chakra UI.
*   **Reason:** Tailwind compiles CSS to class utilities, reducing bundle sizes. It provides complete styling control, avoiding the need to override component library styles.
*   **Trade-offs:** Tailwind requires styling components from scratch, which can slow down early UI development compared to pre-built libraries.

### 14. Soft Delete vs. Hard Delete
*   **Problem:** Safely remove data without breaking database relationships.
*   **Chosen Solution:** **Soft Delete** using a `deleted_at` timestamp.
*   **Alternative:** Hard deleting rows from the database.
*   **Reason:** Prevents accidental data loss and allows instructors to recover deleted courses or sections.
*   **Trade-offs:** Increases database storage requirements and requires appending filters (e.g., `WHERE deleted_at IS NULL`) to read queries.

### 15. Server Deployment: Dockerized Containers vs. Bare Metal
*   **Problem:** Deploy applications consistently across development, staging, and production environments.
*   **Chosen Solution:** **Docker Containers**.
*   **Alternative:** Bare metal/Server-specific deployments.
*   **Reason:** Docker packages the application with its dependencies, ensuring consistent behavior across different environments.
*   **Trade-offs:** Adds a containerization layer that can introduce minor resource overhead.

### 16. Security Header Delivery: Helmet vs. Reverse Proxy Configuration
*   **Problem:** Set security headers (CSP, XSS protection) consistently.
*   **Chosen Solution:** **Helmet** in Express.
*   **Alternative:** Configuring headers in Nginx or CDN.
*   **Reason:** Managing security headers in the application code keeps them under version control and ensures they remain intact if we migrate to other hosts.
*   **Trade-offs:** Express middleware execution adds minor processing latency compared to Nginx-level routing.

### 17. Video Streaming: HLS vs. MP4
*   **Problem:** Deliver video content smoothly across devices and network conditions.
*   **Chosen Solution:** **HTTP Live Streaming (HLS)**.
*   **Alternative:** Delivering raw MP4 files.
*   **Reason:** HLS splits videos into small chunks and uses adaptive bitrate streaming to adjust quality based on the user's connection, preventing buffering.
*   **Trade-offs:** Requires an asynchronous transcoding step when videos are uploaded.

### 18. Payment Integration Webhooks vs. API Polling
*   **Problem:** Update order status reliably after checkout.
*   **Chosen Solution:** **Webhooks**.
*   **Alternative:** API Polling from the client or server.
*   **Reason:** Webhooks are event-driven, reducing network traffic and ensuring order status updates execute even if the student closes their browser.
*   **Trade-offs:** Webhooks require signature verification to prevent spoofing and require configuring retry logic for network drops.

### 19. Search Engine: PostgreSQL FTS vs. Elasticsearch
*   **Problem:** Implement search functionality for the course catalog.
*   **Chosen Solution:** **PostgreSQL Full-Text Search (FTS)**.
*   **Alternative:** Elasticsearch.
*   **Reason:** PostgreSQL FTS is built-in and sufficient for early-stage catalog searches. This avoids the cost of maintaining a separate Elasticsearch cluster.
*   **Trade-offs:** PostgreSQL FTS is less performant and lacks the advanced features (e.g., typo tolerance, synonyms) of Elasticsearch.

### 20. Database Tenant Isolation: Logical vs. Physical
*   **Problem:** Isolate tenant data for future B2B organization portals.
*   **Chosen Solution:** **Logical Isolation** using `tenant_id` columns.
*   **Alternative:** Physical isolation using separate databases per tenant.
*   **Reason:** Logical isolation is cheaper to maintain and easier to update, as all tenants share a database schema and connection pool.
*   **Trade-offs:** A programming bug could leak data across tenants, requiring strict access control verification at the application layer.

### 21. Real-Time Telemetry: SSE vs. WebSockets
*   **Problem:** Send real-time updates (e.g., notifications) to the client.
*   **Chosen Solution:** **Server-Sent Events (SSE)**.
*   **Alternative:** WebSockets.
*   **Reason:** SSE operates over standard HTTP, supports reconnection out of the box, and is sufficient for unidirectional updates from server to client.
*   **Trade-offs:** SSE is unidirectional; if we add real-time collaborative features, we will need to integrate WebSockets.

### 22. Logger: Winston vs. Console Logs
*   **Problem:** Log application events and errors systematically.
*   **Chosen Solution:** **Winston**.
*   **Alternative:** Standard `console.log`.
*   **Reason:** Winston allows us to define log levels, write logs to different transports (console, files), and output logs as JSON for ingestion by log analysis tools.
*   **Trade-offs:** Requires setup configuration, adding minor code complexity.

### 23. Transaction Strategy: Unit of Work vs. Individual Queries
*   **Problem:** Ensure multiple database operations succeed or fail together.
*   **Chosen Solution:** **Database Transactions** (via Prisma `$transaction`).
*   **Alternative:** Handling rollback logic manually in application code.
*   **Reason:** Prisma transactions use the database's native transaction engine, ensuring data consistency on failure.
*   **Trade-offs:** Long-running transactions can block database resources, requiring us to keep transaction scopes small.

### 24. Image Processing: sharp vs. Cloudinary
*   **Problem:** Resize and optimize course images.
*   **Chosen Solution:** **sharp** in background workers.
*   **Alternative:** Cloudinary Image Transformation.
*   **Reason:** Running the `sharp` library in our background workers is free, whereas Cloudinary transformations consume credits that scale in cost.
*   **Trade-offs:** Consumes compute resources on our workers, and requires managing image storage paths in Cloudflare R2 manually.

### 25. Error Tracking: Sentry vs. Self-hosted Logs
*   **Problem:** Monitor production errors in real-time.
*   **Chosen Solution:** **Sentry**.
*   **Alternative:** Parsing server log files manually.
*   **Reason:** Sentry aggregates errors, groups duplicates, captures stack traces, and alerts the development team, reducing debugging time.
*   **Trade-offs:** Adds a third-party dependency, and requires configuring source maps for frontend error resolution.
