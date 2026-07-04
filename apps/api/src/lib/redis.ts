import { createClient, RedisClientType } from "redis";
import { config } from "../config";
import { logger } from "./logger";

class RedisClientService {
  private client: RedisClientType | null = null;
  private isConnected = false;

  constructor() {
    // Only initialize and connect if not in a testing environment
    if (config.env !== "test") {
      this.client = createClient({
        url: config.redis.url,
      });

      this.client.on("connect", () => {
        logger.info("🔌 Redis client connecting...");
      });

      this.client.on("ready", () => {
        this.isConnected = true;
        logger.info("✅ Redis client connected and ready.");
      });

      this.client.on("error", (err) => {
        logger.error(`❌ Redis client connection error: ${err.message}`);
      });

      this.client.on("end", () => {
        this.isConnected = false;
        logger.warn("🔌 Redis client connection ended.");
      });

      // Fire async connection
      this.client.connect().catch((err) => {
        logger.error(`🚨 Redis connection failed: ${err.message}`);
      });
    }
  }

  /**
   * Resolves a key's string value. Returns null if key not found or Redis disabled.
   */
  public async get(key: string): Promise<string | null> {
    if (!this.client || !this.isConnected) return null;
    try {
      return await this.client.get(key);
    } catch (err: any) {
      logger.error(`Redis GET error for key ${key}: ${err.message}`);
      return null;
    }
  }

  public async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, { EX: ttlSeconds });
      } else {
        await this.client.set(key, value);
      }
    } catch (err: any) {
      logger.error(`Redis SET error for key ${key}: ${err.message}`);
    }
  }

  /**
   * Sets a key only if it does not already exist (NX), with a TTL.
   * Returns true if the key was set, false if it already existed.
   */
  public async setNX(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    if (!this.client || !this.isConnected) return true; // Fail-open for test/development
    try {
      const result = await this.client.set(key, value, {
        NX: true,
        EX: ttlSeconds,
      });
      return result === "OK";
    } catch (err: any) {
      logger.error(`Redis setNX error for key ${key}: ${err.message}`);
      return false; // Handled per-environment at the service level (fail-closed in prod)
    }
  }

  /**
   * Invalidates a key or pattern from cache.
   */
  public async del(key: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      await this.client.del(key);
    } catch (err: any) {
      logger.error(`Redis DEL error for key ${key}: ${err.message}`);
    }
  }
}

export const redisClient = new RedisClientService();
export default redisClient;
