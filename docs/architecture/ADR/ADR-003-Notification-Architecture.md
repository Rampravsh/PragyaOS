# ADR-003: Notification & Communication Architecture

## Status
Approved

## Context
PragyaOS requires a centralized notification system that delivers in-app, email, push, and SMS notifications from domain events. The platform must support user preferences, template-driven rendering, deduplication, and future multi-channel expansion without architectural changes.

## Decisions

### 1. Event-Driven Only — No Controller-Triggered Notifications
All notifications originate exclusively from domain events. Controllers never call the dispatcher directly. The `NotificationEventConsumer` subscribes to existing EventEmitter instances from Auth, Commerce, Fulfillment, and Credentials domains at bootstrap, mapping events to template slugs and dispatching via `NotificationDispatcher`.

**Rationale**: Decouples notification logic from business logic. Adding a new notification requires only a new template record and an event mapping, not code changes in other modules.

### 2. Database-Backed Versioned Templates
Templates are stored in `notification_templates` with a `(slug, channel, locale, version)` composite unique key. New template versions are insert-only — existing records are never updated.

**Rationale**: Historical notifications can trace the exact template version used at the time of dispatch. Locale support is built in from day one.

### 3. Uncancellable Categories
`SECURITY` and `PAYMENT` categories bypass user preferences and are always delivered. Enforced inside `NotificationDispatcher.isChannelEnabled()` before checking the `NotificationPreference` record.

### 4. Deduplication via `dedupeKey`
Each notification carries a `dedupeKey = SHA-256(userId + eventId + templateSlug)`. Before persisting, the dispatcher checks for an existing record with that key. Duplicate events (from BullMQ retries) produce at most one notification per user per event.

### 5. Template Caching
The renderer uses an in-memory `Map<string, NotificationTemplate>` LRU-style cache keyed by `slug:channel:locale`. Cache is invalidated on any template update. This eliminates repeated DB roundtrips for high-frequency events like enrollment or payment confirmations.

### 6. InAppPublisher Abstraction
The dispatcher calls `InAppPublisher.publish(notification)` rather than updating the database directly. The default implementation writes the `DELIVERED` status to the DB. Future milestones can swap in a WebSocket or SSE implementation without touching the dispatcher.

### 7. Pluggable Channel Architecture
Each channel is delivered through an isolated path:
- `IN_APP` → `notification-inapp-queue` → `NotificationInAppWorker`
- `EMAIL` → existing `mailQueue` + `MailWorker`
- `PUSH` / `SMS` → stub queues (workers not yet implemented)

### 8. ScheduledAt Support
The `scheduledAt` field is persisted from the dispatch context. Workers check `scheduledAt` before marking delivered — if in the future, the job is delayed. Full cron-based scheduling is deferred to a later milestone.

## Consequences
- **Positive**: Zero coupling between notification logic and business domains. All-new notification types require only DB records + one event mapping.
- **Negative**: First delivery requires at least one BullMQ round-trip (acceptable latency for in-app notifications).
