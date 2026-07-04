import { EventEmitter } from "events";
import { logger } from "../../lib/logger";
import { randomUUID } from "crypto";

export interface CategoryUpdatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  categoryId: string;
  name: string;
  slug: string;
}

export interface CategoryDeletedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  categoryId: string;
}

export class CategoryEventEmitter extends EventEmitter {
  public emitCategoryUpdated(payload: Omit<CategoryUpdatedPayload, "version" | "eventId" | "timestamp">): void {
    const event: CategoryUpdatedPayload = {
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Category Event] Updated categoryId: ${payload.categoryId}`);
    this.emit("category.updated", event);
  }

  public emitCategoryDeleted(payload: Omit<CategoryDeletedPayload, "version" | "eventId" | "timestamp">): void {
    const event: CategoryDeletedPayload = {
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Category Event] Deleted categoryId: ${payload.categoryId}`);
    this.emit("category.deleted", event);
  }
}

export const categoryEvents = new CategoryEventEmitter();
export default categoryEvents;
