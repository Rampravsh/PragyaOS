import { EnrollmentStatus, ProgressStatus, SessionStatus, TimelineEventType, CourseCompletionReason } from "@prisma/client";

export interface EnrollmentResponseDTO {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  source: string;
  purchaseRef: string | null;
  enrolledAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LearningProgressResponseDTO {
  id: string;
  enrollmentId: string;
  learningUnitId: string;
  status: ProgressStatus;
  completionPercent: number;
  watchTime: number;
  lastPosition: number;
  lastViewedAt: string | null;
  completedAt: string | null;
}

export interface LearningSessionResponseDTO {
  id: string;
  enrollmentId: string;
  learningUnitId: string | null;
  device: string | null;
  browser: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: SessionStatus;
  startedAt: string;
  endedAt: string | null;
  duration: number | null;
}

export interface LearningTimelineResponseDTO {
  id: string;
  enrollmentId: string;
  eventType: TimelineEventType;
  metadata: any;
  createdAt: string;
}

export interface CourseCompletionResponseDTO {
  id: string;
  enrollmentId: string;
  progressPercent: number;
  completedAt: string | null;
  eligibleForCertificate: boolean;
  estimatedRemainingSeconds: number;
  reason: CourseCompletionReason;
}

// Domain Event Payloads
export interface EnrollmentCreatedEventPayload {
  enrollmentId: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
}

export interface EnrollmentCompletedEventPayload {
  enrollmentId: string;
  userId: string;
  courseId: string;
  completedAt: string;
}

export interface LearningStartedEventPayload {
  enrollmentId: string;
  userId: string;
  courseId: string;
  startedAt: string;
}

export interface LearningUnitCompletedEventPayload {
  enrollmentId: string;
  userId: string;
  courseId: string;
  learningUnitId: string;
  unitType: string;
  completedAt: string;
}

export interface LearningSessionEndedEventPayload {
  sessionId: string;
  enrollmentId: string;
  learningUnitId: string | null;
  duration: number;
  endedAt: string;
}

export interface CourseCompletedEventPayload {
  enrollmentId: string;
  userId: string;
  courseId: string;
  completedAt: string;
  reason: CourseCompletionReason;
}
