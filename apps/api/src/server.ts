import app from "./app";
import { config } from "./config";
import { logger } from "./lib/logger";

const server = app.listen(config.port, () => {
  logger.info(`🚀 [API Server] Active on port ${config.port} in [${config.env}] environment`);
});

// Process event handlers for safety
const handleFatalError = (error: Error) => {
  logger.error(`❌ Fatal Error Encountered: ${error.message}\n${error.stack}`);
  
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
const handleShutdown = (signal: string) => {
  logger.info(`📡 [API Server] Received ${signal} signal. Starting graceful shutdown...`);
  
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
