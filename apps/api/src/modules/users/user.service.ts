import { User, RefreshToken, AuditLog } from "@prisma/client";
import { userRepository, UserRepository } from "./user.repository";
import { userEventBus } from "./user.events";
import { USER_CONSTANTS } from "./user.constants";
import {
  UpdateProfileInput,
  UpdatePreferencesInput,
  ChangePasswordInput,
  AuditQueryInput,
} from "./user.schemas";
import { comparePassword, hashPassword, hashToken } from "../auth/auth.utils";
import { AppError } from "../../common/errors/appError";

export class UserService {
  constructor(private readonly repository: UserRepository = userRepository) {}

  /**
   * Resolves a user profile or throws NotFound.
   */
  public async getProfile(userId: string): Promise<User> {
    const user = await this.repository.findById(userId);
    if (!user || user.deletedAt) {
      throw AppError.notFound("User account not found.");
    }
    return user;
  }

  /**
   * Updates standard profile details, publishing a UserUpdated event.
   */
  public async updateProfile(
    userId: string,
    input: UpdateProfileInput,
    audit: { ip?: string; agent?: string }
  ): Promise<User> {
    const user = await this.getProfile(userId);

    const updated = await this.repository.update(userId, {
      ...(input.firstName !== undefined && { firstName: input.firstName }),
      ...(input.lastName !== undefined && { lastName: input.lastName }),
      ...(input.displayName !== undefined && { displayName: input.displayName }),
      ...(input.bio !== undefined && { bio: input.bio }),
      ...(input.timezone !== undefined && { timezone: input.timezone }),
      ...(input.language !== undefined && { language: input.language }),
    });

    await this.repository.createAuditLog({
      userId,
      action: "user:update_profile",
      ipAddress: audit.ip,
      userAgent: audit.agent,
      payload: { fields: Object.keys(input) },
    });

    userEventBus.publish(USER_CONSTANTS.EVENTS.USER_UPDATED, {
      userId,
      occurredAt: new Date(),
      meta: { updatedFields: Object.keys(input) },
    });

    return updated;
  }

  /**
   * Updates user avatar link, publishing AvatarUpdated event.
   */
  public async updateAvatar(
    userId: string,
    avatarUrl: string,
    audit: { ip?: string; agent?: string }
  ): Promise<User> {
    await this.getProfile(userId);

    const updated = await this.repository.update(userId, { avatarUrl });

    await this.repository.createAuditLog({
      userId,
      action: "user:update_avatar",
      ipAddress: audit.ip,
      userAgent: audit.agent,
    });

    userEventBus.publish(USER_CONSTANTS.EVENTS.AVATAR_UPDATED, {
      userId,
      occurredAt: new Date(),
      meta: { avatarUrl },
    });

    return updated;
  }

  /**
   * Modifies account preferences.
   */
  public async updatePreferences(
    userId: string,
    input: UpdatePreferencesInput,
    audit: { ip?: string; agent?: string }
  ): Promise<User> {
    const user = await this.getProfile(userId);
    const existingPrefs = (user.preferences as Record<string, any>) || {};

    const mergedPrefs = {
      ...existingPrefs,
      ...input,
    };

    const updated = await this.repository.update(userId, {
      preferences: mergedPrefs,
    });

    await this.repository.createAuditLog({
      userId,
      action: "user:update_preferences",
      ipAddress: audit.ip,
      userAgent: audit.agent,
      payload: { preferences: Object.keys(input) },
    });

    return updated;
  }

  /**
   * Safely changes a user's password, revoking other sessions and auditing.
   */
  public async changePassword(
    userId: string,
    input: ChangePasswordInput,
    currentToken: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const user = await this.getProfile(userId);

    const isMatch = await comparePassword(input.currentPassword, user.passwordHash);
    if (!isMatch) {
      throw AppError.unauthorized("Incorrect current password.");
    }

    const newHash = await hashPassword(input.newPassword);
    await this.repository.update(userId, {
      passwordHash: newHash,
      lastPasswordChangedAt: new Date(),
    });

    // Invalidate other devices
    const currentHash = hashToken(currentToken);
    await this.repository.revokeOtherSessions(userId, currentHash);

    await this.repository.createAuditLog({
      userId,
      action: "user:change_password",
      ipAddress: audit.ip,
      userAgent: audit.agent,
    });

    userEventBus.publish(USER_CONSTANTS.EVENTS.PASSWORD_CHANGED, {
      userId,
      occurredAt: new Date(),
      meta: {},
    });
  }

