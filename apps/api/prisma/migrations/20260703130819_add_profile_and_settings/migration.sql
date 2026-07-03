-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "display_name" VARCHAR(100),
ADD COLUMN     "language" VARCHAR(10) DEFAULT 'en',
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "timezone" VARCHAR(100) DEFAULT 'UTC';
