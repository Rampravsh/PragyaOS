export const USER_CONSTANTS = {
  THEMES: ["LIGHT", "DARK", "SYSTEM"] as const,
  LANGUAGES: ["en", "es", "fr", "de", "hi"] as const,
  DEFAULT_TIMEZONE: "UTC",
  DEFAULT_LANGUAGE: "en",
  EVENTS: {
    USER_UPDATED: "UserUpdated" as const,
    PASSWORD_CHANGED: "PasswordChanged" as const,
    AVATAR_UPDATED: "AvatarUpdated" as const,
    ACCOUNT_DEACTIVATED: "AccountDeactivated" as const,
    ACCOUNT_DELETED: "AccountDeleted" as const,
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
};
