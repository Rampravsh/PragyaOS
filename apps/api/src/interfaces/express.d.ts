import { UserContext } from "../common/types/context.type";

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      user?: UserContext;
    }
  }
}
