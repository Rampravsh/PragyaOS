import { Course, CourseStatus, CourseVisibility, DifficultyLevel, CourseModule, LearningUnit } from "@prisma/client";
import { learningUnitRepository } from "../learning-units/learning-unit.repository";
import { courseModuleRepository } from "../courses/course-module.repository";
import { AppError } from "../../common/errors/appError";
import { logger } from "../../lib/logger";
import { courseRepository } from "../courses/course.repository";
import { userRepository } from "../users/user.repository";
import { PublishingRuleEngine, RuleResult } from "./publishing.rules";
import { CourseHealthEngine, HealthScoreResult } from "./health.engine";
import { instructorStudioEvents } from "./instructor-studio.events";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import {
  SubmitReviewInput,
  PublishCourseInput,
  GeneratePreviewInput,
  DuplicateCourseInput,
  MoveModuleInput,
  MoveLearningUnitInput,
  BulkReorderCurriculumInput
} from "./instructor-studio.schemas";
import { PreviewTokenResponse, PublishingChecklistResponse, InstructorDashboardDTO, CourseBuilderDuplicationResponse } from "./instructor-studio.types";

export class InstructorStudioService {
  /**
   * Generates the complete publishing checklist for a course.
   */
  public async getPublishingChecklist(courseId: string, instructorId: string): Promise<PublishingChecklistResponse> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    const rules = await PublishingRuleEngine.runAll(course);
    const health = CourseHealthEngine.calculate(course);

    const isReady = !rules.some((r) => r.severity === "CRITICAL" && r.status === "FAILED");

    // Emit checklist updated event
    instructorStudioEvents.emitPublishingChecklistUpdated({
      courseId,
      isReady,
      score: health.overallScore,
    });

