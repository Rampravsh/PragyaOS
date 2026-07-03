import { User, RefreshToken } from "@prisma/client";
import { UserProfileResponse, SessionResponse, UserPreferences } from "./user.types";

export class UserMapper {
  /**
   * Serializes a User database record into a sanitized UserProfileResponse DTO.
   */
  public static toProfileDTO(user: User): UserProfileResponse {
    // Parse preferences Json safely with defaults
    const rawPrefs = (user.preferences as Record<string, any>) || {};
    const preferences: UserPreferences = {
      theme: rawPrefs.theme || "SYSTEM",
      emailPreference: rawPrefs.emailPreference !== false,
      notificationPreference: rawPrefs.notificationPreference !== false,
      marketingPreference: !!rawPrefs.marketingPreference,
      privacyPreference: rawPrefs.privacyPreference === "private" ? "private" : "public",
    };

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      timezone: user.timezone || "UTC",
      language: user.language || "en",
      status: user.status,
      preferences,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Serializes an array of User database records.
   */
  public static toProfileDTOs(users: User[]): UserProfileResponse[] {
    return users.map((u) => this.toProfileDTO(u));
  }

  /**
   * Serializes a RefreshToken record into a sanitized SessionResponse DTO.
   */
  public static toSessionDTO(token: RefreshToken, currentTokenHash?: string): SessionResponse {
    return {
      id: token.id,
      isCurrent: currentTokenHash ? token.tokenHash === currentTokenHash : false,
      ipAddress: token.ipAddress,
      userAgent: token.userAgent,
      deviceInfo: token.deviceInfo,
      lastUsedAt: token.lastUsedAt,
      createdAt: token.createdAt,
      expiresAt: token.expiresAt,
    };
  }

  /**
   * Serializes multiple refresh token records.
   */
  public static toSessionDTOs(tokens: RefreshToken[], currentTokenHash?: string): SessionResponse[] {
    return tokens.map((t) => this.toSessionDTO(t, currentTokenHash));
  }
}
export default UserMapper;
