-- AlterEnum
ALTER TYPE "CourseStatus" ADD VALUE 'SCHEDULED';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "change_summary" TEXT,
ADD COLUMN     "revision_number" INTEGER NOT NULL DEFAULT 1;
