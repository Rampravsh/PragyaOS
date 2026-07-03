-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'SUSPENDED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'STARTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('COURSE_STARTED', 'MODULE_STARTED', 'UNIT_STARTED', 'UNIT_COMPLETED', 'QUIZ_COMPLETED', 'ASSIGNMENT_SUBMITTED', 'COURSE_COMPLETED', 'ENROLLMENT_CANCELLED', 'ENROLLMENT_SUSPENDED', 'ENROLLMENT_RESUMED');

-- CreateEnum
CREATE TYPE "CourseCompletionReason" AS ENUM ('COMPLETED_ALL_UNITS', 'MANUALLY_COMPLETED', 'ADMIN_OVERRIDE');

-- CreateTable
CREATE TABLE "enrollments" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "source" VARCHAR(50) NOT NULL DEFAULT 'MANUAL',
    "purchase_ref" VARCHAR(100),
    "enrolled_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_progress" (
    "id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "learning_unit_id" UUID NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "completion_percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "watch_time" INTEGER NOT NULL DEFAULT 0,
    "last_position" INTEGER NOT NULL DEFAULT 0,
    "last_viewed_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "learning_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_sessions" (
    "id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "learning_unit_id" UUID,
    "device" VARCHAR(100),
    "browser" VARCHAR(100),
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(512),
    "status" "SessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ,
    "duration" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "learning_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_timeline" (
    "id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "event_type" "TimelineEventType" NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_completions" (
    "id" UUID NOT NULL,
    "enrollment_id" UUID NOT NULL,
    "progress_percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "completed_at" TIMESTAMPTZ,
    "eligible_for_certificate" BOOLEAN NOT NULL DEFAULT false,
    "estimated_remaining_seconds" INTEGER NOT NULL DEFAULT 0,
    "reason" "CourseCompletionReason" NOT NULL DEFAULT 'COMPLETED_ALL_UNITS',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "course_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "enrollments_user_id_idx" ON "enrollments"("user_id");

-- CreateIndex
CREATE INDEX "enrollments_course_id_idx" ON "enrollments"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_course_id_key" ON "enrollments"("user_id", "course_id");

-- CreateIndex
CREATE INDEX "learning_progress_enrollment_id_idx" ON "learning_progress"("enrollment_id");

-- CreateIndex
CREATE INDEX "learning_progress_learning_unit_id_idx" ON "learning_progress"("learning_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "learning_progress_enrollment_id_learning_unit_id_key" ON "learning_progress"("enrollment_id", "learning_unit_id");

-- CreateIndex
CREATE INDEX "learning_sessions_enrollment_id_idx" ON "learning_sessions"("enrollment_id");

-- CreateIndex
CREATE INDEX "learning_sessions_learning_unit_id_idx" ON "learning_sessions"("learning_unit_id");

-- CreateIndex
CREATE INDEX "learning_timeline_enrollment_id_idx" ON "learning_timeline"("enrollment_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_completions_enrollment_id_key" ON "course_completions"("enrollment_id");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_learning_unit_id_fkey" FOREIGN KEY ("learning_unit_id") REFERENCES "learning_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_learning_unit_id_fkey" FOREIGN KEY ("learning_unit_id") REFERENCES "learning_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_timeline" ADD CONSTRAINT "learning_timeline_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_completions" ADD CONSTRAINT "course_completions_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
