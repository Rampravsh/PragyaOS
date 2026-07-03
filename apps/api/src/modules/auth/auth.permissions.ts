/**
 * Centralized registry of all system permissions, organized by resource domain.
 * Follows the standard "resource:action" format.
 */
export const PERMISSIONS = {
  AUTH: {
    LOGIN: "auth:login" as const,
    REGISTER: "auth:register" as const,
  },
  USERS: {
    CREATE: "user:create" as const,
    READ: "user:read" as const,
    UPDATE: "user:update" as const,
    DELETE: "user:delete" as const,
  },
  ROLES: {
    CREATE: "role:create" as const,
    READ: "role:read" as const,
    UPDATE: "role:update" as const,
    DELETE: "role:delete" as const,
  },
  COURSES: {
    CREATE: "course:create" as const,
    READ: "course:read" as const,
    UPDATE: "course:update" as const,
    DELETE: "course:delete" as const,
    PUBLISH: "course:publish" as const,
  },
  SECTIONS: {
    CREATE: "section:create" as const,
    READ: "section:read" as const,
    UPDATE: "section:update" as const,
    DELETE: "section:delete" as const,
  },
  LESSONS: {
    CREATE: "lesson:create" as const,
    READ: "lesson:read" as const,
    UPDATE: "lesson:update" as const,
    DELETE: "lesson:delete" as const,
  },
  UPLOADS: {
    CREATE: "upload:create" as const,
    READ: "upload:read" as const,
    DELETE: "upload:delete" as const,
  },
  PAYMENTS: {
    CREATE: "payment:create" as const,
    READ: "payment:read" as const,
    REFUND: "payment:refund" as const,
  },
  ENROLLMENTS: {
    CREATE: "enrollment:create" as const,
    READ: "enrollment:read" as const,
    UPDATE: "enrollment:update" as const,
    DELETE: "enrollment:delete" as const,
  },
  ANALYTICS: {
    READ: "analytics:read" as const,
  },
  SETTINGS: {
    READ: "setting:read" as const,
    UPDATE: "setting:update" as const,
  },
  AUDIT: {
    READ: "audit:read" as const,
  },
  NOTIFICATIONS: {
    CREATE: "notification:create" as const,
    READ: "notification:read" as const,
    UPDATE: "notification:update" as const,
    DELETE: "notification:delete" as const,
  },
} as const;

// Flatten the registry into an array of string values for easy mapping and verification
export const ALL_SYSTEM_PERMISSIONS = Object.values(PERMISSIONS).flatMap((resourceGroup) =>
  Object.values(resourceGroup)
);

export type SystemPermission = typeof ALL_SYSTEM_PERMISSIONS[number];
