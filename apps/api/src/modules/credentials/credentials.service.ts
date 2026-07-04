import { randomUUID } from "crypto";
import * as crypto from "crypto";
import { AppError } from "../../common/errors/appError";
import { logger } from "../../lib/logger";
import {
  credentialTemplateRepository,
  credentialRepository,
  credentialVerificationRepository,
  credentialRevocationRepository,
  PrismaCredentialTemplateRepository,
  PrismaCredentialRepository,
  PrismaCredentialVerificationRepository,
  PrismaCredentialRevocationRepository,
} from "./credentials.repository";
import {
  CreateTemplateInput,
  UpdateTemplateInput,
  IssueCredentialInput,
  VerifyCredentialInput,
  RevokeCredentialInput,
} from "./credentials.schemas";
import { credentialsEvents, CredentialsEventEmitter } from "./credentials.events";
import { CredentialStatus, VerificationSource } from "@prisma/client";

export class CredentialService {
  constructor(
    private readonly templates: PrismaCredentialTemplateRepository = credentialTemplateRepository,
    private readonly credentials: PrismaCredentialRepository = credentialRepository,
    private readonly verifications: PrismaCredentialVerificationRepository = credentialVerificationRepository,
    private readonly revocations: PrismaCredentialRevocationRepository = credentialRevocationRepository,
    private readonly events: CredentialsEventEmitter = credentialsEvents
  ) {}

  /**
   * Registers a new certificate template.
   */
  public async createTemplate(input: CreateTemplateInput): Promise<any> {
    const existing = await this.templates.findBySlug(input.slug);
    if (existing) {
      throw AppError.badRequest(`Template slug '${input.slug}' is already in use.`);
    }

    const template = await this.templates.create({
      name: input.name,
      slug: input.slug,
      templateVersion: input.templateVersion,
      htmlTemplate: input.htmlTemplate,
      cssTemplate: input.cssTemplate,
      branding: input.branding ?? undefined,
      active: true,
    });

    return template;
  }

  /**
   * Updates an existing certificate template.
   * If template has already issued credentials, critical layout properties are locked.
   */
  public async updateTemplate(id: string, input: UpdateTemplateInput): Promise<any> {
    const template = await this.templates.findById(id);
    if (!template) {
      throw AppError.notFound(`Template '${id}' not found.`);
    }

    const hasIssued = await this.credentials.hasIssuedForTemplate(id);
    if (hasIssued) {
      // Check if trying to modify layout/critical rendering properties
      const isLayoutModified =
        input.htmlTemplate !== undefined ||
        input.cssTemplate !== undefined ||
        input.branding !== undefined ||
        input.slug !== undefined ||
        input.templateVersion !== undefined;

      if (isLayoutModified) {
        throw AppError.badRequest(
          "Template has already issued credentials. Layout changes are prohibited to preserve historical accuracy. Please register a new template version."
        );
      }
    }

    const updated = await this.templates.update(id, {
      name: input.name,
      active: input.active,
    });

    this.events.emitTemplateUpdated({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      templateId: updated.id,
      slug: updated.slug,
      templateVersion: updated.templateVersion,
    });

    return updated;
  }

  /**
   * Issues a new academic credential to a student.
   * Ensures the student doesn't receive duplicate active credentials for the same course.
   */
  public async issueCredential(input: IssueCredentialInput): Promise<any> {
    const { userId, courseId, templateId, expiresAt, metadata } = input;

    // Check duplicate active credential
    const hasActive = await this.credentials.hasIssuedCredential(userId, courseId);
    if (hasActive) {
      throw AppError.conflict("User already has an active or pending certificate for this course.");
    }

    // Resolve template
    const template = await this.templates.findById(templateId);
    if (!template) {
      throw AppError.notFound(`Template '${templateId}' not found.`);
    }
    if (!template.active) {
      throw AppError.badRequest("Selected template is currently inactive.");
    }

    // Generate secure random verification token
    const verificationToken = randomUUID();
    const verificationHash = crypto.createHash("sha256").update(verificationToken).digest("hex");

    // Generate daily human-readable serial credential number
    const todayCount = await this.credentials.countTodayCredentials();
    const year = new Date().getFullYear();
    const sequence = String(todayCount + 1).padStart(6, "0");
    const credentialNumber = `CERT-${year}-${sequence}`;

    const credential = await this.credentials.create({
      credentialNumber,
      userId,
      courseId,
      templateId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      verificationToken, // Store securely inside return payload (one-time return to issuer/client)
      verificationHash,
      status: CredentialStatus.ISSUED,
      metadata: metadata as any,
    });

    this.events.emitCredentialIssued({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      credentialId: credential.id,
      credentialNumber: credential.credentialNumber,
      userId: credential.userId,
      courseId: credential.courseId,
      templateId: credential.templateId,
    });

    return credential;
  }

  /**
   * Cryptographically verifies a certificate token.
   * Tracks and audits verification attempts.
   */
  public async verifyCredential(
    token: string,
    source: VerificationSource,
    ipAddress?: string,
    userAgent?: string
  ): Promise<any> {
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    const credential = await this.credentials.findByVerificationHash(hash);

    if (!credential) {
      throw AppError.notFound("Verification failed: Credential not found.");
    }

    const isSuccess = credential.status === CredentialStatus.ISSUED;

    // Log the verification attempt inside audit logs
    await this.verifications.create({
      credentialId: credential.id,
      ipAddress: ipAddress ?? null,
      userAgent: userAgent ?? null,
      source,
      success: isSuccess,
    });

    this.events.emitCredentialVerified({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      credentialId: credential.id,
      source,
      success: isSuccess,
    });

    if (!isSuccess) {
      throw AppError.badRequest(`Verification failed: Credential is currently ${credential.status.toLowerCase()}.`);
    }

    return credential;
  }

  /**
   * Invalidates and revokes an issued credential.
   */
  public async revokeCredential(input: RevokeCredentialInput, revokedByUserId: string): Promise<any> {
    const { credentialId, reason, metadata } = input;

    const credential = await this.credentials.findById(credentialId);
    if (!credential) {
      throw AppError.notFound(`Credential '${credentialId}' not found.`);
    }

    if (credential.status === CredentialStatus.REVOKED) {
      throw AppError.badRequest("Credential is already revoked.");
    }

    let updated: any;

    const { prisma } = await import("../../database/client");
    await prisma.$transaction(async (tx) => {
      const ctx = { tx };

      // 1. Transition credential status
      updated = await this.credentials.updateStatus(
        credentialId,
        CredentialStatus.REVOKED,
        credential.status,
        credential.revision,
        ctx
      );

      // 2. Add revocation audit record
      await this.revocations.create(
        {
          credentialId,
          reason,
          revokedBy: revokedByUserId,
          metadata: metadata ?? {},
        },
        ctx
      );
    });

    this.events.emitCredentialRevoked({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      credentialId: updated.id,
      revokedBy: revokedByUserId,
      reason,
    });

    return updated;
  }
}

export const credentialService = new CredentialService();
export default credentialService;
