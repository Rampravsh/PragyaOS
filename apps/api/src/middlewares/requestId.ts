import { Request, Response, NextFunction } from "express";
import { generateNanoId } from "../utils/nanoid";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const reqId = (req.headers["x-request-id"] as string) || generateNanoId(16);
  req.id = reqId;
  res.setHeader("x-request-id", reqId);
  next();
};
