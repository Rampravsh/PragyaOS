import { prisma } from "../../database/client";
import {
  Enrollment,
  LearningProgress,
  LearningSession,
  LearningTimeline,
  CourseCompletion,
  Prisma,
  EnrollmentStatus,
  ProgressStatus,
  SessionStatus
} from "@prisma/client";

export class EnrollmentRepository {
  public async findById(id: string): Promise<Enrollment | null> {
    return prisma.enrollment.findUnique({ where: { id } });
  }

  public async findByUserAndCourse(userId: string, courseId: string): Promise<Enrollment | null> {
    return prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
  }

  public async findManyByUser(userId: string): Promise<Enrollment[]> {
    return prisma.enrollment.findMany({ where: { userId } });
  }

  public async create(data: Prisma.EnrollmentCreateInput): Promise<Enrollment> {
    return prisma.enrollment.create({ data });
  }

  public async update(id: string, data: Prisma.EnrollmentUpdateInput): Promise<Enrollment> {
    return prisma.enrollment.update({
      where: { id },
      data,
    });
  }
}

export class LearningProgressRepository {
  public async findById(id: string): Promise<LearningProgress | null> {
    return prisma.learningProgress.findUnique({ where: { id } });
  }

  public async findByEnrollmentAndUnit(enrollmentId: string, learningUnitId: string): Promise<LearningProgress | null> {
    return prisma.learningProgress.findUnique({
      where: {
        enrollmentId_learningUnitId: { enrollmentId, learningUnitId },
      },
    });
  }

  public async findManyByEnrollment(enrollmentId: string): Promise<LearningProgress[]> {
    return prisma.learningProgress.findMany({ where: { enrollmentId } });
  }

  public async create(data: Prisma.LearningProgressCreateInput): Promise<LearningProgress> {
    return prisma.learningProgress.create({ data });
  }

  public async update(id: string, data: Prisma.LearningProgressUpdateInput): Promise<LearningProgress> {
    return prisma.learningProgress.update({
      where: { id },
      data,
    });
  }

  public async upsert(
    enrollmentId: string,
    learningUnitId: string,
    createData: Omit<Prisma.LearningProgressCreateInput, "enrollment" | "learningUnit">,
    updateData: Prisma.LearningProgressUpdateInput
  ): Promise<LearningProgress> {
    return prisma.learningProgress.upsert({
      where: {
        enrollmentId_learningUnitId: { enrollmentId, learningUnitId },
      },
      create: {
        ...createData,
        enrollment: { connect: { id: enrollmentId } },
        learningUnit: { connect: { id: learningUnitId } },
      },
      update: updateData,
    });
  }
}

export class LearningSessionRepository {
  public async findById(id: string): Promise<LearningSession | null> {
    return prisma.learningSession.findUnique({ where: { id } });
  }

  public async findActiveSession(enrollmentId: string): Promise<LearningSession | null> {
    return prisma.learningSession.findFirst({
      where: {
        enrollmentId,
        status: SessionStatus.ACTIVE,
      },
      orderBy: { startedAt: "desc" },
    });
  }

  public async create(data: Prisma.LearningSessionCreateInput): Promise<LearningSession> {
    return prisma.learningSession.create({ data });
  }

  public async update(id: string, data: Prisma.LearningSessionUpdateInput): Promise<LearningSession> {
    return prisma.learningSession.update({
      where: { id },
      data,
    });
  }
}

export class LearningTimelineRepository {
  /**
   * Appends an event to the timeline log. (Immutable, only appends)
   */
  public async create(data: Prisma.LearningTimelineCreateInput): Promise<LearningTimeline> {
    return prisma.learningTimeline.create({ data });
  }

  public async findManyByEnrollment(enrollmentId: string): Promise<LearningTimeline[]> {
    return prisma.learningTimeline.findMany({
      where: { enrollmentId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export class CourseCompletionRepository {
  public async findByEnrollment(enrollmentId: string): Promise<CourseCompletion | null> {
    return prisma.courseCompletion.findUnique({ where: { enrollmentId } });
  }

  public async create(data: Prisma.CourseCompletionCreateInput): Promise<CourseCompletion> {
    return prisma.courseCompletion.create({ data });
  }

  public async update(id: string, data: Prisma.CourseCompletionUpdateInput): Promise<CourseCompletion> {
    return prisma.courseCompletion.update({
      where: { id },
      data,
    });
  }

  public async upsert(
    enrollmentId: string,
    createData: Prisma.CourseCompletionCreateWithoutEnrollmentInput,
    updateData: Prisma.CourseCompletionUpdateWithoutEnrollmentInput
  ): Promise<CourseCompletion> {
    return prisma.courseCompletion.upsert({
      where: { enrollmentId },
      create: {
        ...createData,
        enrollment: { connect: { id: enrollmentId } },
      },
      update: updateData,
    });
  }
}

export const enrollmentRepo = new EnrollmentRepository();
export const learningProgressRepo = new LearningProgressRepository();
export const learningSessionRepo = new LearningSessionRepository();
export const learningTimelineRepo = new LearningTimelineRepository();
export const courseCompletionRepo = new CourseCompletionRepository();
