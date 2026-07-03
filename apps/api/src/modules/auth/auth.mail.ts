import { logger } from "../../lib/logger";

export class AuthMailService {
  /**
   * Dispatches an account verification token link.
   */
  public async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `https://pragyaos.com/verify-email?token=${token}`;
    logger.info(`✉️ Verification email sent to ${email}. Link: ${verificationLink}`);
  }

  /**
   * Dispatches a password reset link.
   */
  public async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetLink = `https://pragyaos.com/reset-password?token=${token}`;
    logger.info(`✉️ Password reset email sent to ${email}. Link: ${resetLink}`);
  }
}

export const authMailService = new AuthMailService();
