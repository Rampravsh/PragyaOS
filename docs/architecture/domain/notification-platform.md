# Notification & Communication Platform

## Architecture Overview

```
Domain Event
    │
    ▼
NotificationEventConsumer
    │  (maps event → templateSlug + variables)
    ▼
NotificationDispatcher
    │  1. Compute dedupeKey → skip if duplicate
    │  2. Check user preferences (bypass for SECURITY/PAYMENT)
    │  3. Resolve + render template (with cache)
    │  4. Persist Notification (status: QUEUED)
    │  5. Push job to channel queue
    │  6. Create NotificationDelivery audit record
    ▼
BullMQ Queue (per channel)
    │
    ▼
Channel Worker
    │  1. Check scheduledAt (delay if future)
    │  2. Deliver (DB write / mail send / push stub)
    │  3. Update Notification.status → DELIVERED
    │  4. Update NotificationDelivery.providerStatus
```

## Queue Architecture

| Channel | Queue Name | Worker | Active in 17A |
|---|---|---|---|
| IN_APP | `notification-inapp-queue` | `NotificationInAppWorker` | ✅ Yes |
| EMAIL | `mail-queue` (existing) | `MailWorker` (existing) | ✅ Yes |
| PUSH | `notification-push-queue` | stub (not implemented) | ❌ Later |
| SMS | `notification-sms-queue` | stub (not implemented) | ❌ Later |

All queues use: `attempts: 3`, `backoff: exponential 5s`.

## Template Resolution

1. Dispatcher receives `{ templateSlug, channel, locale }`.
2. Check in-memory cache: `Map<"slug:channel:locale", template>`.
3. On miss: query DB for latest active version matching `(slug, channel, locale)`.
4. Cache result; render with `NotificationRenderer`.
5. If template slug is not found, log a warning and skip delivery (fail-safe).

## Template Rendering

- Mustache-style `{{variable}}` placeholder replacement.
- Variables array in template is validated against provided context — missing required variables log a warning.
- Locale fallback: if `locale` template not found, fall back to `en`.

## User Preference Resolution

```
User requests notification
    │
    ▼
Is category SECURITY or PAYMENT?
    │  YES → Deliver always (bypass preferences)
    │  NO  ↓
    ▼
Check NotificationPreference.categoryPreferences[category]
    │  disabled? → Skip
    │  enabled?  ↓
    ▼
Check NotificationPreference.channelPreferences[channel]
    │  disabled? → Skip
    │  enabled?  → Dispatch
```

Default (no preference record): all channels enabled, all categories enabled.

## Deduplication

`dedupeKey = SHA-256(userId + ":" + eventId + ":" + templateSlug)`

If a `Notification` record with the same `dedupeKey` already exists, the dispatcher skips creation and logs an info message. This handles BullMQ retry storms and exactly-once delivery semantics for critical events.

## Retry Strategy

All queues: `attempts: 3`, exponential backoff starting at `5000ms`. After exhausting retries, `NotificationDelivery.failureReason` is set and the job is preserved in the failed state for admin inspection.

## Scheduled Notifications

`scheduledAt` is stored at dispatch time. Workers respect it:
- If `scheduledAt` is in the future, the job is deferred using BullMQ `delay` option.
- Full cron-based scheduling (recurring digests etc.) is a later milestone.

## REST API

| Endpoint | Method | Description |
|---|---|---|
| `/notifications` | GET | Paginated list of user notifications |
| `/notifications/unread-count` | GET | Count of unread notifications |
| `/notifications/:id/read` | PATCH | Mark single notification read |
| `/notifications/read-all` | PATCH | Mark all notifications read |
| `/notifications/preferences` | GET | Get user preferences |
| `/notifications/preferences` | PATCH | Update user preferences |

## Future Provider Integration

The `InAppPublisher` interface means adding WebSocket delivery requires:
1. Implement `WebSocketInAppPublisher implements InAppPublisher`
2. Inject into `NotificationDispatcher` constructor
3. No changes to dispatcher logic, consumer, or routes
