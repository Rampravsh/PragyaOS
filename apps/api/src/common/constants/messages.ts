export const Messages = {
  GLOBAL: {
    SUCCESS: "Operation completed successfully.",
    SERVER_ERROR: "An unexpected error occurred on the server.",
    NOT_FOUND: "The requested resource could not be found.",
    RATE_LIMIT: "Too many requests. Please try again later.",
  },
  AUTH: {
    UNAUTHORIZED: "Authentication is required to access this resource.",
    FORBIDDEN: "You do not have permission to perform this action.",
    INVALID_TOKEN: "The provided token is invalid or expired.",
    TOKEN_REFRESHED: "Authentication token pair refreshed successfully.",
  },
  VALIDATION: {
    BAD_REQUEST: "The request payload failed structural validation.",
    INVALID_EMAIL: "Please provide a valid email address.",
    PASSWORD_STRENGTH: "Password must be at least 8 characters long and contain numbers and symbols.",
  },
} as const;
