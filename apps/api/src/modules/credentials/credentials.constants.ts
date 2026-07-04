export const CREDENTIAL_PERMISSIONS = {
  TEMPLATE_CREATE: "credential:template:create",
  TEMPLATE_UPDATE: "credential:template:update",
  ISSUE: "credential:issue",
  REVOKE: "credential:revoke",
  READ: "credential:read",
  VERIFY: "credential:verify",
} as const;

export const CREDENTIAL_NUMBER_CONFIG = {
  PREFIX: "CERT",
  SEQUENCE_PAD: 6,
} as const;
