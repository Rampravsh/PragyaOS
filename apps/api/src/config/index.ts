import { env } from "./env";

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  database: {
    url: env.DATABASE_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRE,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRE,
  },
  security: {
    corsOrigin: env.CORS_ORIGIN,
    rateLimit: {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX,
    },
  },
  cloudinary: env.CLOUDINARY_URL,
  payments: {
    razorpayKeyId: env.RAZORPAY_KEY_ID,
    razorpayKeySecret: env.RAZORPAY_KEY_SECRET,
  },
  mail: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    secure: env.SMTP_SECURE,
    from: env.MAIL_FROM,
  },
  storage: {
    r2: {
      accountId: env.CLOUDFLARE_R2_ACCOUNT_ID,
      accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      bucketName: env.CLOUDFLARE_R2_BUCKET_NAME,
      publicUrl: env.CLOUDFLARE_R2_PUBLIC_URL,
    },
    limits: {
      maxImageSizeBytes: env.MEDIA_MAX_IMAGE_SIZE_BYTES,
      maxFileSizeBytes: env.MEDIA_MAX_FILE_SIZE_BYTES,
    },
  },
};

export * from "./env";
