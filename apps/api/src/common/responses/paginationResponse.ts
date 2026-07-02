import { Response } from "express";
import { HttpStatusCode, HttpStatus } from "@pragyaos/constants";

export interface PaginatedEnvelope<T> {
  success: true;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class PaginationResponse {
  static send<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    statusCode: HttpStatusCode = HttpStatus.OK
  ): void {
    const totalPages = Math.ceil(total / limit);
    const envelope: PaginatedEnvelope<T> = {
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
    res.status(statusCode).json(envelope);
  }
}
