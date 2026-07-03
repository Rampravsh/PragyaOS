import { Request, Response } from "express";
import { authService, AuthService } from "./auth.service";
import { validate } from "../../common/dto/base.dto";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
} from "./auth.schemas";
import { SuccessResponse } from "../../common/responses/successResponse";
import { DeviceMetadata } from "./auth.types";
import { excludeFields } from "../../common/repositories/utils";
import { AppError } from "../../common/errors/appError";

export class AuthController {
  constructor(private readonly service: AuthService = authService) {}

  /**
   * Registers a new Student profile.
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    const input = validate(registerSchema, req.body);
    const user = await this.service.register(input);
    const sanitizedUser = excludeFields(user, ["passwordHash"]);

    SuccessResponse.created(
      res,
      sanitizedUser,
      "Account registered successfully. Please verify your email."
    );
  };

  /**
   * Logins to the account, returning access token and refresh token details.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    const input = validate(loginSchema, req.body);
    const meta: DeviceMetadata = {
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
      deviceInfo: req.get("User-Agent")?.split("(")[1]?.split(")")[0] || "Unknown Device",
    };

    const session = await this.service.login(input, meta);
    SuccessResponse.send(res, session, "Login successful.");
  };

  /**
   * Refreshes the short-lived access token by rotating the refresh token.
   */
  public refresh = async (req: Request, res: Response): Promise<void> => {
    const input = validate(refreshTokenSchema, req.body);
    const meta: DeviceMetadata = {
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
      deviceInfo: req.get("User-Agent")?.split("(")[1]?.split(")")[0] || "Unknown Device",
    };

    const tokens = await this.service.refresh(input.refreshToken, meta);
    SuccessResponse.send(res, tokens, "Tokens refreshed successfully.");
  };

  /**
   * Logs out the user from the current device.
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    const input = validate(refreshTokenSchema, req.body);
    await this.service.logout(input.refreshToken);
    SuccessResponse.send(res, undefined, "Logout successful.");
  };

  /**
   * Logs out the user from all active devices.
   */
  public logoutAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      SuccessResponse.send(res, undefined, "Logout from all devices successful.");
      return;
    }
    await this.service.logoutAll(userId);
    SuccessResponse.send(res, undefined, "Logout from all devices successful.");
  };

  /**
   * Sends a reset password email link. Prevents email enumeration.
   */
  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const input = validate(forgotPasswordSchema, req.body);
    await this.service.forgotPassword(input.email);
    SuccessResponse.send(
      res,
      undefined,
      "If the email address exists, a password reset link has been sent."
    );
  };

  /**
   * Resets password to the new value using reset token.
   */
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    const input = validate(resetPasswordSchema, req.body);
    await this.service.resetPassword(input);
    SuccessResponse.send(res, undefined, "Password has been reset successfully. Please log in.");
  };

  /**
   * Verifies the email verification token.
   */
  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token as string;
    if (!token) {
      throw AppError.badRequest("Verification token is required.");
    }
    await this.service.verifyEmail(token);
    SuccessResponse.send(res, undefined, "Email verified successfully. You can now log in.");
  };
}

export const authController = new AuthController();
