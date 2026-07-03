import { EventEmitter } from "events";
import {
  EnrollmentCreatedEventPayload,
  EnrollmentCompletedEventPayload,
  LearningStartedEventPayload,
  LearningUnitCompletedEventPayload,
  LearningSessionEndedEventPayload,
  CourseCompletedEventPayload
} from "./learning-engine.types";
import { LEARNING_EVENTS } from "./learning-engine.constants";
import { logger } from "../../lib/logger";

export class LearningEngineEventEmitter extends EventEmitter {
  public emitEnrollmentCreated(payload: EnrollmentCreatedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.ENROLLMENT_CREATED} emitted for userId: ${payload.userId}`);
    this.emit(LEARNING_EVENTS.ENROLLMENT_CREATED, payload);
  }

  public emitEnrollmentCompleted(payload: EnrollmentCompletedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.ENROLLMENT_COMPLETED} emitted for enrollmentId: ${payload.enrollmentId}`);
    this.emit(LEARNING_EVENTS.ENROLLMENT_COMPLETED, payload);
  }

  public emitLearningStarted(payload: LearningStartedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.LEARNING_STARTED} emitted for enrollmentId: ${payload.enrollmentId}`);
    this.emit(LEARNING_EVENTS.LEARNING_STARTED, payload);
  }

  public emitUnitCompleted(payload: LearningUnitCompletedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.UNIT_COMPLETED} emitted for unitId: ${payload.learningUnitId}`);
    this.emit(LEARNING_EVENTS.UNIT_COMPLETED, payload);
  }

  public emitSessionEnded(payload: LearningSessionEndedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.SESSION_ENDED} emitted for sessionId: ${payload.sessionId}`);
    this.emit(LEARNING_EVENTS.SESSION_ENDED, payload);
  }

  public emitCourseCompleted(payload: CourseCompletedEventPayload): void {
    logger.info(`📢 [Event] ${LEARNING_EVENTS.COURSE_COMPLETED} emitted for enrollmentId: ${payload.enrollmentId}`);
    this.emit(LEARNING_EVENTS.COURSE_COMPLETED, payload);
  }
}

export const learningEngineEvents = new LearningEngineEventEmitter();
export default learningEngineEvents;
