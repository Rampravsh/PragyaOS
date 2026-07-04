import { EventEmitter } from "events";
import { logger } from "../../lib/logger";
import { randomUUID } from "crypto";

export interface CoursePublishedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  courseId: string;
  title: string;
  slug: string;
  publishedBy: string;
}

export interface CourseUpdatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  courseId: string;
  updatedBy: string;
}

export interface CourseArchivedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  courseId: string;
  archivedBy: string;
}

export class CourseEventEmitter extends EventEmitter {
  public emitCoursePublished(payload: Omit<CoursePublishedPayload, "version" | "eventId" | "timestamp">): void {
    const event: CoursePublishedPayload = {
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Course Event] Published courseId: ${payload.courseId}`);
    this.emit("course.published", event);
  }

  public emitCourseUpdated(payload: Omit<CourseUpdatedPayload, "version" | "eventId" | "timestamp">): void {
    const event: CourseUpdatedPayload = {
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Course Event] Updated courseId: ${payload.courseId}`);
    this.emit("course.updated", event);
  }

  public emitCourseArchived(payload: Omit<CourseArchivedPayload, "version" | "eventId" | "timestamp">): void {
    const event: CourseArchivedPayload = {
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      ...payload,
    };
    logger.info(`[Course Event] Archived courseId: ${payload.courseId}`);
    this.emit("course.archived", event);
  }
}

export const courseEvents = new CourseEventEmitter();
export default courseEvents;
