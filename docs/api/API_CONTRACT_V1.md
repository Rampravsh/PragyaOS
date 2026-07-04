# PragyaOS LXP API Contract (v1.0)

This document serves as the official API contract for frontend integration. All HTTP endpoints return JSON payloads wrapped inside standard envelopes. All requests requiring authorization must pass the `Authorization: Bearer <JWT>` header.

## Standard Success Envelope

```json
{
  "success": true,
  "message": "Operation successful.",
  "data": {}
}
```

## Endpoints Index

| Method | Path | Summary | Tags | Security |
|---|---|---|---|---|
| `GET` | `/health` | Verify application health status |  | None |
| `GET` | `/live` | Verify application runtime liveness (K8s Probe Exception - raw response required) |  | None |
| `GET` | `/ready` | Verify application readiness to consume requests (K8s Probe Exception - raw response required) |  | None |
| `GET` | `/users/me` | Retrieve current authenticated user profile | Users | Bearer JWT |
| `PATCH` | `/users/me` | Update profile details for the authenticated user | Users | Bearer JWT |
| `PATCH` | `/users/me/avatar` | Update avatar image link for the authenticated user | Users | Bearer JWT |
| `PATCH` | `/users/me/preferences` | Update theme, privacy, or notification preferences | Users | Bearer JWT |
| `POST` | `/users/me/password` | Change user password and terminate other active sessions | Users | Bearer JWT |
| `GET` | `/users/me/sessions` | List active devices and login session timestamps | Users | Bearer JWT |
| `DELETE` | `/users/me/sessions` | Terminate all other sessions except the current active one | Users | Bearer JWT |
| `DELETE` | `/users/me/sessions/{sessionId}` | Terminate a specific session device by ID | Users | Bearer JWT |
| `POST` | `/users/me/deactivate` | Self-deactivate authenticated user account | Users | Bearer JWT |
| `GET` | `/users/me/audit-logs` | Fetch user-specific audit history logs | Users | Bearer JWT |
| `GET` | `/users/{id}` | Retrieve profile details of a user by ID | Users | Bearer JWT |
| `DELETE` | `/users/{id}` | Soft delete target user account | Users | Bearer JWT |
| `POST` | `/users/{id}/reactivate` | Reactivate a deactivated user profile | Users | Bearer JWT |
| `GET` | `/search` | Search for courses with text queries and filter facets | Search | None |
| `GET` | `/search/suggestions` | Retrieve query auto-suggestions | Search | None |
| `GET` | `/search/popular` | Get popular searches list | Search | None |
| `GET` | `/search/health` | Retrieve search backend health and queue status | Search | Bearer JWT |
| `POST` | `/search/reindex` | Enqueue manual indexing task for a specific entity | Search | Bearer JWT |
| `POST` | `/search/reindex/all` | Trigger full indexing rebuild across all entities | Search | Bearer JWT |
| `GET` | `/notifications` | Retrieve the authenticated user's notifications (paginated) | Notifications | Bearer JWT |
| `GET` | `/notifications/unread-count` | Get count of unread notifications for the authenticated user | Notifications | Bearer JWT |
| `GET` | `/notifications/preferences` | Get notification preferences for the authenticated user | Notifications | Bearer JWT |
| `PATCH` | `/notifications/preferences` | Update notification preferences for the authenticated user | Notifications | Bearer JWT |
| `PATCH` | `/notifications/read-all` | Mark all notifications as read for the authenticated user | Notifications | Bearer JWT |
| `PATCH` | `/notifications/{id}/read` | Mark a single notification as read | Notifications | Bearer JWT |
| `POST` | `/media/uploads/url` | Request a presigned S3 upload URL for direct-to-cloud upload | Media | Bearer JWT |
| `POST` | `/media/{id}/confirm` | Confirm single file upload completeness and queue background processors | Media | Bearer JWT |
| `POST` | `/media/multipart/initiate` | Initiate a multipart upload session for large files | Media | Bearer JWT |
| `POST` | `/media/{id}/multipart/part` | Generate a presigned URL to upload a specific part of a multipart session | Media | Bearer JWT |
| `POST` | `/media/{id}/multipart/complete` | Complete a multipart upload session by assembling parts | Media | Bearer JWT |
| `GET` | `/media/{id}/download` | Get a presigned download URL for private files | Media | Bearer JWT |
| `DELETE` | `/media/{id}` | Delete a media file from Cloudflare R2 and database (status set to DELETED) | Media | Bearer JWT |
| `POST` | `/learning-units/modules/{moduleId}/units` | Create a learning unit under a module | Learning Units | Bearer JWT |
| `PATCH` | `/learning-units/modules/{moduleId}/units/{id}` | Update a learning unit (and optionally shift modules) | Learning Units | Bearer JWT |
| `DELETE` | `/learning-units/modules/:moduleId/units/{id}` | Delete a learning unit | Learning Units | Bearer JWT |
| `POST` | `/learning-units/modules/{moduleId}/units/reorder` | Bulk reorder learning units in a module | Learning Units | Bearer JWT |
| `POST` | `/learning-units/modules/{moduleId}/units/{unitId}/resources` | Attach a resource/file to a learning unit | Learning Unit Resources | Bearer JWT |
| `DELETE` | `/learning-units/modules/{moduleId}/units/{unitId}/resources/{resourceId}` | Delete/detach a resource from a learning unit | Learning Unit Resources | Bearer JWT |
| `POST` | `/learning-engine/enroll` | Enroll a student in a course | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/enrollments/{id}/suspend` | Suspend an active enrollment | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/enrollments/{id}/resume` | Resume a suspended or cancelled enrollment | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/enrollments/{id}/cancel` | Cancel an enrollment | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/enrollments/{id}/progress` | Update progress on a specific learning unit | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/enrollments/{id}/sessions/start` | Start a new learning session | Learning Engine | Bearer JWT |
| `POST` | `/learning-engine/sessions/{sessionId}/end` | Complete/end an active learning session | Learning Engine | Bearer JWT |
| `GET` | `/learning-engine/enrollments/{id}/continue` | Get recommend next unit and last learning checkpoints | Learning Engine | Bearer JWT |
| `GET` | `/learning-engine/enrollments/{id}/completion` | Get course completion stats and certificate eligibility flags | Learning Engine | Bearer JWT |
| `GET` | `/learning-engine/enrollments/{id}/timeline` | Query the student's audit event timeline | Learning Engine | Bearer JWT |
| `GET` | `/instructor-studio/dashboard` | Retrieve the instructor dashboard overview | Instructor Studio | Bearer JWT |
| `GET` | `/instructor-studio/courses/{courseId}/checklist` | Get publishing readiness checklist report for a course | Instructor Studio | Bearer JWT |
| `GET` | `/instructor-studio/courses/{courseId}/health` | Get quality health score and recommendations for a course | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/review` | Submit a course for draft review | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/publish` | Publish a course (In Review -> Published). Requires Admin/Reviewer role. | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/unpublish` | Unpublish a course (Published -> Draft) | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/archive` | Archive a course | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/restore` | Restore an archived course back to draft status | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/preview-token` | Generate a secure, short-lived preview token | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/duplicate` | Duplicate a course and its entire modules structure | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/modules/{moduleId}/duplicate` | Duplicate a curriculum module | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/duplicate` | Duplicate a learning unit | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/modules/{moduleId}/move` | Move a module's sequential position index | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/move` | Move a learning unit to a different module or sequence index | Instructor Studio | Bearer JWT |
| `POST` | `/instructor-studio/courses/{courseId}/curriculum/reorder` | Bulk reorder curriculum sequence indices in a transaction | Instructor Studio | Bearer JWT |
| `POST` | `/credentials/templates` | Register a new certificate template | Credentials | Bearer JWT |
| `PATCH` | `/credentials/templates/{id}` | Update a certificate template (layout changes blocked once credentials issued) | Credentials | Bearer JWT |
| `POST` | `/credentials/issue` | Issue a credential certificate to a student | Credentials | Bearer JWT |
| `POST` | `/credentials/verify` | Verify a credential using its verification token (public endpoint) | Credentials | None |
| `POST` | `/credentials/revoke` | Revoke an issued credential | Credentials | Bearer JWT |
| `GET` | `/credentials/my` | Retrieve all credentials issued to the authenticated user | Credentials | Bearer JWT |
| `GET` | `/courses` | Retrieve a paginated and filtered catalog of courses | Courses | None |
| `POST` | `/courses` | Create a new course (Instructor/Admin restricted) | Courses | Bearer JWT |
| `GET` | `/courses/{id}` | Retrieve details of a single course by ID | Courses | None |
| `PATCH` | `/courses/{id}` | Update course details (requires ownership/admin) | Courses | Bearer JWT |
| `DELETE` | `/courses/{id}` | Archive a course (soft delete) | Courses | Bearer JWT |
| `GET` | `/courses/slug/{slug}` | Retrieve details of a single course by URL slug | Courses | None |
| `POST` | `/courses/{courseId}/modules` | Create a course module | Course Modules | Bearer JWT |
| `PATCH` | `/courses/{courseId}/modules/{moduleId}` | Update course module details | Course Modules | Bearer JWT |
| `DELETE` | `/courses/{courseId}/modules/{moduleId}` | Delete a course module | Course Modules | Bearer JWT |
| `POST` | `/courses/{courseId}/modules/reorder` | Bulk reorder modules in a course | Course Modules | Bearer JWT |
| `POST` | `/payments/checkout` | Initiate a course purchase checkout session | Payments | Bearer JWT |
| `POST` | `/payments/webhook` | Receive verified payment webhook payloads from Razorpay | Payments | None |
| `GET` | `/categories` | Retrieve categories formatted as a recursive tree node hierarchy | Categories | None |
| `POST` | `/categories` | Create a new category | Categories | Bearer JWT |
| `GET` | `/categories/{id}` | Retrieve details of a single category by ID | Categories | None |
| `PATCH` | `/categories/{id}` | Update category details | Categories | Bearer JWT |
| `DELETE` | `/categories/{id}` | Delete a category (restricted by child counts) | Categories | Bearer JWT |
| `POST` | `/auth/register` | Register a new student account | Authentication | None |
| `POST` | `/auth/login` | Sign in with credentials | Authentication | None |
| `POST` | `/auth/refresh` | Rotate refresh session tokens | Authentication | None |
| `POST` | `/auth/logout` | Terminate current session | Authentication | None |
| `POST` | `/auth/logout-all` | Invalidate all sessions | Authentication | Bearer JWT |
| `POST` | `/auth/forgot-password` | Request password reset link | Authentication | None |
| `POST` | `/auth/reset-password` | Reset password with token | Authentication | None |
| `GET` | `/auth/verify-email` | Confirm account email address | Authentication | None |

