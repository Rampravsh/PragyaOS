import { User } from "@prisma/client";
import { authRepository, AuthRepository } from "./auth.repository";
import { authMailService, AuthMailService } from "./auth.mail";
import { RegisterInput, LoginInput, ResetPasswordInput } from "./auth.schemas";
import { AuthTokens, UserSession, DeviceMetadata, TokenPayload } from "./auth.types";
import { AUTH_CONSTANTS } from "./auth.constants";
import { hashPassword, comparePassword, hashToken, generateSecureToken } from "./auth.utils";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./auth.tokens";
import { AppError } from "../../common/errors/appError";
import { UserContext } from "../../common/types/context.type";
import { logger } from "../../lib/logger";

export class AuthService {
  constructor(
    private readonly repository: AuthRepository = authRepository,
    private readonly mailService: AuthMailService = authMailService
  ) {}

  /**
   * Registers a new Student user, enforcing unique email constraints.
   */
  public async register(input: RegisterInput): Promise<User> {
    const existing = await this.repository.findByEmail(input.email);
    if (existing) {
      throw AppError.conflict("Email address already registered.");
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.repository.createUser({
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    // Generate verification token and email it (logged in dev)
    const rawToken = generateSecureToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + AUTH_CONSTANTS.TOKEN_EXPIRY.EMAIL_VERIFICATION_MS);
    await this.repository.createEmailVerificationToken(user.id, tokenHash, expiresAt);

    await this.mailService.sendVerificationEmail(user.email, rawToken);

    return user;
  }

  /**
   * Authenticates user credentials, managing brute-force lockout states and signing JWTs.
   */
  public async login(input: LoginInput, meta: DeviceMetadata): Promise<UserSession> {
    const user = await this.repository.findByEmail(input.email);

    // Fail securely to prevent user enumeration
    if (!user) {
      throw AppError.unauthorized("Invalid email or password.");
    }

    // Check brute-force lockout status
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw AppError.forbidden(
        `Account temporarily locked due to excessive failed attempts. Try again later.`
      );
    }

    const isValidPassword = await comparePassword(input.password, user.passwordHash);

    if (!isValidPassword) {
      const lockUntil =
        user.failedLoginAttempts + 1 >= AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS
          ? new Date(Date.now() + AUTH_CONSTANTS.LOCKOUT_DURATION_MS)
          : null;

      await this.repository.incrementFailedAttempts(user.id, user.failedLoginAttempts, lockUntil);

      if (lockUntil) {
        throw AppError.forbidden(
          "Too many failed login attempts. Your account has been temporarily locked."
        );
      }
      throw AppError.unauthorized("Invalid email or password.");
    }

    // Reset lock/attempts upon successful login
    if (user.failedLoginAttempts > 0) {
      await this.repository.resetFailedAttempts(user.id);
    }

    await this.repository.updateLastLogin(user.id);

    // Compile roles and permissions
    const roles = user.userRoles.map((ur) => ur.role.name);
    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => rp.permission.name)
    );

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      roles,
      permissions,
    };

    const accessToken = generateAccessToken(payload);
    const rawRefreshToken = generateSecureToken();
    const tokenHash = hashToken(rawRefreshToken);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days matching JWT expiration

    await this.repository.createRefreshToken(user.id, tokenHash, refreshExpiresAt, meta);

    const userContext: UserContext = {
      id: user.id,
      email: user.email,
      organizationId: user.organizationId,
      roles,
      permissions,
    };

    return {
      user: userContext,
      tokens: {
        accessToken,
        refreshToken: rawRefreshToken,
      },
    };
  }

  /**
   * Refreshes active sessions using standard token rotation (revoking old session and issuing new pair).
   */
  public async refresh(token: string, meta: DeviceMetadata): Promise<AuthTokens> {
    const payload = verifyRefreshToken(token);
    const tokenHash = hashToken(token);

    const storedToken = await this.repository.findRefreshToken(tokenHash);

    // If token does not exist in DB or was already revoked (potential theft/replay attack)
    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      if (storedToken && storedToken.revoked) {
        // Anti-replay trigger: breach detected, terminate all sessions for safety
        logger.warn(`⚠️ Revoked refresh token reuse detected for userId: ${payload.userId}. Invalidating all active sessions.`);
        await this.repository.revokeAllUserRefreshTokens(payload.userId);
      }
      throw AppError.unauthorized("Refresh token is invalid or expired.");
    }

    // Revoke current token immediately (rotation policy)
    await this.repository.revokeRefreshToken(tokenHash);

    // Verify user profile is still valid
    const user = await this.repository.findById(payload.userId);
    if (!user || user.deletedAt) {
      throw AppError.unauthorized("Authenticated user no longer active.");
    }

    const roles = user.userRoles.map((ur) => ur.role.name);
    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => rp.permission.name)
    );

    const newPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      roles,
      permissions,
    };

    const accessToken = generateAccessToken(newPayload);
    const newRawRefreshToken = generateSecureToken();
    const newHash = hashToken(newRawRefreshToken);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.repository.createRefreshToken(user.id, newHash, refreshExpiresAt, meta);

    return {
      accessToken,
      refreshToken: newRawRefreshToken,
    };
  }

  /**
   * Terminates the current device session by revoking the refresh token.
   */
  public async logout(token: string): Promise<void> {
    const tokenHash = hashToken(token);
    await this.repository.revokeRefreshToken(tokenHash);
  }

  /**
   * Terminates all device sessions for the authenticated user.
   */
  public async logoutAll(userId: string): Promise<void> {
    await this.repository.revokeAllUserRefreshTokens(userId);
  }

  /**
   * Generates a password reset token and sends it. Prevents user enumeration.
   */
  public async forgotPassword(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      logger.info(`🔍 Forgot password requested for non-existent email: ${email} (enumeration prevention active)`);
      return; // Return silently
    }

    // Revoke any previous active reset tokens
    await this.repository.revokePasswordResetTokens(user.id);

    const rawToken = generateSecureToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + AUTH_CONSTANTS.TOKEN_EXPIRY.PASSWORD_RESET_MS);

    await this.repository.createPasswordResetToken(user.id, tokenHash, expiresAt);

    await this.mailService.sendPasswordResetEmail(user.email, rawToken);
  }

  /**
   * Resets the password using a valid token and invalidates all active sessions.
   */
  public async resetPassword(input: ResetPasswordInput): Promise<void> {
    const tokenHash = hashToken(input.token);
    const resetRecord = await this.repository.findPasswordResetToken(tokenHash);

    if (
      !resetRecord ||
      resetRecord.used ||
      resetRecord.revoked ||
      resetRecord.expiresAt < new Date()
    ) {
      throw AppError.badRequest("Password reset token is invalid or expired.");
    }

    // Invalidate token
    await this.repository.markPasswordResetTokenUsed(resetRecord.id);

    // Hash new password and update user profile
    const passwordHash = await hashPassword(input.password);
    await this.repository.updateUserPassword(resetRecord.userId, passwordHash);

    // Terminate all active device refresh tokens
    await this.repository.revokeAllUserRefreshTokens(resetRecord.userId);
    logger.info(`🔒 Password reset successfully for userId: ${resetRecord.userId}. Terminated all active sessions.`);
  }

  /**
   * Verifies account email verification tokens.
   */
  public async verifyEmail(token: string): Promise<void> {
    const tokenHash = hashToken(token);
    const verificationRecord = await this.repository.findEmailVerificationToken(tokenHash);

    if (!verificationRecord || verificationRecord.used || verificationRecord.expiresAt < new Date()) {
      throw AppError.badRequest("Verification token is invalid or expired.");
    }

    await this.repository.markEmailVerificationTokenUsed(verificationRecord.id);
    await this.repository.verifyUserEmail(verificationRecord.userId);
  }
}

export const authService = new AuthService();
