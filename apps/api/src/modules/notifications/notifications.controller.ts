import { Request, Response } from "express";
import { notificationService, NotificationService } from "./notifications.service";
import { NotificationsMapper } from "./notifications.mapper";
import { validate } from "../../common/dto/base.dto";
import { SuccessResponse } from "../../common/responses/successResponse";
import {
  listNotificationsQuerySchema,
  updatePreferencesSchema,
} from "./notifications.schemas";

export class NotificationController {
  constructor(private readonly service: NotificationService = notificationService) {}

  /**
   * GET /notifications — Paginated list of user notifications
   */
  public getNotifications = async (req: Request, res: Response): Promise<void> => {
    const raw = validate(listNotificationsQuerySchema, req.query);
    const query = { page: raw.page ?? 1, limit: raw.limit ?? 20, status: raw.status };
    const userId = (req as any).user.id;
    const result = await this.service.getUserNotifications(userId, query);
    SuccessResponse.send(res, {
      items: NotificationsMapper.toNotificationDTOs(result.items),
      pagination: result.pagination,
    });
  };

  /**
   * GET /notifications/unread-count
   */
  public getUnreadCount = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const count = await this.service.getUnreadCount(userId);
    SuccessResponse.send(res, { unreadCount: count });
  };

  /**
   * PATCH /notifications/:id/read — Mark single notification as read
   */
  public markAsRead = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const notification = await this.service.markAsRead(id, userId);
    SuccessResponse.send(
      res,
      NotificationsMapper.toNotificationDTO(notification),
      "Notification marked as read."
    );
  };

  /**
   * PATCH /notifications/read-all — Mark all notifications as read
   */
  public markAllAsRead = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const result = await this.service.markAllAsRead(userId);
    SuccessResponse.send(res, result, `${result.count} notifications marked as read.`);
  };

  /**
   * GET /notifications/preferences
   */
  public getPreferences = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const prefs = await this.service.getPreferences(userId);
    SuccessResponse.send(res, NotificationsMapper.toPreferenceDTO(prefs));
  };

  /**
   * PATCH /notifications/preferences
   */
  public updatePreferences = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const input = validate(updatePreferencesSchema, req.body);
    const prefs = await this.service.updatePreferences(userId, input);
    SuccessResponse.send(res, NotificationsMapper.toPreferenceDTO(prefs), "Preferences updated successfully.");
  };
}

export const notificationController = new NotificationController();
export default notificationController;
