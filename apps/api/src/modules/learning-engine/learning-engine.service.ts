import { Enrollment, LearningProgress, LearningSession, LearningTimeline, CourseCompletion, EnrollmentStatus, ProgressStatus, SessionStatus, TimelineEventType, CourseCompletionReason, LearningUnit } from "@prisma/client";
import { courseRepository } from "../courses/course.repository";
import { learningUnitRepository } from "../learning-units/learning-unit.repository";
import { userRepository } from "../users/user.repository";
import { AppError } from "../../common/errors/appError";
import { logger } from "../../lib/logger";
import {
  enrollmentRepo,
  learningProgressRepo,
  learningSessionRepo,
  learningTimelineRepo,
  courseCompletionRepo,
  EnrollmentRepository,
  LearningProgressRepository,
  LearningSessionRepository,
  LearningTimelineRepository,
  CourseCompletionRepository
} from "./learning-engine.repository";
import { learningEngineEvents, LearningEngineEventEmitter } from "./learning-engine.events";
import { ProgressCalculator } from "./progress.calculator";
import { UpdateProgressInput, StartSessionInput } from "./learning-engine.schemas";

export class LearningEngineService {
  constructor(
    private readonly enrollments: EnrollmentRepository = enrollmentRepo,
    private readonly progress: LearningProgressRepository = learningProgressRepo,
    private readonly sessions: LearningSessionRepository = learningSessionRepo,
    private readonly timelines: LearningTimelineRepository = learningTimelineRepo,
    private readonly completions: CourseCompletionRepository = courseCompletionRepo,
    private readonly events: LearningEngineEventEmitter = learningEngineEvents
  ) {}

  /**
   * Enrolls a student in a course.
   */
  public async enrollStudent(
    userId: string,
    courseId: string,
    source: string = "MANUAL",
    purchaseRef?: string
  ): Promise<Enrollment> {
    // 1. Verify if course exists
    const course = await courseRepository.findById(courseId);
    if (!course) {
      throw AppError.notFound("Course not found.");
    }

    // 2. Check if already enrolled
    const existing = await this.enrollments.findByUserAndCourse(userId, courseId);
    if (existing) {
      if (existing.status === EnrollmentStatus.ACTIVE) {
        throw AppError.conflict("User is already actively enrolled in this course.");
      }
      // Re-activate if suspended/cancelled
      return this.resumeEnrollment(userId, existing.id);
    }

    // 3. Create Enrollment record
    const enrollment = await this.enrollments.create({
      user: { connect: { id: userId } },
      course: { connect: { id: courseId } },
      status: EnrollmentStatus.ACTIVE,
      source,
      purchaseRef,
    });

    // 4. Append to immutable timeline
    await this.timelines.create({
      enrollment: { connect: { id: enrollment.id } },
      eventType: TimelineEventType.COURSE_STARTED,
      metadata: { courseId, title: course.title },
    });

    // 5. Initialize completion tracker
    // Fetch total course remaining duration in seconds
    const totalMinutes = await this.getCourseDurationMinutes(courseId);
    await this.completions.create({
      enrollment: { connect: { id: enrollment.id } },
      progressPercent: 0,
      estimatedRemainingSeconds: totalMinutes * 60,
      eligibleForCertificate: false,
      reason: CourseCompletionReason.COMPLETED_ALL_UNITS,
    });

    // 6. Emit event
    this.events.emitEnrollmentCreated({
      enrollmentId: enrollment.id,
      userId,
      courseId,
      enrolledAt: enrollment.enrolledAt.toISOString(),
    });

    return enrollment;
  }

  /**
   * Suspends a student's enrollment.
   */
  public async suspendEnrollment(userId: string, enrollmentId: string): Promise<Enrollment> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    if (enrollment.status === EnrollmentStatus.SUSPENDED) {
      return enrollment;
    }

    const updated = await this.enrollments.update(enrollmentId, {
      status: EnrollmentStatus.SUSPENDED,
    });

    await this.timelines.create({
      enrollment: { connect: { id: enrollmentId } },
      eventType: TimelineEventType.ENROLLMENT_SUSPENDED,
    });

