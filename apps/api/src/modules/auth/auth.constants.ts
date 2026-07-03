export const AUTH_CONSTANTS = {
  SALT_ROUNDS: 10,
  PASSWORD_POLICY: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
  },
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes
  TOKENS: {
    ACCESS_TYPE: "access" as const,
    REFRESH_TYPE: "refresh" as const,
  },
  TOKEN_EXPIRY: {
    PASSWORD_RESET_MS: 15 * 60 * 1000, // 15 minutes
    EMAIL_VERIFICATION_MS: 24 * 60 * 60 * 1000, // 24 hours
  },
};