---

## Endpoints Specification

### GET `/health`

**Summary**: Verify application health status

**Tags**: `N/A`

**Security**: 🔓 Public Access

#### Responses

- **200**: Application is healthy

---

### GET `/live`

**Summary**: Verify application runtime liveness (K8s Probe Exception - raw response required)

**Tags**: `N/A`

**Security**: 🔓 Public Access

#### Responses

- **200**: Application is alive

---

### GET `/ready`

**Summary**: Verify application readiness to consume requests (K8s Probe Exception - raw response required)

**Tags**: `N/A`

**Security**: 🔓 Public Access

#### Responses

- **200**: Application is ready

---

### GET `/users/me`

**Summary**: Retrieve current authenticated user profile

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Profile retrieved successfully.
- **401**: Authentication token missing or expired.
- **404**: User profile not found.

---

### PATCH `/users/me`

**Summary**: Update profile details for the authenticated user

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "maxLength": 100
    },
    "lastName": {
      "type": "string",
      "maxLength": 100
    },
    "displayName": {
      "type": "string",
      "maxLength": 100
    },
    "bio": {
      "type": "string",
      "maxLength": 1000
    },
    "timezone": {
      "type": "string",
      "maxLength": 100
    },
    "language": {
      "type": "string",
      "enum": [
        "en",
        "es",
        "fr",
        "de",
        "hi"
      ]
    }
  }
}
```

#### Responses

- **200**: Profile updated successfully.
- **400**: Input validation schemas failed.
- **401**: Authentication token missing or expired.

---

### PATCH `/users/me/avatar`

**Summary**: Update avatar image link for the authenticated user

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "avatarUrl"
  ],
  "properties": {
    "avatarUrl": {
      "type": "string",
      "format": "uri",
      "maxLength": 512
    }
  }
}
```

