import { RuleResult } from "./publishing.rules";
import { HealthScoreResult } from "./health.engine";
import { CourseStatus, CourseVisibility, DifficultyLevel } from "@prisma/client";

export interface PreviewTokenPayload {
  courseId: string;
  userId: string;
  previewScope: "INSTRUCTOR" | "REVIEWER" | "PUBLIC";
  exp: number;
}

export interface PreviewTokenResponse {
  previewToken: string;
  expiresAt: string;
}

export interface PublishingChecklistResponse {
  isReady: boolean;
  score: number; // overall health score
  rules: RuleResult[];
}

export interface InstructorDashboardDTO {
  draftCount: number;
  inReviewCount: number;
  publishedCount: number;
  archivedCount: number;
  recentCourses: Array<{
    id: string;
    title: string;
    status: CourseStatus;
    updatedAt: string;
    healthScore: number;
  }>;
}

export interface CourseBuilderDuplicationResponse {
  newCourseId?: string;
  newModuleId?: string;
  newUnitId?: string;
  message: string;
}

// Domain Event Payloads
export interface CourseSubmittedForReviewEventPayload {
  courseId: string;
  instructorId: string;
  submittedAt: string;
}

export interface CoursePublishedEventPayload {
  courseId: string;
  publisherId: string;
  publishedAt: string;
  revisionNumber: number;
}

export interface CourseArchivedEventPayload {
  courseId: string;
  archivedById: string;
  archivedAt: string;
}

export interface CourseRestoredEventPayload {
  courseId: string;
  restoredById: string;
  restoredAt: string;
}

export interface CurriculumUpdatedEventPayload {
  courseId: string;
  updatedById: string;
  changeSummary: string;
  updatedAt: string;
}

export interface ChecklistUpdatedEventPayload {
  courseId: string;
  isReady: boolean;
  score: number;
}
