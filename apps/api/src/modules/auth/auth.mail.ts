import { mailService } from "../mail/mail.service";

export class AuthMailService {
  /**
   * Dispatches an account verification token link via async queue.
   */
  public async sendVerificationEmail(email: string, token: string): Promise<void> {
    await mailService.sendVerificationEmail(email, token);
  }

  /**
   * Dispatches a password reset link via async queue.
   */
  public async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    await mailService.sendPasswordResetEmail(email, token);
  }
}

export const authMailService = new AuthMailService();