#### Responses

- **200**: Avatar updated successfully.
- **400**: Invalid avatar URL link format.
- **401**: Authentication token missing or expired.

---

### PATCH `/users/me/preferences`

**Summary**: Update theme, privacy, or notification preferences

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "theme": {
      "type": "string",
      "enum": [
        "LIGHT",
        "DARK",
        "SYSTEM"
      ]
    },
    "emailPreference": {
      "type": "boolean"
    },
    "notificationPreference": {
      "type": "boolean"
    },
    "marketingPreference": {
      "type": "boolean"
    },
    "privacyPreference": {
      "type": "string",
      "enum": [
        "public",
        "private"
      ]
    }
  }
}
```

#### Responses

- **200**: Settings preferences updated successfully.
- **400**: Schema validation constraints failed.
- **401**: Authentication token missing or expired.

---

### POST `/users/me/password`

**Summary**: Change user password and terminate other active sessions

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "currentPassword",
    "newPassword"
  ],
  "properties": {
    "currentPassword": {
      "type": "string"
    },
    "newPassword": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Password altered. Other active devices logged out.
- **400**: New password constraints failed.
- **401**: Current password mismatch or token expired.

---

### GET `/users/me/sessions`

**Summary**: List active devices and login session timestamps

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: List of active sessions retrieved successfully.
- **401**: Authentication token missing or expired.

---

### DELETE `/users/me/sessions`

**Summary**: Terminate all other sessions except the current active one

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Terminated other devices.
- **401**: Authentication token missing or expired.

---

### DELETE `/users/me/sessions/{sessionId}`

**Summary**: Terminate a specific session device by ID

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `sessionId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Session terminated successfully.
- **404**: Session not found.

---

### POST `/users/me/deactivate`

**Summary**: Self-deactivate authenticated user account

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Profile deactivated. All active devices logged out.
- **403**: Operation forbidden (e.g. attempting to deactivate Super Admin).

---

### GET `/users/me/audit-logs`

**Summary**: Fetch user-specific audit history logs

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `page` | `query` | `No` | `integer` |  |
| `limit` | `query` | `No` | `integer` |  |
| `action` | `query` | `No` | `string` |  |

#### Responses

- **200**: Audit logs returned.
- **401**: Authentication token missing or expired.

---

### GET `/users/{id}`

**Summary**: Retrieve profile details of a user by ID

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: User profile retrieved.
- **403**: Horizontal privilege escalation check failed.
- **404**: Profile not found.

---

### DELETE `/users/{id}`

**Summary**: Soft delete target user account

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Account soft-deleted successfully.
- **403**: Deletion of Super Admin is prohibited or permissions are missing.
- **404**: Target profile not found.

---

### POST `/users/{id}/reactivate`

**Summary**: Reactivate a deactivated user profile

**Tags**: `Users`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Profile reactivated successfully.
- **403**: Admin/Super Admin permission required.
- **404**: Target profile not found.

---

### GET `/search`

**Summary**: Search for courses with text queries and filter facets

