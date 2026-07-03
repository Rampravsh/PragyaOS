import { Enrollment, LearningProgress, LearningSession, LearningTimeline, CourseCompletion } from "@prisma/client";
import {
  EnrollmentResponseDTO,
  LearningProgressResponseDTO,
  LearningSessionResponseDTO,
  LearningTimelineResponseDTO,
  CourseCompletionResponseDTO
} from "./learning-engine.types";

export class LearningEngineMapper {
  public static toEnrollmentDTO(enrollment: Enrollment): EnrollmentResponseDTO {
    return {
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      source: enrollment.source,
      purchaseRef: enrollment.purchaseRef,
      enrolledAt: enrollment.enrolledAt.toISOString(),
      completedAt: enrollment.completedAt ? enrollment.completedAt.toISOString() : null,
      createdAt: enrollment.createdAt.toISOString(),
      updatedAt: enrollment.updatedAt.toISOString(),
    };
  }

  public static toProgressDTO(progress: LearningProgress): LearningProgressResponseDTO {
    return {
      id: progress.id,
      enrollmentId: progress.enrollmentId,
      learningUnitId: progress.learningUnitId,
      status: progress.status,
      completionPercent: progress.completionPercent,
      watchTime: progress.watchTime,
      lastPosition: progress.lastPosition,
      lastViewedAt: progress.lastViewedAt ? progress.lastViewedAt.toISOString() : null,
      completedAt: progress.completedAt ? progress.completedAt.toISOString() : null,
    };
  }

  public static toSessionDTO(session: LearningSession): LearningSessionResponseDTO {
    return {
      id: session.id,
      enrollmentId: session.enrollmentId,
      learningUnitId: session.learningUnitId,
      device: session.device,
      browser: session.browser,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      status: session.status,
      startedAt: session.startedAt.toISOString(),
      endedAt: session.endedAt ? session.endedAt.toISOString() : null,
      duration: session.duration,
    };
  }

  public static toTimelineDTO(timeline: LearningTimeline): LearningTimelineResponseDTO {
    return {
      id: timeline.id,
      enrollmentId: timeline.enrollmentId,
      eventType: timeline.eventType,
      metadata: timeline.metadata,
      createdAt: timeline.createdAt.toISOString(),
    };
  }

  public static toCompletionDTO(completion: CourseCompletion): CourseCompletionResponseDTO {
    return {
      id: completion.id,
      enrollmentId: completion.enrollmentId,
      progressPercent: completion.progressPercent,
      completedAt: completion.completedAt ? completion.completedAt.toISOString() : null,
      eligibleForCertificate: completion.eligibleForCertificate,
      estimatedRemainingSeconds: completion.estimatedRemainingSeconds,
      reason: completion.reason,
    };
  }
}