    return updated;
  }

  /**
   * Resumes a suspended or cancelled enrollment.
   */
  public async resumeEnrollment(userId: string, enrollmentId: string): Promise<Enrollment> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    if (enrollment.status === EnrollmentStatus.ACTIVE) {
      return enrollment;
    }

    const updated = await this.enrollments.update(enrollmentId, {
      status: EnrollmentStatus.ACTIVE,
    });

    await this.timelines.create({
      enrollment: { connect: { id: enrollmentId } },
      eventType: TimelineEventType.ENROLLMENT_RESUMED,
    });

    return updated;
  }

  /**
   * Cancels a student's enrollment.
   */
  public async cancelEnrollment(userId: string, enrollmentId: string): Promise<Enrollment> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    if (enrollment.status === EnrollmentStatus.CANCELLED) {
      return enrollment;
    }

    const updated = await this.enrollments.update(enrollmentId, {
      status: EnrollmentStatus.CANCELLED,
    });

    await this.timelines.create({
      enrollment: { connect: { id: enrollmentId } },
      eventType: TimelineEventType.ENROLLMENT_CANCELLED,
    });

    return updated;
  }

  /**
   * Updates student progress on a specific learning unit.
   */
  public async updateProgress(
    userId: string,
    enrollmentId: string,
    input: UpdateProgressInput
  ): Promise<LearningProgress> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    if (enrollment.status !== EnrollmentStatus.ACTIVE) {
      throw AppError.badRequest("Cannot update progress on an inactive enrollment.");
    }

    const unit = await learningUnitRepository.findById(input.learningUnitId);
    if (!unit) {
      throw AppError.notFound("Learning unit not found.");
    }

    // Find existing progress
    const existing = await this.progress.findByEnrollmentAndUnit(enrollmentId, input.learningUnitId);

    // Calculate progress using strategy pattern ProgressCalculator
    const calcInput = {
      unitType: unit.type,
      unitDurationMinutes: unit.duration,
      watchTime: (existing?.watchTime || 0) + (input.watchTime || 0),
      lastPosition: input.lastPosition ?? existing?.lastPosition ?? 0,
      percentInput: input.percentInput,
      quizScore: input.quizScore,
      quizPassingScore: input.quizPassingScore,
      quizMaxScore: input.quizMaxScore,
      isSubmitted: input.isSubmitted,
    };

    const calcResult = ProgressCalculator.calculate(calcInput);

    const isTransitioningToCompleted = calcResult.status === ProgressStatus.COMPLETED && (!existing || existing.status !== ProgressStatus.COMPLETED);

    // Persist progress update
    const updatedProgress = await this.progress.upsert(
      enrollmentId,
      input.learningUnitId,
      {
        status: calcResult.status,
        completionPercent: calcResult.completionPercent,
        watchTime: calcResult.watchTime,
        lastPosition: calcResult.lastPosition,
        lastViewedAt: new Date(),
        completedAt: isTransitioningToCompleted ? new Date() : null,
      },
      {
        status: calcResult.status,
        completionPercent: calcResult.completionPercent,
        watchTime: calcResult.watchTime,
        lastPosition: calcResult.lastPosition,
        lastViewedAt: new Date(),
        ...(isTransitioningToCompleted && { completedAt: new Date() }),
      }
    );

    // Dispatch timeline audits and notifications if completed
    if (isTransitioningToCompleted) {
      await this.timelines.create({
        enrollment: { connect: { id: enrollmentId } },
        eventType: TimelineEventType.UNIT_COMPLETED,
        metadata: {
          learningUnitId: input.learningUnitId,
          title: unit.title,
          unitType: unit.type,
        },
      });

      this.events.emitUnitCompleted({
        enrollmentId,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        learningUnitId: input.learningUnitId,
        unitType: unit.type,
        completedAt: new Date().toISOString(),
      });
    }

    // Trigger full course completion recalculation
    await this.recalculateCourseCompletion(enrollmentId);

    return updatedProgress;
  }

  /**
   * Recalculates total course completion statistics.
   */
  public async recalculateCourseCompletion(enrollmentId: string): Promise<CourseCompletion> {
    const enrollment = await this.enrollments.findById(enrollmentId);
    if (!enrollment) {
      throw AppError.notFound("Enrollment not found.");
    }

    // Fetch all course units
    const units = await learningUnitRepository.findManyByCourseId(enrollment.courseId);

    const totalUnits = units.length;
    if (totalUnits === 0) {
      return this.completions.upsert(
        enrollmentId,
        {
          progressPercent: 100,
          estimatedRemainingSeconds: 0,
          eligibleForCertificate: true,
          completedAt: new Date(),
        },
        {
          progressPercent: 100,
          estimatedRemainingSeconds: 0,
          eligibleForCertificate: true,
          completedAt: new Date(),
        }
      );
    }

    // Fetch completed progress entries
    const progressList = await this.progress.findManyByEnrollment(enrollmentId);
    const progressMap = new Map(progressList.map((p) => [p.learningUnitId, p]));

    let totalProgressPercent = 0;
    let completedUnitsCount = 0;
    let remainingSeconds = 0;

    for (const unit of units) {
      const prog = progressMap.get(unit.id);
      if (prog) {
        totalProgressPercent += prog.completionPercent;
        if (prog.status === ProgressStatus.COMPLETED) {
          completedUnitsCount++;
        }
        remainingSeconds += Math.max(0, Math.round((1 - prog.completionPercent / 100) * (unit.duration * 60)));
      } else {
        remainingSeconds += unit.duration * 60;
      }
    }

    const calculatedProgress = Math.min(100, totalProgressPercent / totalUnits);
    const isFinished = completedUnitsCount === totalUnits; // Requires all units marked completed

    // Customizable certificate eligibility evaluation
    const eligibleForCertificate = isFinished;

    const isTransitioningToCompleted = isFinished && enrollment.status !== EnrollmentStatus.COMPLETED;

    const completion = await this.completions.upsert(
      enrollmentId,
      {
        progressPercent: calculatedProgress,
        estimatedRemainingSeconds: remainingSeconds,
        eligibleForCertificate,
        completedAt: isFinished ? new Date() : null,
      },
      {
        progressPercent: calculatedProgress,
        estimatedRemainingSeconds: remainingSeconds,
        eligibleForCertificate,
        completedAt: isFinished ? new Date() : null,
      }
    );

    if (isTransitioningToCompleted) {
      // Update enrollment status
      await this.enrollments.update(enrollmentId, {
        status: EnrollmentStatus.COMPLETED,
        completedAt: new Date(),
      });

      // Log event
      await this.timelines.create({
        enrollment: { connect: { id: enrollmentId } },
        eventType: TimelineEventType.COURSE_COMPLETED,
        metadata: { completionPercent: 100 },
      });

      // Emit completed signals
      this.events.emitEnrollmentCompleted({
        enrollmentId,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        completedAt: new Date().toISOString(),
      });

      this.events.emitCourseCompleted({
        enrollmentId,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        completedAt: new Date().toISOString(),
        reason: CourseCompletionReason.COMPLETED_ALL_UNITS,
      });
    }

    return completion;
  }

  /**
   * Tracks starting a new learning session.
   */
  public async startSession(
    userId: string,
    enrollmentId: string,
    input: StartSessionInput
  ): Promise<LearningSession> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    // 1. Close any existing active session
    const active = await this.sessions.findActiveSession(enrollmentId);
    if (active) {
      const now = new Date();
      const dur = Math.round((now.getTime() - active.startedAt.getTime()) / 1000);
      await this.sessions.update(active.id, {
        status: SessionStatus.COMPLETED,
        endedAt: now,
        duration: dur,
      });

      this.events.emitSessionEnded({
        sessionId: active.id,
        enrollmentId,
        learningUnitId: active.learningUnitId,
        duration: dur,
        endedAt: now.toISOString(),
      });
    }

    // 2. Start new session
    const session = await this.sessions.create({
      enrollment: { connect: { id: enrollmentId } },
      ...(input.learningUnitId && { learningUnit: { connect: { id: input.learningUnitId } } }),
      device: input.device || "Unknown Device",
      browser: input.browser || "Unknown Browser",
      ipAddress: input.ipAddress || "127.0.0.1",
      userAgent: input.userAgent || "Unknown User Agent",
      status: SessionStatus.ACTIVE,
    });

    if (input.learningUnitId) {
      // Log event
      await this.timelines.create({
        enrollment: { connect: { id: enrollmentId } },
        eventType: TimelineEventType.UNIT_STARTED,
        metadata: { learningUnitId: input.learningUnitId },
      });

      this.events.emitLearningStarted({
        enrollmentId,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        startedAt: new Date().toISOString(),
      });
    }

    return session;
  }

  /**
   * Ends an active learning session.
   */
  public async endSession(userId: string, sessionId: string): Promise<LearningSession> {
    const session = await this.sessions.findById(sessionId);
    if (!session) {
      throw AppError.notFound("Learning session not found.");
    }

    await this.validateAccess(session.enrollmentId, userId);

    if (session.status !== SessionStatus.ACTIVE) {
      return session;
    }

    const now = new Date();
    const duration = Math.round((now.getTime() - session.startedAt.getTime()) / 1000);

    const updated = await this.sessions.update(sessionId, {
      status: SessionStatus.COMPLETED,
      endedAt: now,
      duration,
    });

    this.events.emitSessionEnded({
      sessionId: session.id,
      enrollmentId: session.enrollmentId,
      learningUnitId: session.learningUnitId,
      duration,
      endedAt: now.toISOString(),
    });

    return updated;
  }

  /**
   * Returns recommendation data on what to learn next.
   */
  public async continueLearning(
    userId: string,
    enrollmentId: string
  ): Promise<{
    lastViewedUnit: LearningUnit | null;
    lastPosition: number;
    nextUnit: LearningUnit | null;
  }> {
    const enrollment = await this.validateAccess(enrollmentId, userId);

    // Fetch all course units ordered sequentially
    const units = await learningUnitRepository.findManyByCourseId(enrollment.courseId);

    if (units.length === 0) {
      return { lastViewedUnit: null, lastPosition: 0, nextUnit: null };
    }

    const progressList = await this.progress.findManyByEnrollment(enrollmentId);
    const progressMap = new Map(progressList.map((p) => [p.learningUnitId, p]));

    // Find last viewed unit based on lastViewedAt date
    let lastViewedUnit: LearningUnit | null = null;
    let lastPosition = 0;
    let lastViewedDate: Date | null = null;

    for (const unit of units) {
      const prog = progressMap.get(unit.id);
      if (prog && prog.lastViewedAt) {
        if (!lastViewedDate || prog.lastViewedAt.getTime() > lastViewedDate.getTime()) {
          lastViewedDate = prog.lastViewedAt;
          lastViewedUnit = unit;
          lastPosition = prog.lastPosition;
        }
      }
    }

    // Recommend next unit
    let nextUnit: LearningUnit | null = null;

    if (!lastViewedUnit) {
      // Recommend the first unit if no progress made
      nextUnit = units[0];
    } else {
      const lastProg = progressMap.get(lastViewedUnit.id);
      if (lastProg && lastProg.status !== ProgressStatus.COMPLETED) {
        // Continue working on the current unit
        nextUnit = lastViewedUnit;
      } else {
        // Recommend the next sequential incomplete unit
        const lastIndex = units.findIndex((u) => u.id === lastViewedUnit!.id);
        for (let i = lastIndex + 1; i < units.length; i++) {
          const prog = progressMap.get(units[i].id);
          if (!prog || prog.status !== ProgressStatus.COMPLETED) {
            nextUnit = units[i];
            break;
          }
        }
      }
    }

    return {
      lastViewedUnit,
      lastPosition,
      nextUnit,
    };
  }

  /**
   * Helper to fetch course's total duration in minutes.
   */
  private async getCourseDurationMinutes(courseId: string): Promise<number> {
    return learningUnitRepository.getSumDurationByCourseId(courseId);
  }

  /**
   * Validates if user has permission to manage/access the enrollment.
   */
  private async validateAccess(enrollmentId: string, userId: string): Promise<Enrollment> {
    const enrollment = await this.enrollments.findById(enrollmentId);
    if (!enrollment) {
      throw AppError.notFound("Enrollment not found.");
    }

    if (enrollment.userId !== userId) {
      // Admin bypass
      const userRoles = await userRepository.findRolesByUserId(userId);
      const roleNames = userRoles.map((ur) => ur.role.name);
      const isPrivileged = roleNames.includes("ADMIN") || roleNames.includes("SUPER_ADMIN");

      if (!isPrivileged) {
        throw AppError.forbidden("You do not have permission to access this enrollment data.");
      }
    }

    return enrollment;
  }
}

export const learningEngineService = new LearningEngineService();
export default learningEngineService;
