import { Request, Response } from "express";
import { credentialService, CredentialService } from "./credentials.service";
import { CredentialsMapper } from "./credentials.mapper";
import { validate } from "../../common/dto/base.dto";
import { SuccessResponse } from "../../common/responses/successResponse";
import {
  createTemplateSchema,
  updateTemplateSchema,
  issueCredentialSchema,
  verifyCredentialSchema,
  revokeCredentialSchema,
} from "./credentials.schemas";

export class CredentialController {
  constructor(private readonly service: CredentialService = credentialService) {}

  /**
   * Registers a new certificate template (Admin restricted).
   */
  public createTemplate = async (req: Request, res: Response): Promise<void> => {
    const input = validate(createTemplateSchema, req.body);
    const template = await this.service.createTemplate(input);
    SuccessResponse.created(
      res,
      CredentialsMapper.toTemplateDTO(template),
      "Template registered successfully."
    );
  };

  /**
   * Updates an existing certificate template (Admin restricted).
   */
  public updateTemplate = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const input = validate(updateTemplateSchema, req.body);
    const template = await this.service.updateTemplate(id, input);
    SuccessResponse.send(
      res,
      CredentialsMapper.toTemplateDTO(template),
      "Template updated successfully."
    );
  };

  /**
   * Issues a certificate to a student.
   */
  public issueCredential = async (req: Request, res: Response): Promise<void> => {
    const input = validate(issueCredentialSchema, req.body);
    const credential = await this.service.issueCredential(input);
    SuccessResponse.created(
      res,
      CredentialsMapper.toCredentialDTO(credential),
      "Credential issued successfully."
    );
  };

  /**
   * Public endpoint to verify a certificate token.
   */
  public verifyCredential = async (req: Request, res: Response): Promise<void> => {
    const input = validate(verifyCredentialSchema, req.body);
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    
    const credential = await this.service.verifyCredential(
      input.verificationToken,
      input.source,
      ipAddress,
      userAgent
    );

    SuccessResponse.send(
      res,
      CredentialsMapper.toCredentialDTO(credential),
      "Credential verified successfully."
    );
  };

  /**
   * Revokes an issued certificate (Admin restricted).
   */
  public revokeCredential = async (req: Request, res: Response): Promise<void> => {
    const input = validate(revokeCredentialSchema, req.body);
    const revokedBy = (req as any).user.id; // From requireAuth middleware

    const credential = await this.service.revokeCredential(input, revokedBy);
    SuccessResponse.send(
      res,
      CredentialsMapper.toCredentialDTO(credential),
      "Credential revoked successfully."
    );
  };

  /**
   * Fetch all credentials issued to the current user.
   */
  public getMyCredentials = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const records = await this.service["credentials"].findUserCredentials(userId);
    SuccessResponse.send(res, CredentialsMapper.toCredentialDTOs(records));
  };
}

export const credentialController = new CredentialController();
export default credentialController;