**Tags**: `Search`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `q` | `query` | `No` | `string` |  |
| `page` | `query` | `No` | `integer` |  |
| `limit` | `query` | `No` | `integer` |  |
| `category` | `query` | `No` | `string` |  |
| `difficulty` | `query` | `No` | `string` |  |
| `language` | `query` | `No` | `string` |  |
| `tags` | `query` | `No` | `string` |  |
| `sort` | `query` | `No` | `string` |  |

#### Responses

- **200**: Search executed successfully.

---

### GET `/search/suggestions`

**Summary**: Retrieve query auto-suggestions

**Tags**: `Search`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `q` | `query` | `Yes` | `string` |  |
| `limit` | `query` | `No` | `integer` |  |
| `index` | `query` | `No` | `string` |  |

#### Responses

- **200**: Suggestions retrieved successfully.

---

### GET `/search/popular`

**Summary**: Get popular searches list

**Tags**: `Search`

**Security**: 🔓 Public Access

#### Responses

- **200**: Popular searches list retrieved.

---

### GET `/search/health`

**Summary**: Retrieve search backend health and queue status

**Tags**: `Search`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Search health report retrieved successfully.
- **403**: Forbidden (Admin access required).

---

### POST `/search/reindex`

**Summary**: Enqueue manual indexing task for a specific entity

**Tags**: `Search`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "entityType",
    "entityId"
  ],
  "properties": {
    "entityType": {
      "type": "string",
      "enum": [
        "courses",
        "categories",
        "instructors",
        "tags"
      ]
    },
    "entityId": {
      "type": "string",
      "format": "uuid"
    }
  }
}
```

#### Responses

- **200**: Manual reindexing task enqueued.

---

### POST `/search/reindex/all`

**Summary**: Trigger full indexing rebuild across all entities

**Tags**: `Search`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Full index rebuild enqueued.

---

### GET `/notifications`

**Summary**: Retrieve the authenticated user's notifications (paginated)

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `page` | `query` | `No` | `integer` |  |
| `limit` | `query` | `No` | `integer` |  |
| `status` | `query` | `No` | `string` |  |

#### Responses

- **200**: Notification list fetched successfully.
- **401**: Authentication required.

---

### GET `/notifications/unread-count`

**Summary**: Get count of unread notifications for the authenticated user

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Unread count returned successfully.
- **401**: Authentication required.

---

### GET `/notifications/preferences`

**Summary**: Get notification preferences for the authenticated user

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: User preferences fetched successfully.
- **401**: Authentication required.

---

### PATCH `/notifications/preferences`

**Summary**: Update notification preferences for the authenticated user

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "channelPreferences": {
      "type": "object",
      "additionalProperties": {
        "type": "boolean"
      },
      "example": {
        "EMAIL": false,
        "PUSH": true
      }
    },
    "categoryPreferences": {
      "type": "object",
      "additionalProperties": {
        "type": "boolean"
      },
      "example": {
        "MARKETING": false
      }
    },
    "marketingOptIn": {
      "type": "boolean"
    },
    "digestEnabled": {
      "type": "boolean"
    }
  }
}
```

#### Responses

- **200**: Preferences updated successfully.
- **400**: Validation error.
- **401**: Authentication required.

---

### PATCH `/notifications/read-all`

**Summary**: Mark all notifications as read for the authenticated user

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: All notifications marked as read.
- **401**: Authentication required.

---

### PATCH `/notifications/{id}/read`

**Summary**: Mark a single notification as read

**Tags**: `Notifications`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Notification marked as read.
- **401**: Authentication required.
- **403**: Notification belongs to a different user.
- **404**: Notification not found.

---

### POST `/media/uploads/url`

**Summary**: Request a presigned S3 upload URL for direct-to-cloud upload

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "filename",
    "mimeType",
    "size"
  ],
  "properties": {
    "filename": {
      "type": "string"
    },
    "mimeType": {
      "type": "string"
    },
    "size": {
      "type": "integer"
    },
    "hash": {
      "type": "string",
      "description": "SHA-256 integrity hash of the file for deduplication"
    }
  }
}
```

#### Responses

- **200**: Presigned upload URL returned.
- **400**: Validation or file size limit error.

---

### POST `/media/{id}/confirm`

**Summary**: Confirm single file upload completeness and queue background processors

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Media upload confirmed, processing enqueued.
- **403**: Forbidden.
- **404**: Media not found.

---

### POST `/media/multipart/initiate`

**Summary**: Initiate a multipart upload session for large files

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "filename",
    "mimeType",
    "size"
  ],
  "properties": {
    "filename": {
      "type": "string"
    },
    "mimeType": {
      "type": "string"
    },
    "size": {
      "type": "integer"
    },
    "hash": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Multipart session initiated, uploadId returned.

---

### POST `/media/{id}/multipart/part`

**Summary**: Generate a presigned URL to upload a specific part of a multipart session

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "key",
    "uploadId",
    "partNumber"
  ],
  "properties": {
    "key": {
      "type": "string"
    },
    "uploadId": {
      "type": "string"
    },
    "partNumber": {
      "type": "integer"
    }
  }
}
```

#### Responses

- **200**: Presigned part URL generated.

---

### POST `/media/{id}/multipart/complete`

