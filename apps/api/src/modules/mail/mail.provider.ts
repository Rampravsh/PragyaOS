import nodemailer from "nodemailer";
import { EmailProvider, SendMailOptions } from "./mail.types";
import { MAIL_CONFIG } from "./mail.config";
import { logger } from "../../lib/logger";

export class SmtpEmailProvider implements EmailProvider {
  public readonly name = "SMTP";
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_CONFIG.smtp.host,
      port: MAIL_CONFIG.smtp.port,
      secure: MAIL_CONFIG.smtp.secure,
      auth: MAIL_CONFIG.smtp.auth,
      tls: {
        rejectUnauthorized: false, // Useful for self-signed certificates in local envs
      },
    });
  }

  /**
   * Dispatches mail options via Nodemailer.
   */
  public async send(options: SendMailOptions): Promise<void> {
    const from = options.from || MAIL_CONFIG.defaults.from;

    try {
      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      logger.info(`✉️ [SMTP] Email sent successfully to ${options.to}`);
    } catch (err: any) {
      logger.error(`❌ [SMTP] Failed to send email to ${options.to}. Error: ${err.message}`);
      throw err;
    }
  }
}

export const smtpEmailProvider = new SmtpEmailProvider();
