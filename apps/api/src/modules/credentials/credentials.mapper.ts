import { CredentialTemplate, CredentialVerification, CredentialRevocation } from "@prisma/client";

export class CredentialsMapper {
  public static toTemplateDTO(template: CredentialTemplate) {
    return {
      id: template.id,
      name: template.name,
      slug: template.slug,
      templateVersion: template.templateVersion,
      htmlTemplate: template.htmlTemplate,
      cssTemplate: template.cssTemplate,
      branding: template.branding,
      active: template.active,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  public static toTemplateDTOs(templates: CredentialTemplate[]) {
    return templates.map((t) => this.toTemplateDTO(t));
  }

  public static toCredentialDTO(credential: any) {
    return {
      id: credential.id,
      credentialNumber: credential.credentialNumber,
      userId: credential.userId,
      courseId: credential.courseId,
      templateId: credential.templateId,
      issuedAt: credential.issuedAt,
      expiresAt: credential.expiresAt,
      verificationToken: credential.verificationToken || undefined, // Only non-empty if returned during generation
      status: credential.status,
      metadata: credential.metadata,
      revision: credential.revision,
      createdAt: credential.createdAt,
      revocation: credential.revocation ? this.toRevocationDTO(credential.revocation) : null,
    };
  }

  public static toCredentialDTOs(credentials: any[]) {
    return credentials.map((c) => this.toCredentialDTO(c));
  }

  public static toRevocationDTO(revocation: CredentialRevocation) {
    return {
      id: revocation.id,
      credentialId: revocation.credentialId,
      reason: revocation.reason,
      revokedBy: revocation.revokedBy,
      revokedAt: revocation.revokedAt,
      metadata: revocation.metadata,
    };
  }
}