**Summary**: Complete a multipart upload session by assembling parts

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "key",
    "uploadId",
    "parts"
  ],
  "properties": {
    "key": {
      "type": "string"
    },
    "uploadId": {
      "type": "string"
    },
    "parts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "PartNumber",
          "ETag"
        ],
        "properties": {
          "PartNumber": {
            "type": "integer"
          },
          "ETag": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

#### Responses

- **200**: Multipart upload completed.

---

### GET `/media/{id}/download`

**Summary**: Get a presigned download URL for private files

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Presigned download URL returned.
- **403**: Forbidden.
- **404**: Media not found.

---

### DELETE `/media/{id}`

**Summary**: Delete a media file from Cloudflare R2 and database (status set to DELETED)

**Tags**: `Media`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Media successfully deleted.
- **400**: Cannot delete media that is in active use.
- **403**: Forbidden.

---

### POST `/learning-units/modules/{moduleId}/units`

**Summary**: Create a learning unit under a module

**Tags**: `Learning Units`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "title",
    "type"
  ],
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "enum": [
        "VIDEO",
        "ARTICLE",
        "PDF",
        "QUIZ",
        "ASSIGNMENT",
        "LIVE_SESSION",
        "EXTERNAL_LINK",
        "CODE_LAB"
      ]
    },
    "duration": {
      "type": "integer"
    },
    "mediaId": {
      "type": "string",
      "format": "uuid"
    },
    "content": {
      "type": "object"
    }
  }
}
```

#### Responses

- **201**: Learning unit created successfully.

---

### PATCH `/learning-units/modules/{moduleId}/units/{id}`

**Summary**: Update a learning unit (and optionally shift modules)

**Tags**: `Learning Units`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "duration": {
      "type": "integer"
    },
    "mediaId": {
      "type": "string",
      "format": "uuid"
    },
    "content": {
      "type": "object"
    },
    "targetModuleId": {
      "type": "string",
      "format": "uuid"
    }
  }
}
```

#### Responses

- **200**: Learning unit updated successfully.

---

### DELETE `/learning-units/modules/:moduleId/units/{id}`

**Summary**: Delete a learning unit

**Tags**: `Learning Units`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Learning unit deleted successfully.

---

### POST `/learning-units/modules/{moduleId}/units/reorder`

**Summary**: Bulk reorder learning units in a module

**Tags**: `Learning Units`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "unitIds"
  ],
  "properties": {
    "unitIds": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid"
      }
    }
  }
}
```

#### Responses

- **200**: Units reordered successfully.

---

### POST `/learning-units/modules/{moduleId}/units/{unitId}/resources`

**Summary**: Attach a resource/file to a learning unit

**Tags**: `Learning Unit Resources`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |
| `unitId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "title",
    "mediaId"
  ],
  "properties": {
    "title": {
      "type": "string"
    },
    "mediaId": {
      "type": "string",
      "format": "uuid"
    }
  }
}
```

#### Responses

- **201**: Resource attached successfully.

---

### DELETE `/learning-units/modules/{moduleId}/units/{unitId}/resources/{resourceId}`

**Summary**: Delete/detach a resource from a learning unit

**Tags**: `Learning Unit Resources`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `moduleId` | `path` | `Yes` | `string` |  |
| `unitId` | `path` | `Yes` | `string` |  |
| `resourceId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Resource detached successfully.

---

### POST `/learning-engine/enroll`

**Summary**: Enroll a student in a course

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "courseId"
  ],
  "properties": {
    "courseId": {
      "type": "string",
      "format": "uuid"
    },
    "source": {
      "type": "string"
    },
    "purchaseRef": {
      "type": "string"
    }
  }
}
```

#### Responses

- **201**: Student enrolled successfully.
- **409**: Student is already enrolled.

---

### POST `/learning-engine/enrollments/{id}/suspend`

**Summary**: Suspend an active enrollment

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Enrollment suspended.

---

### POST `/learning-engine/enrollments/{id}/resume`

**Summary**: Resume a suspended or cancelled enrollment

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Enrollment resumed.

---

### POST `/learning-engine/enrollments/{id}/cancel`

**Summary**: Cancel an enrollment

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Enrollment cancelled.

---

### POST `/learning-engine/enrollments/{id}/progress`

**Summary**: Update progress on a specific learning unit

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "learningUnitId"
  ],
  "properties": {
    "learningUnitId": {
      "type": "string",
      "format": "uuid"
    },
    "watchTime": {
      "type": "integer"
    },
    "lastPosition": {
      "type": "integer"
    },
    "percentInput": {
      "type": "number"
    },
    "quizScore": {
      "type": "number"
    },
    "quizPassingScore": {
      "type": "number"
    },
    "quizMaxScore": {
      "type": "number"
    },
    "isSubmitted": {
      "type": "boolean"
    }
  }
}
```

#### Responses

- **200**: Progress updated.

---

### POST `/learning-engine/enrollments/{id}/sessions/start`

**Summary**: Start a new learning session

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "learningUnitId": {
      "type": "string",
      "format": "uuid"
    },
    "device": {
      "type": "string"
    },
    "browser": {
      "type": "string"
    },
    "ipAddress": {
      "type": "string"
    },
    "userAgent": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Session started.

---

### POST `/learning-engine/sessions/{sessionId}/end`

