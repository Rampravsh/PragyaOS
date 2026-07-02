import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/appError";
import { logger } from "../lib/logger";
import { env } from "../config/env";
import { HttpStatus } from "../common/constants/httpStatus";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const isDevelopment = env.NODE_ENV === "development";

  // Log error using Winston logger
  logger.error(
    `${err.name}: ${err.message} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip}\nStack: ${err.stack}`
  );

  // If the error is an expected AppError
  if (err instanceof AppError) {
    const errorCode = Object.keys(HttpStatus).find(
      (key) => HttpStatus[key as keyof typeof HttpStatus] === err.statusCode
    ) || "API_ERROR";

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: errorCode,
        message: err.message,
        details: err.details,
        ...(isDevelopment && { stack: err.stack }),
      },
    });
    return;
  }

  // If the error is unexpected, return an internal server error envelope
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: isDevelopment ? err.message : "An unexpected server error occurred.",
      ...(isDevelopment && { stack: err.stack }),
    },
  });
};
