import { Request, Response } from "express";
import { userService, UserService } from "./user.service";
import { UserMapper } from "./user.mapper";
import {
  updateProfileSchema,
  updateAvatarSchema,
  updatePreferencesSchema,
  changePasswordSchema,
  auditQuerySchema,
  AuditQueryInput,
} from "./user.schemas";
import { AppError } from "../../common/errors/appError";
import { hashToken } from "../auth/auth.utils";
import { validate } from "../../common/dto/base.dto";

export class UserController {
  constructor(private readonly service: UserService = userService) {}

  /**
   * Returns current authenticated user profile.
   */
  public getCurrentProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const user = await this.service.getProfile(userId);
    res.status(200).json({
      success: true,
      data: UserMapper.toProfileDTO(user),
    });
  };

  /**
   * Resolves profile of user by ID. Prevents horizontal privilege escalation.
   */
  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const currentUserId = req.user!.id;
    const isSelf = id === currentUserId;

    // Check if user has explicit 'user:read' permission (granted to Admins/Super Admins)
    const hasReadPermission =
      req.user!.permissions.includes("user:read") ||
      req.user!.roles.includes("SUPER_ADMIN");

    if (!isSelf && !hasReadPermission) {
      throw AppError.forbidden("You do not have permission to view this user's profile.");
    }

    const user = await this.service.getProfile(id);
    res.status(200).json({
      success: true,
      data: UserMapper.toProfileDTO(user),
    });
  };

  /**
   * Updates authenticated user profile details.
   */
  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const input = validate(updateProfileSchema, req.body);

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    const user = await this.service.updateProfile(userId, input, audit);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: UserMapper.toProfileDTO(user),
    });
  };

  /**
   * Updates authenticated user avatar URL.
   */
  public updateAvatar = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { avatarUrl } = validate(updateAvatarSchema, req.body);

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    const user = await this.service.updateAvatar(userId, avatarUrl, audit);
    res.status(200).json({
      success: true,
      message: "Avatar updated successfully.",
      data: UserMapper.toProfileDTO(user),
    });
  };

  /**
   * Updates authenticated user account preferences.
   */
  public updatePreferences = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const input = validate(updatePreferencesSchema, req.body);

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    const user = await this.service.updatePreferences(userId, input, audit);
    res.status(200).json({
      success: true,
      message: "Preferences updated successfully.",
      data: UserMapper.toProfileDTO(user),
    });
  };

  /**
   * Changes password, terminating all other active devices.
   */
  public changePassword = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const input = validate(changePasswordSchema, req.body);

    // Extract current token to identify current session hash
    const authHeader = req.get("Authorization")!;
    const currentToken = authHeader.split(" ")[1];

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.changePassword(userId, input, currentToken, audit);
    res.status(200).json({
      success: true,
      message: "Password changed successfully. Terminated all other active sessions.",
    });
  };

  /**
   * Lists active sessions, marking which is the current device.
   */
  public listSessions = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const sessions = await this.service.listSessions(userId);

    const authHeader = req.get("Authorization")!;
    const currentToken = authHeader.split(" ")[1];
    const currentHash = hashToken(currentToken);

    res.status(200).json({
      success: true,
      data: UserMapper.toSessionDTOs(sessions, currentHash),
    });
  };

  /**
   * Logs out a specific session.
   */
  public logoutSession = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { sessionId } = req.params;

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.logoutSession(userId, sessionId, audit);
    res.status(200).json({
      success: true,
      message: "Session terminated successfully.",
    });
  };

  /**
   * Logs out all sessions except current one.
   */
  public logoutOtherSessions = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;

    const authHeader = req.get("Authorization")!;
    const currentToken = authHeader.split(" ")[1];

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.logoutOtherSessions(userId, currentToken, audit);
    res.status(200).json({
      success: true,
      message: "Terminated all other active sessions successfully.",
    });
  };

  /**
   * Deactivates authenticated user's own profile.
   */
  public deactivateAccount = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.deactivateAccount(userId, audit);
    res.status(200).json({
      success: true,
      message: "Account deactivated successfully. Terminated all active sessions.",
    });
  };

  /**
   * Reactivates suspended target user profile (Admin only).
   */
  public reactivateAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const adminUserId = req.user!.id;

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.reactivateAccount(adminUserId, id, audit);
    res.status(200).json({
      success: true,
      message: "Account reactivated successfully.",
    });
  };

  /**
   * Soft deletes a target user profile (Admin or Self only).
   */
  public softDeleteAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const currentUserId = req.user!.id;
    const isSelf = id === currentUserId;

    // Check if user has explicit 'user:delete' permission (granted to Admins/Super Admins)
    const hasDeletePermission =
      req.user!.permissions.includes("user:delete") ||
      req.user!.roles.includes("SUPER_ADMIN");

    if (!isSelf && !hasDeletePermission) {
      throw AppError.forbidden("You do not have permission to delete this account.");
    }

    const audit = {
      ip: req.ip,
      agent: req.get("User-Agent"),
    };

    await this.service.softDeleteAccount(currentUserId, id, audit);
    res.status(200).json({
      success: true,
      message: "Account soft-deleted successfully.",
    });
  };

  /**
   * Lists paginated audits of the authenticated user.
   */
  public listAuditLogs = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const query = validate(auditQuerySchema as any, req.query) as AuditQueryInput;

    const { logs, total } = await this.service.listAuditLogs(userId, query);

    res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          pages: Math.ceil(total / query.limit),
        },
      },
    });
  };
}

export const userController = new UserController();
export default userController;
