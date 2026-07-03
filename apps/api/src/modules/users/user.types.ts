import { USER_CONSTANTS } from "./user.constants";

export interface UserPreferences {
  theme: typeof USER_CONSTANTS.THEMES[number];
  emailPreference: boolean;
  notificationPreference: boolean;
  marketingPreference: boolean;
  privacyPreference: "public" | "private";
}

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  timezone: string;
  language: string;
  status: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionResponse {
  id: string;
  isCurrent: boolean;
  ipAddress: string | null;
  userAgent: string | null;
  deviceInfo: string | null;
  lastUsedAt: Date;
  createdAt: Date;
  expiresAt: Date;
}

export interface UserEventPayload {
  userId: string;
  occurredAt: Date;
  meta: Record<string, any>;
}
