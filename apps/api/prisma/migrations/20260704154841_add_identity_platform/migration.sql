-- CreateEnum
CREATE TYPE "CredentialStatus" AS ENUM ('PENDING', 'ISSUED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "VerificationSource" AS ENUM ('PUBLIC_PAGE', 'API', 'ADMIN');

-- CreateTable
CREATE TABLE "credential_templates" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "template_version" VARCHAR(50) NOT NULL,
    "html_template" TEXT NOT NULL,
    "css_template" TEXT NOT NULL,
    "branding" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "credential_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "id" UUID NOT NULL,
    "credential_number" VARCHAR(100) NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "template_id" UUID NOT NULL,
    "issued_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ,
    "verification_token" VARCHAR(255) NOT NULL,
    "verification_hash" VARCHAR(255) NOT NULL,
    "status" "CredentialStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential_verifications" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "verified_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(512),
    "source" "VerificationSource" NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "credential_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential_revocations" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "reason" TEXT,
    "revoked_by" UUID NOT NULL,
    "revoked_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "credential_revocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credential_templates_slug_key" ON "credential_templates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_credential_number_key" ON "credentials"("credential_number");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_verification_token_key" ON "credentials"("verification_token");

-- CreateIndex
CREATE INDEX "credentials_user_id_idx" ON "credentials"("user_id");

-- CreateIndex
CREATE INDEX "credentials_course_id_idx" ON "credentials"("course_id");

-- CreateIndex
CREATE INDEX "credentials_template_id_idx" ON "credentials"("template_id");

-- CreateIndex
CREATE INDEX "credential_verifications_credential_id_idx" ON "credential_verifications"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "credential_revocations_credential_id_key" ON "credential_revocations"("credential_id");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "credential_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credential_verifications" ADD CONSTRAINT "credential_verifications_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credential_revocations" ADD CONSTRAINT "credential_revocations_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credential_revocations" ADD CONSTRAINT "credential_revocations_revoked_by_fkey" FOREIGN KEY ("revoked_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
