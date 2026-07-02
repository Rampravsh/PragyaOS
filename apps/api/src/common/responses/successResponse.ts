import { Response } from "express";
import { HttpStatusCode, HttpStatus } from "@pragyaos/constants";

export interface SuccessEnvelope<T> {
  success: true;
  data: T;
  message?: string;
}

export class SuccessResponse {
  static send<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: HttpStatusCode = HttpStatus.OK
  ): void {
    const envelope: SuccessEnvelope<T> = {
      success: true,
      data,
      ...(message && { message }),
    };
    res.status(statusCode).json(envelope);
  }

  static created<T>(res: Response, data: T, message?: string): void {
    this.send(res, data, message, HttpStatus.CREATED);
  }

  static noContent(res: Response): void {
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