**Summary**: Complete/end an active learning session

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `sessionId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Session ended.

---

### GET `/learning-engine/enrollments/{id}/continue`

**Summary**: Get recommend next unit and last learning checkpoints

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Recommendation payload returned.

---

### GET `/learning-engine/enrollments/{id}/completion`

**Summary**: Get course completion stats and certificate eligibility flags

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course completion stats returned.

---

### GET `/learning-engine/enrollments/{id}/timeline`

**Summary**: Query the student's audit event timeline

**Tags**: `Learning Engine`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Student timeline log array returned.

---

### GET `/instructor-studio/dashboard`

**Summary**: Retrieve the instructor dashboard overview

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: Dashboard metrics returned.

---

### GET `/instructor-studio/courses/{courseId}/checklist`

**Summary**: Get publishing readiness checklist report for a course

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Publishing checklist array.

---

### GET `/instructor-studio/courses/{courseId}/health`

**Summary**: Get quality health score and recommendations for a course

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Health report details.

---

### POST `/instructor-studio/courses/{courseId}/review`

**Summary**: Submit a course for draft review

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "changeSummary": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Course transitioned to REVIEW status.

---

### POST `/instructor-studio/courses/{courseId}/publish`

**Summary**: Publish a course (In Review -> Published). Requires Admin/Reviewer role.

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "changeSummary": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Course published successfully.

---

### POST `/instructor-studio/courses/{courseId}/unpublish`

**Summary**: Unpublish a course (Published -> Draft)

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course unpublished.

---

### POST `/instructor-studio/courses/{courseId}/archive`

**Summary**: Archive a course

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course archived.

---

### POST `/instructor-studio/courses/{courseId}/restore`

**Summary**: Restore an archived course back to draft status

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course restored.

---

### POST `/instructor-studio/courses/{courseId}/preview-token`

**Summary**: Generate a secure, short-lived preview token

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "scope": {
      "type": "string",
      "enum": [
        "INSTRUCTOR",
        "REVIEWER",
        "PUBLIC"
      ]
    },
    "expiresInSeconds": {
      "type": "integer"
    }
  }
}
```

#### Responses

- **200**: Preview token returned.

---

### POST `/instructor-studio/courses/{courseId}/duplicate`

**Summary**: Duplicate a course and its entire modules structure

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "newTitle": {
      "type": "string"
    }
  }
}
```

#### Responses

- **201**: Course duplicated.

---

### POST `/instructor-studio/courses/{courseId}/modules/{moduleId}/duplicate`

**Summary**: Duplicate a curriculum module

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `moduleId` | `path` | `Yes` | `string` |  |

#### Responses

- **201**: Module duplicated.

---

### POST `/instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/duplicate`

**Summary**: Duplicate a learning unit

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `learningUnitId` | `path` | `Yes` | `string` |  |

#### Responses

- **201**: Unit duplicated.

---

### POST `/instructor-studio/courses/{courseId}/modules/{moduleId}/move`

**Summary**: Move a module's sequential position index

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `moduleId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "targetIndex"
  ],
  "properties": {
    "targetIndex": {
      "type": "integer"
    }
  }
}
```

#### Responses

- **200**: Module position updated.

---

### POST `/instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/move`

**Summary**: Move a learning unit to a different module or sequence index

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `learningUnitId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "targetModuleId",
    "targetIndex"
  ],
  "properties": {
    "targetModuleId": {
      "type": "string",
      "format": "uuid"
    },
    "targetIndex": {
      "type": "integer"
    }
  }
}
```

#### Responses

- **200**: Learning Unit relocated.

---

### POST `/instructor-studio/courses/{courseId}/curriculum/reorder`

**Summary**: Bulk reorder curriculum sequence indices in a transaction

**Tags**: `Instructor Studio`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "modules"
  ],
  "properties": {
    "modules": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "id",
          "sequence"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "sequence": {
            "type": "integer"
          },
          "learningUnits": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "id",
                "sequence"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid"
                },
                "sequence": {
                  "type": "integer"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Responses

- **200**: Curriculum bulk reordered.

---

### POST `/credentials/templates`

**Summary**: Register a new certificate template

**Tags**: `Credentials`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "name",
    "slug",
    "templateVersion",
    "htmlTemplate",
    "cssTemplate"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "slug": {
      "type": "string"
    },
    "templateVersion": {
      "type": "string",
      "example": "v1"
    },
    "htmlTemplate": {
      "type": "string",
      "description": "Full HTML markup for the certificate layout"
    },
    "cssTemplate": {
      "type": "string",
      "description": "Scoped CSS styles for the certificate layout"
    },
    "branding": {
      "type": "object",
      "additionalProperties": true
    }
  }
}
```

#### Responses

- **201**: Template registered successfully.
- **400**: Validation error or slug conflict.
- **401**: Authentication required.
- **403**: Insufficient permissions.

---

### PATCH `/credentials/templates/{id}`

**Summary**: Update a certificate template (layout changes blocked once credentials issued)

