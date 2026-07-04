import { Prisma, CredentialTemplate, CredentialVerification, CredentialRevocation } from "@prisma/client";
import { prisma } from "../../database/client";
import {
  CredentialTemplateRepository,
  CredentialRepository,
  CredentialVerificationRepository,
  CredentialRevocationRepository,
  RepositoryContext,
} from "./credentials.types";

export class PrismaCredentialTemplateRepository implements CredentialTemplateRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<CredentialTemplate | null> {
    return this.getClient(ctx).credentialTemplate.findUnique({ where: { id } });
  }

  public async findBySlug(slug: string, ctx?: RepositoryContext): Promise<CredentialTemplate | null> {
    return this.getClient(ctx).credentialTemplate.findUnique({ where: { slug } });
  }

  public async create(data: Prisma.CredentialTemplateCreateInput, ctx?: RepositoryContext): Promise<CredentialTemplate> {
    return this.getClient(ctx).credentialTemplate.create({ data });
  }

  public async update(id: string, data: Prisma.CredentialTemplateUpdateInput, ctx?: RepositoryContext): Promise<CredentialTemplate> {
    return this.getClient(ctx).credentialTemplate.update({ where: { id }, data });
  }
}

export class PrismaCredentialRepository implements CredentialRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<any | null> {
    return this.getClient(ctx).credential.findUnique({
      where: { id },
      include: { revocation: true },
    });
  }

  public async findByCredentialNumber(credentialNumber: string, ctx?: RepositoryContext): Promise<any | null> {
    return this.getClient(ctx).credential.findUnique({
      where: { credentialNumber },
      include: { revocation: true },
    });
  }

  public async findByVerificationHash(hash: string, ctx?: RepositoryContext): Promise<any | null> {
    return this.getClient(ctx).credential.findFirst({
      where: { verificationHash: hash },
      include: { revocation: true },
    });
  }

  public async findUserCredentials(userId: string, ctx?: RepositoryContext): Promise<any[]> {
    return this.getClient(ctx).credential.findMany({
      where: { userId },
      include: { revocation: true },
      orderBy: { issuedAt: "desc" },
    });
  }

  public async create(data: Prisma.CredentialUncheckedCreateInput, ctx?: RepositoryContext): Promise<any> {
    return this.getClient(ctx).credential.create({
      data,
      include: { revocation: true },
    });
  }

  public async updateStatus(
    id: string,
    status: string,
    expectedStatus: string,
    revision: number,
    ctx?: RepositoryContext
  ): Promise<any> {
    return this.getClient(ctx).credential.update({
      where: { id, revision },
      data: {
        status: status as any,
        revision: { increment: 1 },
      },
      include: { revocation: true },
    });
  }

  public async countTodayCredentials(ctx?: RepositoryContext): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return this.getClient(ctx).credential.count({
      where: { createdAt: { gte: startOfDay } },
    });
  }

  public async hasIssuedCredential(userId: string, courseId: string, ctx?: RepositoryContext): Promise<boolean> {
    const count = await this.getClient(ctx).credential.count({
      where: { userId, courseId, status: { in: ["ISSUED", "PENDING"] } },
    });
    return count > 0;
  }

  public async hasIssuedForTemplate(templateId: string, ctx?: RepositoryContext): Promise<boolean> {
    const count = await this.getClient(ctx).credential.count({
      where: { templateId },
    });
    return count > 0;
  }
}

export class PrismaCredentialVerificationRepository implements CredentialVerificationRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async create(data: Prisma.CredentialVerificationUncheckedCreateInput, ctx?: RepositoryContext): Promise<CredentialVerification> {
    return this.getClient(ctx).credentialVerification.create({ data });
  }
}

export class PrismaCredentialRevocationRepository implements CredentialRevocationRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async create(data: Prisma.CredentialRevocationUncheckedCreateInput, ctx?: RepositoryContext): Promise<CredentialRevocation> {
    return this.getClient(ctx).credentialRevocation.create({ data });
  }
}

export const credentialTemplateRepository = new PrismaCredentialTemplateRepository();
export const credentialRepository = new PrismaCredentialRepository();
export const credentialVerificationRepository = new PrismaCredentialVerificationRepository();
export const credentialRevocationRepository = new PrismaCredentialRevocationRepository();
