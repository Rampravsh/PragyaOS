import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import { learningEngineEvents } from "../modules/learning-engine/learning-engine.events";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { EnrollmentStatus, ProgressStatus, SessionStatus, TimelineEventType, CourseCompletionReason, LearningUnitType } from "@prisma/client";

// Mock database client singleton
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    course: {
      findUnique: vi.fn(),
    },
    enrollment: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    learningProgress: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    learningSession: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    learningTimeline: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
    courseCompletion: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    learningUnit: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn().mockResolvedValue({ _sum: { duration: 120 } }),
    },
    userRole: {
      findMany: vi.fn(),
    },
  };
  return { prisma: mockPrisma };
});

describe("Learning Engine Integration Tests", () => {
  const secret = config.jwt.secret;
  
  // Define valid UUIDs for all identifiers
  const adminId = "11111111-2222-3333-4444-555555555555";
  const userId = "22222222-3333-4444-5555-666666666666";
  const strangerId = "33333333-4444-5555-6666-777777777777";
  const courseId = "44444444-5555-6666-7777-888888888888";
  const enrollmentId = "55555555-6666-7777-8888-999999999999";
  const unitId = "66666666-7777-8888-9999-000000000000";
  const quizUnitId = "77777777-8888-9999-0000-111111111111";
  const sessionId = "88888888-9999-0000-1111-222222222222";

  let adminToken = "";
  let studentToken = "";
  let strangerToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    adminToken = jwt.sign(
      { userId: adminId, email: "admin@pragyaos.com", roles: ["ADMIN"] },
      secret,
      { expiresIn: "1h" }
    );
    studentToken = jwt.sign(
      { userId: userId, email: "student@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );
    strangerToken = jwt.sign(
      { userId: strangerId, email: "stranger@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );

    // Mock roles database fetch
    (prisma.userRole.findMany as any).mockImplementation((args: any) => {
      const uid = args.where.userId;
      if (uid === adminId) {
        return Promise.resolve([
          { role: { name: "ADMIN" } },
        ]);
      }
      return Promise.resolve([
        { role: { name: "STUDENT" } },
      ]);
    });
  });

  describe("Enrollment Operations", () => {
    it("should successfully enroll a student in a course", async () => {
      (prisma.course.findUnique as any).mockResolvedValue({ id: courseId, title: "TypeScript Core" });
      (prisma.enrollment.findUnique as any).mockResolvedValue(null); // No existing enrollment
      (prisma.enrollment.create as any).mockResolvedValue({
        id: enrollmentId,
        userId,
        courseId,
        status: EnrollmentStatus.ACTIVE,
        source: "MANUAL",
        purchaseRef: null,
        enrolledAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const eventSpy = vi.spyOn(learningEngineEvents, "emitEnrollmentCreated");

      const res = await request(app)
        .post("/api/v1/learning-engine/enroll")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ courseId })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(EnrollmentStatus.ACTIVE);
      expect(eventSpy).toHaveBeenCalled();
    });

    it("should allow student to suspend, resume, and cancel enrollment", async () => {
      const mockEnrollment = {
        id: enrollmentId,
        userId,
        courseId,
        status: EnrollmentStatus.ACTIVE,
        enrolledAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.enrollment.findUnique as any).mockResolvedValue(mockEnrollment);
      (prisma.enrollment.update as any).mockImplementation((args: any) => {
        return Promise.resolve({
          ...mockEnrollment,
          status: args.data.status,
        });
      });

      // 1. Suspend
      let res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/suspend`)
        .set("Authorization", `Bearer ${studentToken}`)
        .expect(200);

      expect(res.body.data.status).toBe(EnrollmentStatus.SUSPENDED);

      // 2. Resume
      res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/resume`)
        .set("Authorization", `Bearer ${studentToken}`)
        .expect(200);

      expect(res.body.data.status).toBe(EnrollmentStatus.ACTIVE);

      // 3. Cancel
      res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/cancel`)
        .set("Authorization", `Bearer ${studentToken}`)
        .expect(200);

      expect(res.body.data.status).toBe(EnrollmentStatus.CANCELLED);
    });

    it("should prevent stranger from modifying student enrollment", async () => {
      (prisma.enrollment.findUnique as any).mockResolvedValue({
        id: enrollmentId,
        userId,
      });

      await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/suspend`)
        .set("Authorization", `Bearer ${strangerToken}`)
        .expect(403);
    });
  });

  describe("Progress & Completion Recalculations", () => {
    it("should calculate video progress watch ratio correctly and update status to COMPLETED at 90%", async () => {
      (prisma.enrollment.findUnique as any).mockResolvedValue({ id: enrollmentId, userId, courseId, status: EnrollmentStatus.ACTIVE });
      (prisma.learningUnit.findUnique as any).mockResolvedValue({
        id: unitId,
        type: LearningUnitType.VIDEO,
        duration: 10, // 10 minutes = 600 seconds
        title: "Intro Video",
      });
      (prisma.learningProgress.findUnique as any).mockResolvedValue(null);

      // We watched 540 seconds (90% of 600s) -> Should trigger complete
      (prisma.learningProgress.upsert as any).mockImplementation((args: any) => {
        return Promise.resolve({
          id: "progress-uuid",
          enrollmentId,
          learningUnitId: unitId,
          status: ProgressStatus.COMPLETED,
          completionPercent: 100,
          watchTime: args.create.watchTime,
          lastPosition: args.create.lastPosition,
        });
      });

      // Mocks for recalculation
      (prisma.learningUnit.findMany as any).mockResolvedValue([
        { id: unitId, duration: 10 },
      ]);
      (prisma.learningProgress.findMany as any).mockResolvedValue([
        { learningUnitId: unitId, completionPercent: 100, status: ProgressStatus.COMPLETED },
      ]);
      (prisma.courseCompletion.upsert as any).mockResolvedValue({
        id: "completion-uuid",
        progressPercent: 100,
        eligibleForCertificate: true,
      });

      const res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/progress`)
        .set("Authorization", `Bearer ${studentToken}`)
        .send({
          learningUnitId: unitId,
          watchTime: 540,
          lastPosition: 540,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(ProgressStatus.COMPLETED);
    });

    it("should enforce passing score criteria for QUIZ progress strategies", async () => {
      (prisma.enrollment.findUnique as any).mockResolvedValue({ id: enrollmentId, userId, courseId, status: EnrollmentStatus.ACTIVE });
      (prisma.learningUnit.findUnique as any).mockResolvedValue({
        id: quizUnitId,
        type: LearningUnitType.QUIZ,
        duration: 20,
        title: "Midterm Exam",
      });
      (prisma.learningProgress.findUnique as any).mockResolvedValue(null);

      // Quiz passing strategy: Score 75/100 (Passing: 80) -> Should remain STARTED
      (prisma.learningProgress.upsert as any).mockImplementation((args: any) => {
        return Promise.resolve({
          id: "progress-uuid",
          enrollmentId,
          learningUnitId: quizUnitId,
          status: ProgressStatus.STARTED,
          completionPercent: 75,
          watchTime: 0,
          lastPosition: 0,
        });
      });

      const res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/progress`)
        .set("Authorization", `Bearer ${studentToken}`)
        .send({
          learningUnitId: quizUnitId,
          quizScore: 75,
          quizPassingScore: 80,
          quizMaxScore: 100,
        })
        .expect(200);

      expect(res.body.data.status).toBe(ProgressStatus.STARTED);
    });
  });

  describe("Learning Sessions & Recents API", () => {
    it("should start and complete learning sessions", async () => {
      (prisma.enrollment.findUnique as any).mockResolvedValue({ id: enrollmentId, userId });
      (prisma.learningSession.findFirst as any).mockResolvedValue(null); // No active session
      (prisma.learningSession.create as any).mockResolvedValue({
        id: sessionId,
        enrollmentId,
        status: SessionStatus.ACTIVE,
        startedAt: new Date(),
        learningUnitId: null,
        device: "iPhone",
        browser: "Safari",
        ipAddress: "127.0.0.1",
        userAgent: "Safari",
        endedAt: null,
        duration: null,
      });

      // 1. Start Session
      let res = await request(app)
        .post(`/api/v1/learning-engine/enrollments/${enrollmentId}/sessions/start`)
        .set("Authorization", `Bearer ${studentToken}`)
        .send({ device: "iPhone", browser: "Safari" })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(sessionId);

      // 2. End Session
      (prisma.learningSession.findUnique as any).mockResolvedValue({
        id: sessionId,
        enrollmentId,
        status: SessionStatus.ACTIVE,
        startedAt: new Date(Date.now() - 60000), // Started 60 seconds ago
      });
      (prisma.learningSession.update as any).mockResolvedValue({
        id: sessionId,
        enrollmentId,
        status: SessionStatus.COMPLETED,
        duration: 60,
        startedAt: new Date(Date.now() - 60000),
        endedAt: new Date(),
        learningUnitId: null,
        device: "iPhone",
        browser: "Safari",
        ipAddress: "127.0.0.1",
        userAgent: "Safari",
      });

      res = await request(app)
        .post(`/api/v1/learning-engine/sessions/${sessionId}/end`)
        .set("Authorization", `Bearer ${studentToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.duration).toBe(60);
    });

    it("should recommend next sequential unit in continue learning API", async () => {
      (prisma.enrollment.findUnique as any).mockResolvedValue({ id: enrollmentId, userId, courseId });
      
      // Course has 3 units
      (prisma.learningUnit.findMany as any).mockResolvedValue([
        { id: "unit-1", title: "Unit One", sequence: 1, moduleId: "mod-1" },
        { id: "unit-2", title: "Unit Two", sequence: 2, moduleId: "mod-1" },
        { id: "unit-3", title: "Unit Three", sequence: 3, moduleId: "mod-1" },
      ]);

      // Progress: unit-1 is COMPLETED, unit-2 is NOT started
      (prisma.learningProgress.findMany as any).mockResolvedValue([
        { learningUnitId: "unit-1", status: ProgressStatus.COMPLETED, completionPercent: 100, lastViewedAt: new Date(Date.now() - 10000) },
      ]);

      const res = await request(app)
        .get(`/api/v1/learning-engine/enrollments/${enrollmentId}/continue`)
        .set("Authorization", `Bearer ${studentToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.nextUnit.id).toBe("unit-2"); // Recommends first incomplete
    });
  });
});
