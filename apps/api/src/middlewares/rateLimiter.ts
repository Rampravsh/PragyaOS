import rateLimit from "express-rate-limit";
import { config } from "../config";
import { AppError } from "../common/errors/appError";
import { Messages } from "../common/constants/messages";

export const rateLimiter = rateLimit({
  windowMs: config.security.rateLimit.windowMs,
  max: config.security.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError(429, Messages.GLOBAL.RATE_LIMIT));
  },
});
