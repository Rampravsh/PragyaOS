import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "./config";
import { requestId } from "./middlewares/requestId";
import { requestLogger } from "./middlewares/requestLogger";
import { rateLimiter } from "./middlewares/rateLimiter";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";
import apiRouter from "./routes";

const app = express();

// Trust reverse proxy (e.g. Nginx, Cloudflare, AWS ALB) for correct client IPs in headers
app.set("trust proxy", 1);

// Global Middleware Chain
app.use(requestId);
app.use(requestLogger);
app.use(helmet());
app.use(cors({ origin: config.security.corsOrigin, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting for public routes
app.use(rateLimiter);

// Root routes orchestrations
app.use(apiRouter);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