  /**
   * Retrieves active, non-revoked session listings.
   */
  public async listSessions(userId: string): Promise<RefreshToken[]> {
    await this.getProfile(userId);
    return this.repository.listSessions(userId);
  }

  /**
   * Revokes a specific session device by ID.
   */
  public async logoutSession(
    userId: string,
    sessionId: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const session = await this.repository.findSessionById(sessionId);
    if (!session || session.userId !== userId) {
      throw AppError.notFound("Session not found.");
    }

    await this.repository.revokeSession(sessionId);

    await this.repository.createAuditLog({
      userId,
      action: "user:logout_session",
      ipAddress: audit.ip,
      userAgent: audit.agent,
      payload: { sessionId },
    });
  }

  /**
   * Revokes all user sessions except current active one.
   */
  public async logoutOtherSessions(
    userId: string,
    currentToken: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const currentHash = hashToken(currentToken);
    await this.repository.revokeOtherSessions(userId, currentHash);

    await this.repository.createAuditLog({
      userId,
      action: "user:logout_other_sessions",
      ipAddress: audit.ip,
      userAgent: audit.agent,
    });
  }

  /**
   * Deactivates a user's own profile.
   */
  public async deactivateAccount(
    userId: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const user = await this.getProfile(userId);

    // Prevent deactivating Super Admins
    const isSuperAdmin = await this.checkUserIsSuperAdmin(userId);
    if (isSuperAdmin) {
      throw AppError.forbidden("Deactivation of Super Admin account is prohibited.");
    }

    await this.repository.deactivate(userId);
    await this.repository.revokeAllSessions(userId);

    await this.repository.createAuditLog({
      userId,
      action: "user:deactivate_account",
      ipAddress: audit.ip,
      userAgent: audit.agent,
    });

    userEventBus.publish(USER_CONSTANTS.EVENTS.ACCOUNT_DEACTIVATED, {
      userId,
      occurredAt: new Date(),
      meta: {},
    });
  }

  /**
   * Reactivates a deactivated profile (Admin/Super Admin only).
   */
  public async reactivateAccount(
    adminUserId: string,
    targetUserId: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const targetUser = await this.repository.findById(targetUserId);
    if (!targetUser || targetUser.deletedAt) {
      throw AppError.notFound("User account not found.");
    }

    await this.repository.reactivate(targetUserId);

    await this.repository.createAuditLog({
      userId: adminUserId,
      action: "user:reactivate_account",
      ipAddress: audit.ip,
      userAgent: audit.agent,
      payload: { targetUserId },
    });
  }

  /**
   * Soft deletes a user account (with Super Admin deletion safeguard).
   */
  public async softDeleteAccount(
    initiatorUserId: string,
    targetUserId: string,
    audit: { ip?: string; agent?: string }
  ): Promise<void> {
    const targetUser = await this.repository.findById(targetUserId);
    if (!targetUser || targetUser.deletedAt) {
      throw AppError.notFound("User account not found.");
    }

    // Deletion of Super Admin accounts is strictly prohibited
    const isSuperAdmin = await this.checkUserIsSuperAdmin(targetUserId);
    if (isSuperAdmin) {
      throw AppError.forbidden("Deletion of Super Admin account is strictly prohibited.");
    }

    await this.repository.softDelete(targetUserId);
    await this.repository.revokeAllSessions(targetUserId);

    await this.repository.createAuditLog({
      userId: initiatorUserId,
      action: "user:soft_delete_account",
      ipAddress: audit.ip,
      userAgent: audit.agent,
      payload: { targetUserId },
    });

    userEventBus.publish(USER_CONSTANTS.EVENTS.ACCOUNT_DELETED, {
      userId: targetUserId,
      occurredAt: new Date(),
      meta: { deletedBy: initiatorUserId },
    });
  }

  /**
   * Lists paginated user audit history.
   */
  public async listAuditLogs(
    userId: string,
    query: AuditQueryInput
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const skip = (query.page - 1) * query.limit;
    return this.repository.listAuditLogs(userId, skip, query.limit, query.action);
  }

  /**
   * Helper check to verify if a user has SUPER_ADMIN role.
   */
  private async checkUserIsSuperAdmin(userId: string): Promise<boolean> {
    const roles = await this.repository.findRolesByUserId(userId);
    return roles.some((ur) => ur.role.name === "SUPER_ADMIN");
  }
}

export const userService = new UserService();
export default userService;
