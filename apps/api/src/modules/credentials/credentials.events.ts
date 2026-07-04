import { EventEmitter } from "events";
import { logger } from "../../lib/logger";

export interface CredentialIssuedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  credentialId: string;
  credentialNumber: string;
  userId: string;
  courseId: string;
  templateId: string;
}

export interface CredentialRevokedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  credentialId: string;
  revokedBy: string;
  reason: string;
}

export interface CredentialVerifiedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  credentialId: string;
  source: string;
  success: boolean;
}

export interface CredentialExpiredPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  credentialId: string;
}

export interface TemplateUpdatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  templateId: string;
  slug: string;
  templateVersion: string;
}

export class CredentialsEventEmitter extends EventEmitter {
  public emitCredentialIssued(payload: CredentialIssuedPayload): void {
    logger.info(`[Credentials Event] Issued Credential No: ${payload.credentialNumber} for User: ${payload.userId}`);
    this.emit("credential.issued", payload);
  }

  public emitCredentialRevoked(payload: CredentialRevokedPayload): void {
    logger.info(`[Credentials Event] Revoked Credential: ${payload.credentialId} by User: ${payload.revokedBy}`);
    this.emit("credential.revoked", payload);
  }

  public emitCredentialVerified(payload: CredentialVerifiedPayload): void {
    logger.info(`[Credentials Event] Verified Credential: ${payload.credentialId} | Success: ${payload.success}`);
    this.emit("credential.verified", payload);
  }

  public emitCredentialExpired(payload: CredentialExpiredPayload): void {
    logger.info(`[Credentials Event] Expired Credential: ${payload.credentialId}`);
    this.emit("credential.expired", payload);
  }

  public emitTemplateUpdated(payload: TemplateUpdatedPayload): void {
    logger.info(`[Credentials Event] Updated Template: ${payload.templateId} (Version: ${payload.templateVersion})`);
    this.emit("template.updated", payload);
  }
}

export const credentialsEvents = new CredentialsEventEmitter();
export default credentialsEvents;