    return {
      isReady,
      score: health.overallScore,
      rules,
    };
  }

  /**
   * Submits a course draft for reviewer review.
   */
  public async submitForReview(courseId: string, instructorId: string, input: SubmitReviewInput): Promise<Course> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    // Draft -> In Review transition rules
    if (course.status !== CourseStatus.DRAFT && course.status !== CourseStatus.ARCHIVED) {
      throw AppError.badRequest(`Cannot submit course in ${course.status} state. Must be DRAFT.`);
    }

    // Run checklist: Critical failures block submission
    const rules = await PublishingRuleEngine.runAll(course);
    const hasCriticalFailures = rules.some((r) => r.severity === "CRITICAL" && r.status === "FAILED");
    if (hasCriticalFailures) {
      throw AppError.badRequest("Cannot submit course for review with critical publishing checklist failures.");
    }

    const updated = await courseRepository.update(courseId, {
      status: CourseStatus.REVIEW,
      changeSummary: input.changeSummary || "Submitted for review.",
    });

    instructorStudioEvents.emitCourseSubmittedForReview({
      courseId,
      instructorId,
      submittedAt: new Date().toISOString(),
    });

    return updated;
  }

  /**
   * Publishes a course (In Review -> Published). Only Admin/Reviewer authorized.
   */
  public async publishCourse(courseId: string, publisherId: string, input: PublishCourseInput): Promise<Course> {
    // 1. Verify workflow permission
    const isAuthorized = await this.isAuthorizedToPublish(publisherId);
    if (!isAuthorized) {
      throw AppError.forbidden("You do not have membership permissions to publish courses.");
    }

    const course = await this.fetchFullCourseDetails(courseId);

    // In Review -> Published transition rules
    if (course.status !== CourseStatus.REVIEW && course.status !== CourseStatus.DRAFT) {
      throw AppError.badRequest(`Cannot publish course in ${course.status} status. Must be REVIEW or DRAFT.`);
    }

    // Validate readiness checklist
    const rules = await PublishingRuleEngine.runAll(course);
    const hasCriticalFailures = rules.some((r) => r.severity === "CRITICAL" && r.status === "FAILED");
    if (hasCriticalFailures) {
      throw AppError.badRequest("Cannot publish course with critical checklist failures.");
    }

    const nextRevision = course.revisionNumber + 1;

    const updated = await courseRepository.update(courseId, {
      status: CourseStatus.PUBLISHED,
      publishedAt: new Date(),
      revisionNumber: nextRevision,
      changeSummary: input.changeSummary || `Published Revision #${nextRevision}`,
    });

    instructorStudioEvents.emitCoursePublished({
      courseId,
      publisherId,
      publishedAt: new Date().toISOString(),
      revisionNumber: nextRevision,
    });

    return updated;
  }

  /**
   * Unpublishes a published course (Published -> Draft).
   */
  public async unpublishCourse(courseId: string, instructorId: string): Promise<Course> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    if (course.status !== CourseStatus.PUBLISHED) {
      throw AppError.badRequest("Only published courses can be unpublished.");
    }

    return courseRepository.update(courseId, {
      status: CourseStatus.DRAFT,
    });
  }

  /**
   * Archives a course (Published -> Archived).
   */
  public async archiveCourse(courseId: string, archiverId: string): Promise<Course> {
    const course = await this.fetchFullCourseDetails(courseId);
    
    // Validate owner or admin
    const isAuthorized = await this.isAuthorizedToPublish(archiverId);
    const isOwner = course.instructors.some((ci: any) => ci.userId === archiverId);
    if (!isAuthorized && !isOwner) {
      throw AppError.forbidden("You do not have permission to archive this course.");
    }

    const updated = await courseRepository.update(courseId, {
      status: CourseStatus.ARCHIVED,
    });

    instructorStudioEvents.emitCourseArchived({
      courseId,
      archivedById: archiverId,
      archivedAt: new Date().toISOString(),
    });

    return updated;
  }

  /**
   * Restores an archived course to draft. (Archived -> Draft)
   */
  public async restoreCourse(courseId: string, restorerId: string): Promise<Course> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, restorerId);

    if (course.status !== CourseStatus.ARCHIVED) {
      throw AppError.badRequest("Only archived courses can be restored.");
    }

    const updated = await courseRepository.update(courseId, {
      status: CourseStatus.DRAFT,
    });

    instructorStudioEvents.emitCourseRestored({
      courseId,
      restoredById: restorerId,
      restoredAt: new Date().toISOString(),
    });

    return updated;
  }

  /**
   * Generates secure, short-lived stateless preview tokens.
   */
  public async generatePreviewToken(
    courseId: string,
    userId: string,
    input: GeneratePreviewInput
  ): Promise<PreviewTokenResponse> {
    const course = await courseRepository.findById(courseId);
    if (!course) {
      throw AppError.notFound("Course not found.");
    }

    // Verify collaborator status
    const isCollaborator = course.instructors.some((ci: any) => ci.userId === userId);
    const isPrivileged = await this.isAuthorizedToPublish(userId);

    if (!isCollaborator && !isPrivileged && input.scope !== "PUBLIC") {
      throw AppError.forbidden("Only collaborators can generate non-public preview sessions.");
    }

    const expiresAt = new Date(Date.now() + input.expiresInSeconds * 1000);
    const previewToken = jwt.sign(
      {
        courseId,
        userId,
        previewScope: input.scope,
      },
      config.jwt.secret,
      { expiresIn: input.expiresInSeconds }
    );

    return {
      previewToken,
      expiresAt: expiresAt.toISOString(),
    };
  }

  /**
   * Duplicates a course and its full curriculum.
   */
  public async duplicateCourse(
    courseId: string,
    instructorId: string,
    input: DuplicateCourseInput
  ): Promise<Course> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    const nextSlug = `${course.slug}-copy-${Date.now()}`;

    // Create Course copy in draft
    const copy = await courseRepository.create({
      title: input.newTitle || `${course.title} (Copy)`,
      subtitle: course.subtitle,
      description: course.description,
      slug: nextSlug,
      language: course.language,
      difficulty: course.difficulty,
      categoryId: course.categoryId,
      thumbnailId: course.thumbnailId,
      trailerId: course.trailerId,
      seoMetadata: course.seoMetadata || {},
      status: CourseStatus.DRAFT,
      visibility: CourseVisibility.PRIVATE,
      instructors: {
        create: {
          userId: instructorId,
        },
      },
      requirements: {
        createMany: {
          data: course.requirements.map((r: any) => ({
            description: r.description,
            sequence: r.sequence,
          })),
        },
      },
      objectives: {
        createMany: {
          data: course.objectives.map((o: any) => ({
            description: o.description,
            sequence: o.sequence,
          })),
        },
      },
      faqs: {
        createMany: {
          data: course.faqs.map((f: any) => ({
            question: f.question,
            answer: f.answer,
            sequence: f.sequence,
          })),
        },
      },
    });

    // Duplicate curriculum modules & units sequentially
    for (const m of course.modules) {
      await courseModuleRepository.createWithUnits({
        courseId: copy.id,
        title: m.title,
        description: m.description,
        sequence: m.sequence,
        learningUnits: {
          createMany: {
            data: m.learningUnits.map((u: any) => ({
              title: u.title,
              description: u.description,
              type: u.type,
              sequence: u.sequence,
              mediaId: u.mediaId,
              content: u.content || {},
              duration: u.duration,
            })),
          },
        },
      });
    }

    instructorStudioEvents.emitCurriculumUpdated({
      courseId: copy.id,
      updatedById: instructorId,
      changeSummary: `Duplicated from Course ${courseId}`,
      updatedAt: new Date().toISOString(),
    });

    return copy;
  }

  /**
   * Duplicates a curriculum module.
   */
  public async duplicateModule(
    courseId: string,
    moduleId: string,
    instructorId: string
  ): Promise<CourseModule> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    const sourceModule = course.modules.find((m: any) => m.id === moduleId);
    if (!sourceModule) {
      throw AppError.notFound("Module not found in course.");
    }

    const nextSeq = course.modules.length > 0 ? Math.max(...course.modules.map((m: any) => m.sequence)) + 1 : 1;

    const copy = await courseModuleRepository.createWithUnits({
      courseId,
      title: `${sourceModule.title} (Copy)`,
      description: sourceModule.description,
      sequence: nextSeq,
      learningUnits: {
        createMany: {
          data: sourceModule.learningUnits.map((u: any) => ({
            title: u.title,
            description: u.description,
            type: u.type,
            sequence: u.sequence,
            mediaId: u.mediaId,
            content: u.content || {},
            duration: u.duration,
          })),
        },
      },
    });

    instructorStudioEvents.emitCurriculumUpdated({
      courseId,
      updatedById: instructorId,
      changeSummary: `Duplicated module ${moduleId}`,
      updatedAt: new Date().toISOString(),
    });

    return copy;
  }

  /**
   * Duplicates a learning unit within a module.
   */
  public async duplicateLearningUnit(
    courseId: string,
    learningUnitId: string,
    instructorId: string
  ): Promise<LearningUnit> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    let sourceUnit: LearningUnit | undefined;
    let targetModuleId = "";
    let siblings: LearningUnit[] = [];

    for (const m of course.modules) {
      const u = m.learningUnits.find((lu: any) => lu.id === learningUnitId);
      if (u) {
        sourceUnit = u;
        targetModuleId = m.id;
        siblings = m.learningUnits;
        break;
      }
    }

    if (!sourceUnit) {
      throw AppError.notFound("Learning Unit not found.");
    }

    const nextSeq = siblings.length > 0 ? Math.max(...siblings.map((s) => s.sequence)) + 1 : 1;

    const copy = await learningUnitRepository.create({
      moduleId: targetModuleId,
      title: `${sourceUnit.title} (Copy)`,
      description: sourceUnit.description,
      type: sourceUnit.type,
      sequence: nextSeq,
      mediaId: sourceUnit.mediaId,
      content: sourceUnit.content || {},
      duration: sourceUnit.duration,
    });

    instructorStudioEvents.emitCurriculumUpdated({
      courseId,
      updatedById: instructorId,
      changeSummary: `Duplicated unit ${learningUnitId}`,
      updatedAt: new Date().toISOString(),
    });

    return copy;
  }

  /**
   * Moves a module to another index position.
   */
  public async moveModule(
    courseId: string,
    moduleId: string,
    targetIndex: number,
    instructorId: string
  ): Promise<void> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    const modules = [...course.modules].sort((a, b) => a.sequence - b.sequence);
    const sourceIdx = modules.findIndex((m) => m.id === moduleId);
    if (sourceIdx === -1) {
      throw AppError.notFound("Module not found.");
    }

    const [targetModule] = modules.splice(sourceIdx, 1);
    const sanitizedIndex = Math.min(modules.length, Math.max(0, targetIndex));
    modules.splice(sanitizedIndex, 0, targetModule);

    // Save module sequences sequentially in a single transaction wrapped in repository
    await courseModuleRepository.updateSequences(modules);

    instructorStudioEvents.emitCurriculumUpdated({
      courseId,
      updatedById: instructorId,
      changeSummary: `Moved module ${moduleId} to index ${sanitizedIndex}`,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Moves a learning unit to another module or index position.
   */
  public async moveLearningUnit(
    courseId: string,
    learningUnitId: string,
    targetModuleId: string,
    targetIndex: number,
    instructorId: string
  ): Promise<void> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    // Find source unit details
    let unit: LearningUnit | undefined;
    let sourceModuleId = "";
    for (const m of course.modules) {
      const u = m.learningUnits.find((lu: any) => lu.id === learningUnitId);
      if (u) {
        unit = u;
        sourceModuleId = m.id;
        break;
      }
    }

    if (!unit) {
      throw AppError.notFound("Learning unit not found.");
    }

    // 1. Fetch source siblings via repository
    const sourceSiblings = await learningUnitRepository.findManyByModuleId(sourceModuleId);

    // 2. Fetch target siblings via repository
    const targetSiblings = sourceModuleId === targetModuleId
      ? sourceSiblings
      : await learningUnitRepository.findManyByModuleId(targetModuleId);

    // Remove from source list
    const sourceIndex = sourceSiblings.findIndex((s) => s.id === learningUnitId);
    if (sourceIndex !== -1) {
      sourceSiblings.splice(sourceIndex, 1);
    }

    // Insert into target list
    const cleanTargetIndex = Math.min(targetSiblings.length, Math.max(0, targetIndex));
    if (sourceModuleId === targetModuleId) {
      sourceSiblings.splice(cleanTargetIndex, 0, unit);
    } else {
      targetSiblings.splice(cleanTargetIndex, 0, unit);
    }

    // Perform atomic resequence operations via repository
    await learningUnitRepository.updateMoveUnits(
      sourceModuleId,
      sourceSiblings,
      targetModuleId,
      targetSiblings
    );

    instructorStudioEvents.emitCurriculumUpdated({
      courseId,
      updatedById: instructorId,
      changeSummary: `Moved unit ${learningUnitId} to module ${targetModuleId} index ${cleanTargetIndex}`,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Bulk updates curriculum sequences.
   */
  public async bulkReorderCurriculum(
    courseId: string,
    input: BulkReorderCurriculumInput,
    instructorId: string
  ): Promise<void> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    // Delegate transactional curriculum updates to repository
    await courseModuleRepository.bulkReorderCurriculum(courseId, input.modules);

    instructorStudioEvents.emitCurriculumUpdated({
      courseId,
      updatedById: instructorId,
      changeSummary: "Executed bulk curriculum reorder transaction.",
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Gets instructor dashboard metrics.
   */
  public async getInstructorDashboard(instructorId: string): Promise<InstructorDashboardDTO> {
    const courses = await courseRepository.findManyByInstructorId(instructorId);

    let draftCount = 0;
    let inReviewCount = 0;
    let publishedCount = 0;
    let archivedCount = 0;

    const recentCourses = courses.slice(0, 5).map((c) => {
      if (c.status === CourseStatus.DRAFT) draftCount++;
      else if (c.status === CourseStatus.REVIEW) inReviewCount++;
      else if (c.status === CourseStatus.PUBLISHED) publishedCount++;
      else if (c.status === CourseStatus.ARCHIVED) archivedCount++;

      const health = CourseHealthEngine.calculate(c);
      return {
        id: c.id,
        title: c.title,
        status: c.status,
        updatedAt: c.updatedAt.toISOString(),
        healthScore: health.overallScore,
      };
    });

    // Re-count all courses for status metrics
    courses.forEach((c) => {
      if (c.status === CourseStatus.DRAFT) draftCount++;
      else if (c.status === CourseStatus.REVIEW) inReviewCount++;
      else if (c.status === CourseStatus.PUBLISHED) publishedCount++;
      else if (c.status === CourseStatus.ARCHIVED) archivedCount++;
    });

    return {
      draftCount,
      inReviewCount,
      publishedCount,
      archivedCount,
      recentCourses,
    };
  }

  /**
   * Fetches modular quality scores and actionable suggestions.
   */
  public async getCourseHealthReport(courseId: string, instructorId: string): Promise<HealthScoreResult> {
    const course = await this.fetchFullCourseDetails(courseId);
    await this.validateOwnership(course, instructorId);

    return CourseHealthEngine.calculate(course);
  }

  /**
   * Validates if the user owns or instructs this course.
   */
  public async validateOwnership(course: any, userId: string): Promise<void> {
    const isInstructor = course.instructors.some((ci: any) => ci.userId === userId);
    if (isInstructor) return;

    // Check Admin bypass
    const userRoles = await userRepository.findRolesByUserId(userId);
    const names = userRoles.map((r) => r.role.name);
    const isPrivileged = names.includes("ADMIN") || names.includes("SUPER_ADMIN");

    if (!isPrivileged) {
      throw AppError.forbidden("You do not have permission to manage this course.");
    }
  }

  /**
   * Checks if user has publish privileges.
   */
  private async isAuthorizedToPublish(userId: string): Promise<boolean> {
    const roles = await userRepository.findRolesByUserId(userId);
    const names = roles.map((r) => r.role.name);
    return names.includes("ADMIN") || names.includes("SUPER_ADMIN") || names.includes("REVIEWER");
  }

  /**
   * Helper to fetch course details cleanly.
   */
  private async fetchFullCourseDetails(courseId: string) {
    const course = await courseRepository.findFullCourseDetails(courseId);

    if (!course) {
      throw AppError.notFound("Course not found.");
    }

    return course;
  }
}

export const instructorStudioService = new InstructorStudioService();
export default instructorStudioService;