**Tags**: `Credentials`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "active": {
      "type": "boolean"
    }
  }
}
```

#### Responses

- **200**: Template updated successfully.
- **400**: Layout modification blocked (template has issued credentials).
- **401**: Authentication required.
- **403**: Insufficient permissions.
- **404**: Template not found.

---

### POST `/credentials/issue`

**Summary**: Issue a credential certificate to a student

**Tags**: `Credentials`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "userId",
    "courseId",
    "templateId",
    "metadata"
  ],
  "properties": {
    "userId": {
      "type": "string",
      "format": "uuid"
    },
    "courseId": {
      "type": "string",
      "format": "uuid"
    },
    "templateId": {
      "type": "string",
      "format": "uuid"
    },
    "expiresAt": {
      "type": "string",
      "format": "date-time",
      "nullable": true
    },
    "metadata": {
      "type": "object",
      "required": [
        "studentName",
        "courseTitle",
        "instructorName",
        "completionDate"
      ],
      "properties": {
        "studentName": {
          "type": "string"
        },
        "courseTitle": {
          "type": "string"
        },
        "instructorName": {
          "type": "string"
        },
        "completionDate": {
          "type": "string"
        },
        "customData": {
          "type": "object",
          "additionalProperties": true
        }
      }
    }
  }
}
```

#### Responses

- **201**: Credential issued successfully.
- **400**: Validation error or inactive template.
- **401**: Authentication required.
- **403**: Insufficient permissions.
- **404**: Template not found.
- **409**: Duplicate active credential exists for this user and course.

---

### POST `/credentials/verify`

**Summary**: Verify a credential using its verification token (public endpoint)

**Tags**: `Credentials`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "verificationToken",
    "source"
  ],
  "properties": {
    "verificationToken": {
      "type": "string",
      "description": "Raw verification token from the certificate URL"
    },
    "source": {
      "type": "string",
      "enum": [
        "PUBLIC_PAGE",
        "API",
        "ADMIN"
      ]
    }
  }
}
```

#### Responses

- **200**: Credential verified successfully.
- **400**: Credential is revoked or expired.
- **404**: Verification token not found.

---

### POST `/credentials/revoke`

**Summary**: Revoke an issued credential

**Tags**: `Credentials`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "credentialId",
    "reason"
  ],
  "properties": {
    "credentialId": {
      "type": "string",
      "format": "uuid"
    },
    "reason": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true
    }
  }
}
```

#### Responses

- **200**: Credential revoked successfully.
- **400**: Credential is already revoked.
- **401**: Authentication required.
- **403**: Insufficient permissions.
- **404**: Credential not found.

---

### GET `/credentials/my`

**Summary**: Retrieve all credentials issued to the authenticated user

**Tags**: `Credentials`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: User credential list fetched successfully.
- **401**: Authentication required.

---

### GET `/courses`

**Summary**: Retrieve a paginated and filtered catalog of courses

**Tags**: `Courses`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `page` | `query` | `No` | `integer` |  |
| `limit` | `query` | `No` | `integer` |  |
| `search` | `query` | `No` | `string` |  |
| `categoryId` | `query` | `No` | `string` |  |
| `difficulty` | `query` | `No` | `string` |  |
| `language` | `query` | `No` | `string` |  |

#### Responses

- **200**: Paginated course catalog retrieved successfully.

---

### POST `/courses`

**Summary**: Create a new course (Instructor/Admin restricted)

**Tags**: `Courses`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "title",
    "categoryId"
  ],
  "properties": {
    "title": {
      "type": "string"
    },
    "categoryId": {
      "type": "string",
      "format": "uuid"
    },
    "subtitle": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "language": {
      "type": "string"
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED",
        "EXPERT"
      ]
    }
  }
}
```

#### Responses

- **201**: Course created successfully.
- **400**: Structural validation failure.

---

### GET `/courses/{id}`

**Summary**: Retrieve details of a single course by ID

**Tags**: `Courses`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course details retrieved successfully.
- **403**: Forbidden from accessing draft or private course.
- **404**: Course not found.

---

### PATCH `/courses/{id}`

**Summary**: Update course details (requires ownership/admin)

**Tags**: `Courses`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "categoryId": {
      "type": "string",
      "format": "uuid"
    },
    "subtitle": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "language": {
      "type": "string"
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED",
        "EXPERT"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "DRAFT",
        "REVIEW",
        "PUBLISHED",
        "ARCHIVED"
      ]
    },
    "visibility": {
      "type": "string",
      "enum": [
        "PUBLIC",
        "PRIVATE",
        "UNLISTED"
      ]
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

#### Responses

- **200**: Course updated successfully.
- **403**: Not authorized to edit this course.

---

### DELETE `/courses/{id}`

**Summary**: Archive a course (soft delete)

**Tags**: `Courses`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course archived successfully.
- **430**: Not authorized.

---

### GET `/courses/slug/{slug}`

**Summary**: Retrieve details of a single course by URL slug

**Tags**: `Courses`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `slug` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Course details retrieved successfully.
- **403**: Forbidden.
- **404**: Course not found.

---

### POST `/courses/{courseId}/modules`

**Summary**: Create a course module

**Tags**: `Course Modules`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "title"
  ],
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  }
}
```

#### Responses

- **201**: Course module created successfully.

---

### PATCH `/courses/{courseId}/modules/{moduleId}`

**Summary**: Update course module details

