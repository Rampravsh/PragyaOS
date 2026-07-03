import { User, RefreshToken, AuditLog, UserStatus, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export class UserRepository {
  /**
   * Resolves a user by their ID.
   */
  public async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Resolves a user by their email.
   */
  public async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Updates user profile fields, preferences, or passwords.
   */
  public async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Lists active, non-revoked refresh token sessions for a user.
   */
  public async listSessions(userId: string): Promise<RefreshToken[]> {
    return prisma.refreshToken.findMany({
      where: {
        userId,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastUsedAt: "desc" },
    });
  }

  /**
   * Resolves a session record by its token hash.
   */
  public async findSessionByHash(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
  }

  /**
   * Resolves a session record by its ID.
   */
  public async findSessionById(id: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  /**
   * Revokes a session (logs out a device).
   */
  public async revokeSession(id: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  /**
   * Revokes all refresh token sessions for a user.
   */
  public async revokeAllSessions(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  /**
   * Revokes all user sessions except the specified current session.
   */
  public async revokeOtherSessions(userId: string, currentSessionHash: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
        NOT: { tokenHash: currentSessionHash },
      },
      data: { revoked: true },
    });
  }

  /**
   * Sets status to SUSPENDED.
   */
  public async deactivate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { status: UserStatus.SUSPENDED },
    });
  }

  /**
   * Sets status to ACTIVE.
   */
  public async reactivate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { status: UserStatus.ACTIVE },
    });
  }

  /**
   * Soft deletes a user account by setting deletedAt.
   */
  public async softDelete(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: UserStatus.SUSPENDED,
      },
    });
  }

  /**
   * Retrieves paginated, action-filtered audit logs for a specific user.
   */
  public async listAuditLogs(
    userId: string,
    skip: number,
    take: number,
    action?: string
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const where = {
      userId,
      ...(action && { action }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { logs, total };
  }

  /**
   * Inserts an audit log entry.
   */
  public async createAuditLog(data: {
    userId: string;
    action: string;
    ipAddress?: string;
    userAgent?: string;
    payload?: any;
  }): Promise<void> {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        payload: data.payload || null,
      },
    });
  }
}

export const userRepository = new UserRepository();
export default userRepository;
