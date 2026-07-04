import { EventEmitter } from "events";
import { logger } from "../../lib/logger";

export interface SearchIndexedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  entityType: string;
  entityId: string;
  operation: string;
}

export interface SearchDeletedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  entityType: string;
  entityId: string;
}

export interface SearchFailedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  entityType: string;
  entityId: string;
  error: string;
}

export class SearchEventEmitter extends EventEmitter {
  public emitSearchIndexed(payload: Omit<SearchIndexedPayload, "version" | "eventId" | "timestamp">): void {
    const event: SearchIndexedPayload = {
      version: 1,
      eventId: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Search Event] Indexed ${payload.entityType}:${payload.entityId}`);
    this.emit("search.indexed", event);
  }

  public emitSearchDeleted(payload: Omit<SearchDeletedPayload, "version" | "eventId" | "timestamp">): void {
    const event: SearchDeletedPayload = {
      version: 1,
      eventId: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Search Event] Deleted ${payload.entityType}:${payload.entityId} from search index`);
    this.emit("search.deleted", event);
  }

  public emitSearchFailed(payload: Omit<SearchFailedPayload, "version" | "eventId" | "timestamp">): void {
    const event: SearchFailedPayload = {
      version: 1,
      eventId: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.error(`[Search Event] Failed to index ${payload.entityType}:${payload.entityId}: ${payload.error}`);
    this.emit("search.failed", event);
  }
}

export const searchEvents = new SearchEventEmitter();
export default searchEvents;