**Tags**: `Course Modules`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `moduleId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Module updated successfully.

---

### DELETE `/courses/{courseId}/modules/{moduleId}`

**Summary**: Delete a course module

**Tags**: `Course Modules`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |
| `moduleId` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Module deleted successfully.

---

### POST `/courses/{courseId}/modules/reorder`

**Summary**: Bulk reorder modules in a course

**Tags**: `Course Modules`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `courseId` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "moduleIds"
  ],
  "properties": {
    "moduleIds": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid"
      }
    }
  }
}
```

#### Responses

- **200**: Modules reordered successfully.

---

### POST `/payments/checkout`

**Summary**: Initiate a course purchase checkout session

**Tags**: `Payments`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "productId",
    "priceId"
  ],
  "properties": {
    "productId": {
      "type": "string",
      "format": "uuid"
    },
    "priceId": {
      "type": "string",
      "format": "uuid"
    },
    "couponCode": {
      "type": "string",
      "maxLength": 50
    },
    "billingRegion": {
      "type": "string",
      "length": 2
    },
    "gateway": {
      "type": "string",
      "enum": [
        "RAZORPAY",
        "STRIPE",
        "PAYPAL"
      ]
    }
  }
}
```

#### Responses

- **201**: Checkout session successfully initiated.
- **400**: Schema validation failure.
- **401**: Unauthorized credentials.
- **409**: Concurrent checkout attempt conflict.

---

### POST `/payments/webhook`

**Summary**: Receive verified payment webhook payloads from Razorpay

**Tags**: `Payments`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `x-razorpay-signature` | `header` | `Yes` | `string` | The cryptographic signature from Razorpay |

#### Request Body Schema

```json
{
  "type": "object"
}
```

#### Responses

- **200**: Webhook event parsed and enqueued successfully.
- **400**: Bad request, missing headers or payload validation error.
- **409**: Conflict, duplicate processing detected.

---

### GET `/categories`

**Summary**: Retrieve categories formatted as a recursive tree node hierarchy

**Tags**: `Categories`

**Security**: 🔓 Public Access

#### Responses

- **200**: Categories tree fetched successfully.

---

### POST `/categories`

**Summary**: Create a new category

**Tags**: `Categories`

**Security**: 🔒 Authorized Only

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "parentId": {
      "type": "string",
      "format": "uuid"
    },
    "slug": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  }
}
```

#### Responses

- **201**: Category created successfully.
- **409**: Duplicate slug or name conflict.

---

### GET `/categories/{id}`

**Summary**: Retrieve details of a single category by ID

**Tags**: `Categories`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Category details fetched successfully.
- **404**: Category not found.

---

### PATCH `/categories/{id}`

**Summary**: Update category details

**Tags**: `Categories`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Request Body Schema

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "parentId": {
      "type": "string",
      "format": "uuid"
    },
    "slug": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Category updated successfully.
- **400**: Category loop cycle error.
- **409**: Slug conflict.

---

### DELETE `/categories/{id}`

**Summary**: Delete a category (restricted by child counts)

**Tags**: `Categories`

**Security**: 🔒 Authorized Only

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `id` | `path` | `Yes` | `string` |  |

#### Responses

- **200**: Category deleted successfully.
- **400**: Cannot delete category due to nested children or courses.

---

### POST `/auth/register`

**Summary**: Register a new student account

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "email",
    "password",
    "firstName",
    "lastName"
  ],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "format": "password"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    }
  }
}
```

#### Responses

- **201**: Registered successfully
- **400**: Validation schema failed
- **409**: Email conflict

---

### POST `/auth/login`

**Summary**: Sign in with credentials

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "email",
    "password"
  ],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "format": "password"
    }
  }
}
```

#### Responses

- **200**: Login successful
- **401**: Unauthorized credentials
- **403**: Account temporarily locked

---

### POST `/auth/refresh`

**Summary**: Rotate refresh session tokens

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "refreshToken"
  ],
  "properties": {
    "refreshToken": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Tokens rotated successfully
- **401**: Invalid session token

---

### POST `/auth/logout`

**Summary**: Terminate current session

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "refreshToken"
  ],
  "properties": {
    "refreshToken": {
      "type": "string"
    }
  }
}
```

#### Responses

- **200**: Current session logged out

---

### POST `/auth/logout-all`

**Summary**: Invalidate all sessions

**Tags**: `Authentication`

**Security**: 🔒 Authorized Only

#### Responses

- **200**: All device sessions terminated
- **401**: Unauthorized access

---

### POST `/auth/forgot-password`

**Summary**: Request password reset link

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "email"
  ],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    }
  }
}
```

#### Responses

- **200**: Operation completed

---

### POST `/auth/reset-password`

**Summary**: Reset password with token

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Request Body Schema

```json
{
  "type": "object",
  "required": [
    "token",
    "password"
  ],
  "properties": {
    "token": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "format": "password"
    }
  }
}
```

#### Responses

- **200**: Password reset completed
- **400**: Invalid token link

---

### GET `/auth/verify-email`

**Summary**: Confirm account email address

**Tags**: `Authentication`

**Security**: 🔓 Public Access

#### Query/Path Parameters

| Name | In | Required | Type | Description |
|---|---|---|---|---|
| `token` | `query` | `Yes` | `string` |  |

#### Responses

- **200**: Email verified successfully
- **400**: Invalid verification link

---

