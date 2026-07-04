import { User, RefreshToken, PasswordResetToken, EmailVerificationToken, UserStatus } from "@prisma/client";
import { prisma } from "../../database/client";
import { DeviceMetadata } from "./auth.types";

export class AuthRepository {
  /**
   * Resolves a user profile by their email address, including roles and permission maps.
   */
  public async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /**
   * Resolves a user profile by their ID, including roles and permission maps.
   */
  public async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /**
   * Creates a new User record and links the default STUDENT role to it.
   */
  public async createUser(data: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    return prisma.$transaction(async (tx) => {
      // Find default STUDENT role
      const studentRole = await tx.role.findUnique({
        where: { name: "STUDENT" },
      });

      if (!studentRole) {
        throw new Error("Default security role 'STUDENT' could not be resolved. Ensure seeds have run.");
      }

      // Create the user
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash: data.passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          status: UserStatus.ACTIVE,
        },
      });

      // Map UserRole
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId: studentRole.id,
        },
      });

      return user;
    });
  }

  /**
   * Registers an active hashed refresh token session.
   */
  public async createRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    meta: DeviceMetadata
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        deviceInfo: meta.deviceInfo,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      },
    });
  }

  /**
   * Looks up a refresh token record by its hash.
   */
  public async findRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
  }

  /**
   * Revokes a specific refresh token session.
   */
  public async revokeRefreshToken(tokenHash: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { tokenHash },
      data: { revoked: true },
    });
  }

  /**
   * Revokes all refresh token sessions for a specific user.
   */
  public async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  /**
   * Registers a password reset token digest.
   */
  public async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<PasswordResetToken> {
    return prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  /**
   * Resolves a reset token record by its digest hash.
   */
  public async findPasswordResetToken(tokenHash: string): Promise<PasswordResetToken | null> {
    return prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });
  }

  /**
   * Marks a password reset token as used.
   */
  public async markPasswordResetTokenUsed(id: string): Promise<void> {
    await prisma.passwordResetToken.update({
      where: { id },
      data: { used: true },
    });
  }

  /**
   * Revokes all active reset tokens for a user.
   */
  public async revokePasswordResetTokens(userId: string): Promise<void> {
    await prisma.passwordResetToken.updateMany({
      where: { userId, revoked: false, used: false },
      data: { revoked: true },
    });
  }

  /**
   * Registers an email verification token digest.
   */
  public async createEmailVerificationToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<EmailVerificationToken> {
    return prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  /**
   * Resolves an email verification token by its hash.
   */
  public async findEmailVerificationToken(tokenHash: string): Promise<EmailVerificationToken | null> {
    return prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    });
  }

  /**
   * Marks an email verification token as used.
   */
  public async markEmailVerificationTokenUsed(id: string): Promise<void> {
    await prisma.emailVerificationToken.update({
      where: { id },
      data: { used: true },
    });
  }

  /**
   * Updates a user's password and records the timestamp of the change.
   */
  public async updateUserPassword(userId: string, passwordHash: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        lastPasswordChangedAt: new Date(),
      },
    });
  }

  /**
   * Marks a user's email as verified.
   */
  public async verifyUserEmail(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
  }

  /**
   * Increments failed login attempts, locking the account if threshold is exceeded.
   */
  public async incrementFailedAttempts(userId: string, currentAttempts: number, lockUntil: Date | null): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: currentAttempts + 1,
        ...(lockUntil && { lockedUntil: lockUntil }),
      },
    });
  }

  /**
   * Resets failed login attempts back to zero.
   */
  public async resetFailedAttempts(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  /**
   * Updates the user's last login date.
   */
  public async updateLastLogin(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  /**
   * Fetches distinct roles and permissions connected to a user.
   */
  public async findRolesWithPermissionsByUserId(userId: string) {
    return prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }
}

export const authRepository = new AuthRepository();
