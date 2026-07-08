import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3001/api'),
  VITE_APP_NAME: z.string().default('PragyaOS'),
  DEV: z.boolean().default(true),
});

// Safe parse variables from Vite's import.meta.env
const parsed = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  DEV: import.meta.env.DEV,
});

if (!parsed.success) {
  console.error('❌ Environment validation failed:', parsed.error.format());
  throw new Error('Environment validation failed');
}

export const env = {
  apiUrl: parsed.data.VITE_API_URL,
  appName: parsed.data.VITE_APP_NAME,
  isDev: parsed.data.DEV,
} as const;
