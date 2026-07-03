import { mailQueue } from "./mail.queue";
import { getEmailVerificationTemplate, getPasswordResetTemplate } from "./mail.templates";
import { logger } from "../../lib/logger";

export class MailService {
  /**
   * Enqueues an email job to the async processing queue.
   */
  public async send(options: { to: string; subject: string; html: string; text?: string }): Promise<void> {
    try {
      await mailQueue.add("send-email", {
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      logger.info(`📥 Enqueued email job to ${options.to} (Subject: "${options.subject}")`);
    } catch (err: any) {
      logger.error(`❌ Failed to enqueue email job for ${options.to}. Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * Enqueues an account email verification email.
   */
  public async sendVerificationEmail(to: string, token: string): Promise<void> {
    const template = getEmailVerificationTemplate(token);
    await this.send({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Enqueues a password reset link email.
   */
  public async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const template = getPasswordResetTemplate(token);
    await this.send({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}

export const mailService = new MailService();
