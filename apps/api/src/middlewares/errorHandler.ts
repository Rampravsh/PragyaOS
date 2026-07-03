import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/appError";
import { logger } from "../lib/logger";
import { env } from "../config/env";
import { HttpStatus } from "@pragyaos/constants";
import { mapPrismaError } from "../database/errorMapper";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const isDevelopment = env.NODE_ENV === "development";

  // Map database/Prisma errors to AppErrors
  const mappedError = mapPrismaError(err);

  // Log error using Winston logger
  logger.error(
    `${mappedError.name}: ${mappedError.message} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip}\nStack: ${mappedError.stack}`
  );

  // If the error is an expected AppError
  if (mappedError instanceof AppError) {
    const errorCode =
      Object.keys(HttpStatus).find(
        (key) => HttpStatus[key as keyof typeof HttpStatus] === mappedError.statusCode
      ) || "API_ERROR";

    res.status(mappedError.statusCode).json({
      success: false,
      error: {
        code: errorCode,
        message: mappedError.message,
        details: mappedError.details,
        ...(isDevelopment && { stack: mappedError.stack }),
      },
    });
    return;
  }

  // If the error is unexpected, return an internal server error envelope
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred on the server.",
      ...(isDevelopment && { stack: mappedError.stack }),
    },
  });
};
