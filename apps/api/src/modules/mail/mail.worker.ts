import { Worker, Job } from "bullmq";
import { config } from "../../config";
import { MAIL_CONFIG } from "./mail.config";
import { SendEmailJobPayload, EmailProvider } from "./mail.types";
import { smtpEmailProvider } from "./mail.provider";
import { logger } from "../../lib/logger";

export class MailWorker {
  private worker: Worker<SendEmailJobPayload>;

  constructor(private readonly provider: EmailProvider = smtpEmailProvider) {
    this.worker = new Worker<SendEmailJobPayload>(
      MAIL_CONFIG.queueName,
      async (job: Job<SendEmailJobPayload>) => {
        const { to, subject, html, text } = job.data;
        logger.info(`🔄 Processing email job ${job.id} for recipient: ${to}`);

        await this.provider.send({
          to,
          subject,
          html,
          text,
        });
      },
      {
        connection: {
          url: config.redis.url,
        },
        concurrency: 5, // Process up to 5 emails in parallel
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ Mail job ${job.id} completed successfully.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ Mail job ${job?.id} failed with error: ${err.message}`);
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 Mail worker encountered a critical error: ${err.message}`);
    });
  }

  /**
   * Gracefully shuts down the queue worker connection.
   */
  public async close(): Promise<void> {
    await this.worker.close();
  }
}

// Instantiate worker singleton
export const mailWorker = new MailWorker();
export default mailWorker;
