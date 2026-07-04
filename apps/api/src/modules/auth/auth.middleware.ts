import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./auth.tokens";
import { permissionResolver } from "./auth.resolver";
import { AppError } from "../../common/errors/appError";
import { asyncHandler } from "../../utils/asyncHandler";
import { userRepository } from "../users/user.repository";
import { logger } from "../../lib/logger";

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
      organizationId: null,
      roles: userPayload.roles,
      permissions: userPayload.permissions,
    };

    next();
  }
);

/**
 * Enforces that the authenticated user possesses a specific permission.
 * Bypassed automatically if the user holds the 'SUPER_ADMIN' role.
 */
export const requirePermission = (permission: string) => {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw AppError.unauthorized("Authentication context missing.");
    }

    const resolvedPerms = await permissionResolver.resolvePermissions(req.user.id);

    // Check if user has permission OR is Super Admin (which gets ALL perms from resolver)
    if (resolvedPerms.includes(permission)) {
      logger.info(`🛡️ [RBAC] Authorization success: userId: ${req.user.id} matched permission: ${permission}`);
      return next();
    }

    logger.warn(`🚨 [RBAC] Authorization denied: userId: ${req.user.id} missing permission: ${permission}`);
    throw AppError.forbidden("You do not have permission to access this resource.");
  });
};

/**
 * Enforces that the authenticated user possesses AT LEAST ONE of the specified permissions.
 */
export const requireAnyPermission = (permissions: string[]) => {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw AppError.unauthorized("Authentication context missing.");
    }

    const resolvedPerms = await permissionResolver.resolvePermissions(req.user.id);
    const hasAny = permissions.some((perm) => resolvedPerms.includes(perm));

    if (hasAny) {
      logger.info(`🛡️ [RBAC] Authorization success: userId: ${req.user.id} matched one of: [${permissions.join(", ")}]`);
      return next();
    }

    logger.warn(`🚨 [RBAC] Authorization denied: userId: ${req.user.id} missing all of: [${permissions.join(", ")}]`);
    throw AppError.forbidden("You do not have permission to access this resource.");
  });
};

/**
 * Enforces that the authenticated user possesses ALL of the specified permissions.
 */
export const requireAllPermissions = (permissions: string[]) => {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw AppError.unauthorized("Authentication context missing.");
    }

    const resolvedPerms = await permissionResolver.resolvePermissions(req.user.id);
    const hasAll = permissions.every((perm) => resolvedPerms.includes(perm));

    if (hasAll) {
      logger.info(`🛡️ [RBAC] Authorization success: userId: ${req.user.id} matched all of: [${permissions.join(", ")}]`);
      return next();
    }

    logger.warn(`🚨 [RBAC] Authorization denied: userId: ${req.user.id} missing some of: [${permissions.join(", ")}]`);
    throw AppError.forbidden("You do not have permission to access this resource.");
  });
};

/**
 * Enforces broad role membership checks.
 * Bypassed automatically if the user holds the 'SUPER_ADMIN' role.
 */
export const requireRole = (role: string) => {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw AppError.unauthorized("Authentication context missing.");
    }

    // Resolve roles fresh from the database to prevent token spoofing
    const userRoles = await userRepository.findRolesByUserId(req.user.id);

    const roleNames = userRoles.map((ur) => ur.role.name);

    if (roleNames.includes(role) || roleNames.includes("SUPER_ADMIN")) {
      logger.info(`🛡️ [RBAC] Role verification success: userId: ${req.user.id} matched role: ${role}`);
      return next();
    }

    logger.warn(`🚨 [RBAC] Role verification denied: userId: ${req.user.id} missing role: ${role}`);
    throw AppError.forbidden("You do not have membership in the required security role.");
  });
};

/**
 * Reusable Guard helper namespace to streamline route declaration syntax.
 * E.g. router.post("/courses", Guard.Permission("course:create"), controller.create)
 */
export const Guard = {
  Auth: () => [requireAuth],
  Permission: (permission: string) => [requireAuth, requirePermission(permission)],
  AnyPermission: (permissions: string[]) => [requireAuth, requireAnyPermission(permissions)],
  AllPermissions: (permissions: string[]) => [requireAuth, requireAllPermissions(permissions)],
  Role: (role: string) => [requireAuth, requireRole(role)],
};
