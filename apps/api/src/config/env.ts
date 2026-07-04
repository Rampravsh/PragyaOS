import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  PORT: z.string().default("3001").transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),
  REDIS_URL: z.string().url("REDIS_URL must be a valid Redis connection string"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  JWT_EXPIRE: z.string().default("15m"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters long"),
  JWT_REFRESH_EXPIRE: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("*"),
  RATE_LIMIT_WINDOW_MS: z.string().default("60000").transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX: z.string().default("100").transform((val) => parseInt(val, 10)),
  CLOUDINARY_URL: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),

  // Email Config
  SMTP_HOST: z.string().default("127.0.0.1"),
  SMTP_PORT: z.string().default("1025").transform((val) => parseInt(val, 10)),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_SECURE: z.string().default("false").transform((val) => val === "true"),
  MAIL_FROM: z.string().default("PragyaOS <noreply@pragyaos.com>"),

  // Cloudflare R2 Storage (S3-compatible API)
  CLOUDFLARE_R2_ACCOUNT_ID: z.string().default("dummy-account-id"),
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().default("dummy-key"),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().default("dummy-secret"),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().default("pragyaos-media"),
  CLOUDFLARE_R2_PUBLIC_URL: z.string().optional(),

  // Media Configurable File Size Limits
  MEDIA_MAX_IMAGE_SIZE_BYTES: z.string().default("5242880").transform((val) => parseInt(val, 10)), // 5MB
  MEDIA_MAX_FILE_SIZE_BYTES: z.string().default("104857600").transform((val) => parseInt(val, 10)), // 100MB

  // Search (Meilisearch)
  MEILISEARCH_HOST: z.string().url().default("http://localhost:7700"),
  MEILISEARCH_API_KEY: z.string().optional().default(""),
  MEILISEARCH_INDEX_PREFIX: z.string().optional().default("pragyaos_"),
});

type EnvConfig = z.infer<typeof envSchema>;

const parseEnv = (): EnvConfig => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment configurations:");
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  return result.data;
};

export const env = parseEnv();
