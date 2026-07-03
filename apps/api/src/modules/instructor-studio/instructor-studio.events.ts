import { EventEmitter } from "events";
import {
  CourseSubmittedForReviewEventPayload,
  CoursePublishedEventPayload,
  CourseArchivedEventPayload,
  CourseRestoredEventPayload,
  CurriculumUpdatedEventPayload,
  ChecklistUpdatedEventPayload
} from "./instructor-studio.types";
import { logger } from "../../lib/logger";

export const STUDIO_EVENTS = {
  SUBMITTED_FOR_REVIEW: "course.submitted.review",
  PUBLISHED: "course.published",
  ARCHIVED: "course.archived",
  RESTORED: "course.restored",
  CURRICULUM_UPDATED: "curriculum.updated",
  CHECKLIST_UPDATED: "publishing.checklist.updated",
};

export class InstructorStudioEventEmitter extends EventEmitter {
  public emitCourseSubmittedForReview(payload: CourseSubmittedForReviewEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.SUBMITTED_FOR_REVIEW} for course ${payload.courseId}`);
    this.emit(STUDIO_EVENTS.SUBMITTED_FOR_REVIEW, payload);
  }

  public emitCoursePublished(payload: CoursePublishedEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.PUBLISHED} for course ${payload.courseId} (Rev: ${payload.revisionNumber})`);
    this.emit(STUDIO_EVENTS.PUBLISHED, payload);
  }

  public emitCourseArchived(payload: CourseArchivedEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.ARCHIVED} for course ${payload.courseId}`);
    this.emit(STUDIO_EVENTS.ARCHIVED, payload);
  }

  public emitCourseRestored(payload: CourseRestoredEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.RESTORED} for course ${payload.courseId}`);
    this.emit(STUDIO_EVENTS.RESTORED, payload);
  }

  public emitCurriculumUpdated(payload: CurriculumUpdatedEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.CURRICULUM_UPDATED} for course ${payload.courseId}`);
    this.emit(STUDIO_EVENTS.CURRICULUM_UPDATED, payload);
  }

  public emitPublishingChecklistUpdated(payload: ChecklistUpdatedEventPayload): void {
    logger.info(`📢 [Studio Event] ${STUDIO_EVENTS.CHECKLIST_UPDATED} for course ${payload.courseId}`);
    this.emit(STUDIO_EVENTS.CHECKLIST_UPDATED, payload);
  }
}

export const instructorStudioEvents = new InstructorStudioEventEmitter();
export default instructorStudioEvents;
