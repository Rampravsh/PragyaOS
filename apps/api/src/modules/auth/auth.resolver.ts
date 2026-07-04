import { authRepository } from "./auth.repository";
import { redisClient } from "../../lib/redis";
import { ALL_SYSTEM_PERMISSIONS } from "./auth.permissions";
import { logger } from "../../lib/logger";

export class PermissionResolver {
  private readonly CACHE_TTL_SECONDS = 3600; // 1 hour cache lifespan
  private readonly CACHE_PREFIX = "user:perms:";

  /**
   * Resolves all distinct permissions for a user from their roles.
   * If the user holds the 'SUPER_ADMIN' role, automatically returns all system permissions.
   */
  public async resolvePermissions(userId: string): Promise<string[]> {
    const cacheKey = `${this.CACHE_PREFIX}${userId}`;

    // 1. Attempt cache retrieval
    try {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err: any) {
      logger.error(`Error reading permissions cache: ${err.message}`);
    }

    // 2. Fetch roles and permissions from database
    const userRoles = await authRepository.findRolesWithPermissionsByUserId(userId);

    const roleNames = userRoles.map((ur) => ur.role.name);

    // Super Admin bypass: grant all system permissions
    if (roleNames.includes("SUPER_ADMIN")) {
      const allPerms = [...ALL_SYSTEM_PERMISSIONS];
      await this.cachePermissions(userId, allPerms);
      return allPerms;
    }

    // Gather distinct permission keys
    const permissionSet = new Set<string>();
    for (const ur of userRoles) {
      for (const rp of ur.role.rolePermissions) {
        permissionSet.add(rp.permission.name);
      }
    }

    const permissions = Array.from(permissionSet);

    // 3. Cache the resolved permission set
    await this.cachePermissions(userId, permissions);

    return permissions;
  }

  /**
   * Clears the permission cache for a specific user.
   */
  public async invalidateCache(userId: string): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}${userId}`;
    await redisClient.del(cacheKey);
    logger.info(`♻️ Invalidated permission cache for userId: ${userId}`);
  }

  /**
   * Helper to write values into Redis.
   */
  private async cachePermissions(userId: string, permissions: string[]): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}${userId}`;
    try {
      await redisClient.set(
        cacheKey,
        JSON.stringify(permissions),
        this.CACHE_TTL_SECONDS
      );
    } catch (err: any) {
      logger.error(`Failed to cache permissions: ${err.message}`);
    }
  }
}

export const permissionResolver = new PermissionResolver();
export default permissionResolver;
