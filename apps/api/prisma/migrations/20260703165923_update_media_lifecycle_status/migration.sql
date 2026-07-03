-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MediaStatus" ADD VALUE 'UPLOADING';
ALTER TYPE "MediaStatus" ADD VALUE 'UPLOADED';
ALTER TYPE "MediaStatus" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "user_id" UUID,
ALTER COLUMN "status" SET DEFAULT 'UPLOADING';

-- CreateIndex
CREATE INDEX "media_user_id_idx" ON "media"("user_id");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
