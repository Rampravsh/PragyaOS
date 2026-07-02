import { BaseError } from "./baseError";
import { HttpStatusCode } from "../constants/httpStatus";

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
    return new AppError(400, message, details);
  }

  static unauthorized(message: string) {
    return new AppError(401, message);
  }

  static forbidden(message: string) {
    return new AppError(403, message);
  }

  static notFound(message: string) {
    return new AppError(404, message);
  }

  static conflict(message: string) {
    return new AppError(409, message);
  }

  static unprocessable(message: string, details: any[] | null = null) {
    return new AppError(422, message, details);
  }

  static internal(message: string) {
    return new AppError(500, message, null, false);
  }
}
