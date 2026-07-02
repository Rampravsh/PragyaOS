import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/appError";
import { Messages } from "@pragyaos/constants";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(AppError.notFound(`${Messages.GLOBAL.NOT_FOUND} - [${req.method}] ${req.originalUrl}`));
};
