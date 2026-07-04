import { redisClient } from "../../../lib/redis";
import { logger } from "../../../lib/logger";
import { config } from "../../../config";

export class PaymentIdempotencyService {
  /**
   * Attempts to acquire an atomic lock for a given key.
   * Fails-closed in production if Redis is down or lock is held.
   */
  public async acquireLock(key: string, ttlSeconds: number): Promise<boolean> {
    try {
      const isNew = await redisClient.setNX(key, "locked", ttlSeconds);
      return isNew;
    } catch (err: any) {
      logger.error(`[Idempotency] Failed to acquire lock for key ${key}: ${err.message}`);
      if (config.env === "production") {
        return false; // Fail-closed in production to prevent duplicate payment attempts
      }
      return true; // Fail-open for testing/dev environments
    }
  }

  /**
   * Releases a lock key from Redis.
   */
  public async releaseLock(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (err: any) {
      logger.error(`[Idempotency] Failed to release lock for key ${key}: ${err.message}`);
    }
  }

  /**
   * Checks if an event key has already been successfully processed.
   * Fails-closed in production (assumes processed to avoid double fulfillment).
   */
  public async hasProcessed(key: string): Promise<boolean> {
    try {
      const value = await redisClient.get(key);
      return value === "processed";
    } catch (err: any) {
      logger.error(`[Idempotency] Failed to check key ${key}: ${err.message}`);
      if (config.env === "production") {
        return true; // Fail-closed in production to prevent duplicate processing
      }
      return false; // Fail-open for dev/testing
    }
  }

  /**
   * Marks a lock key as permanently processed.
   */
  public async markProcessed(key: string, ttlSeconds: number): Promise<void> {
    try {
      await redisClient.set(key, "processed", ttlSeconds);
    } catch (err: any) {
      logger.error(`[Idempotency] Failed to mark key ${key} as processed: ${err.message}`);
    }
  }
}

export const paymentIdempotencyService = new PaymentIdempotencyService();
export default paymentIdempotencyService;
