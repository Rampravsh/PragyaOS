import app from "./app";
import { config } from "./config";
import { logger } from "./lib/logger";
import { mailWorker } from "./modules/mail/mail.worker";
import { mediaWorker } from "./modules/media/media.worker";
import { paymentWorker } from "./modules/commerce/payment/payment.worker";
import { fulfillmentWorker } from "./modules/commerce/fulfillment/fulfillment.worker";
import { enrollmentWorker } from "./modules/commerce/fulfillment/enrollment.worker";
import { invoiceWorker } from "./modules/commerce/fulfillment/invoice.worker";
import { notificationWorker } from "./modules/commerce/fulfillment/notification.worker";
import { analyticsWorker } from "./modules/commerce/fulfillment/analytics.worker";
import { notificationInAppWorker } from "./modules/notifications/notification-inapp.worker";
// Activates cross-domain event subscriptions at bootstrap
import "./modules/notifications/notifications.event-consumer";

const server = app.listen(config.port, () => {
  logger.info(`🚀 [API Server] Active on port ${config.port} in [${config.env}] environment`);
});

// Process event handlers for safety
const handleFatalError = async (error: Error) => {
  logger.error(`❌ Fatal Error Encountered: ${error.message}\n${error.stack}`);
  
  try {
    await mailWorker.close();
    logger.info("[Mail Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Mail Worker] Error during close: ${err.message}`);
  }

  try {
    await mediaWorker.close();
    logger.info("[Media Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Media Worker] Error during close: ${err.message}`);
  }

  try {
    await paymentWorker.close();
    logger.info("[Payment Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Payment Worker] Error during close: ${err.message}`);
  }

  try {
    await fulfillmentWorker.close();
    await enrollmentWorker.close();
    await invoiceWorker.close();
    await notificationWorker.close();
    await analyticsWorker.close();
    logger.info("[Fulfillment Workers] Queue connections closed.");
  } catch (err: any) {
    logger.error(`[Fulfillment Workers] Error during close: ${err.message}`);
  }

  try {
    await notificationInAppWorker.close();
    logger.info("[Notification InApp Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Notification InApp Worker] Error during close: ${err.message}`);
  }

  if (server) {
    server.close(() => {
      logger.info("[API Server] Server connections flushed. Exiting process.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  handleFatalError(error);
});

process.on("unhandledRejection", (reason: any) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  handleFatalError(error);
});

// Graceful shutdown on SIGTERM / SIGINT
const handleShutdown = async (signal: string) => {
  logger.info(`📡 [API Server] Received ${signal} signal. Starting graceful shutdown...`);
  
  try {
    await mailWorker.close();
    logger.info("[Mail Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Mail Worker] Error closing connection: ${err.message}`);
  }

  try {
    await mediaWorker.close();
    logger.info("[Media Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Media Worker] Error closing connection: ${err.message}`);
  }

  try {
    await paymentWorker.close();
    logger.info("[Payment Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Payment Worker] Error closing connection: ${err.message}`);
  }

  try {
    await fulfillmentWorker.close();
    await enrollmentWorker.close();
    await invoiceWorker.close();
    await notificationWorker.close();
    await analyticsWorker.close();
    logger.info("[Fulfillment Workers] Queue connections closed.");
  } catch (err: any) {
    logger.error(`[Fulfillment Workers] Error closing connection: ${err.message}`);
  }

  try {
    await notificationInAppWorker.close();
    logger.info("[Notification InApp Worker] Queue connection closed.");
  } catch (err: any) {
    logger.error(`[Notification InApp Worker] Error closing connection: ${err.message}`);
  }

  if (server) {
    server.close(() => {
      logger.info("[API Server] Server closed gracefully. Process terminating.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
