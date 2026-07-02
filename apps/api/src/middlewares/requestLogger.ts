import morgan, { StreamOptions } from "morgan";
import { logger } from "../lib/logger";
import { env } from "../config/env";

// Stream configuration that redirects Morgan outputs to Winston http level
const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

// Skip logging HTTP requests in test environment
const skip = () => {
  return env.NODE_ENV === "test";
};

// Morgan configuration format: standard dev format for local, combined for prod
const format = () => {
  return env.NODE_ENV === "development" ? "dev" : ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" - :response-time ms";
};

export const requestLogger = morgan(format(), { stream, skip });
