import { Prisma, CredentialTemplate, CredentialVerification, CredentialRevocation } from "@prisma/client";

export interface RepositoryContext {
  tx?: Prisma.TransactionClient;
}

export interface CredentialTemplateRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<CredentialTemplate | null>;
  findBySlug(slug: string, ctx?: RepositoryContext): Promise<CredentialTemplate | null>;
  create(data: Prisma.CredentialTemplateCreateInput, ctx?: RepositoryContext): Promise<CredentialTemplate>;
  update(id: string, data: Prisma.CredentialTemplateUpdateInput, ctx?: RepositoryContext): Promise<CredentialTemplate>;
}

export interface CredentialRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<any | null>;
  findByCredentialNumber(credentialNumber: string, ctx?: RepositoryContext): Promise<any | null>;
  findByVerificationHash(hash: string, ctx?: RepositoryContext): Promise<any | null>;
  findUserCredentials(userId: string, ctx?: RepositoryContext): Promise<any[]>;
  create(data: Prisma.CredentialUncheckedCreateInput, ctx?: RepositoryContext): Promise<any>;
  updateStatus(
    id: string,
    status: string,
    expectedStatus: string,
    revision: number,
    ctx?: RepositoryContext
  ): Promise<any>;
  countTodayCredentials(ctx?: RepositoryContext): Promise<number>;
  hasIssuedCredential(userId: string, courseId: string, ctx?: RepositoryContext): Promise<boolean>;
  hasIssuedForTemplate(templateId: string, ctx?: RepositoryContext): Promise<boolean>;
}

export interface CredentialVerificationRepository {
  create(data: Prisma.CredentialVerificationUncheckedCreateInput, ctx?: RepositoryContext): Promise<CredentialVerification>;
}

export interface CredentialRevocationRepository {
  create(data: Prisma.CredentialRevocationUncheckedCreateInput, ctx?: RepositoryContext): Promise<CredentialRevocation>;
}

export interface CredentialMetadataSnapshot {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  completionDate: string;
  customData?: Record<string, any>;
}
