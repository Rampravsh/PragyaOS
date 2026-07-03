import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./auth.tokens";
import { AppError } from "../../common/errors/appError";
import { asyncHandler } from "../../utils/asyncHandler";

/**
 * Route protection middleware that validates Bearer JWT access tokens.
 */
export const requireAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw AppError.unauthorized("Authentication is required to access this resource.");
    }

    const token = authHeader.split(" ")[1];
    const userPayload = verifyAccessToken(token);

    // Attach verified user context to request
    req.user = {
      id: userPayload.userId,
      email: userPayload.email,
      organizationId: null, // Resolves in multi-tenancy layers
      roles: userPayload.roles,
      permissions: userPayload.permissions,
    };

    next();
  }
);
