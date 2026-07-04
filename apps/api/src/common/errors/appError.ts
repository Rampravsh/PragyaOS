import { BaseError } from "./baseError";
import { HttpStatusCode, HttpStatus } from "@pragyaos/constants";

export class AppError extends BaseError {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly details: any[] | null;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    details: any[] | null = null,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
  }

  static badRequest(message: string, details: any[] | null = null) {
    return new AppError(HttpStatus.BAD_REQUEST, message, details);
  }

  static unauthorized(message: string) {
    return new AppError(HttpStatus.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new AppError(HttpStatus.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new AppError(HttpStatus.NOT_FOUND, message);
  }

  static conflict(message: string, details: any[] | null = null) {
    return new AppError(HttpStatus.CONFLICT, message, details);
  }

  static unprocessable(message: string, details: any[] | null = null) {
    return new AppError(HttpStatus.UNPROCESSABLE_ENTITY, message, details);
  }

  static internal(message: string) {
    return new AppError(HttpStatus.INTERNAL_SERVER_ERROR, message, null, false);
  }
}
