import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import { instructorStudioEvents } from "../modules/instructor-studio/instructor-studio.events";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { CourseStatus, CourseVisibility, DifficultyLevel, MediaStatus, LearningUnitType } from "@prisma/client";

// Mock database client singleton
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    course: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    courseModule: {
      create: vi.fn(),
      update: vi.fn(),
    },
    learningUnit: {
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    userRole: {
      findMany: vi.fn(),
    },
    $transaction: vi.fn().mockImplementation((promises) => Promise.all(promises)),
  };
  return { prisma: mockPrisma };
});

describe("Instructor Studio Integration Tests", () => {
  const secret = config.jwt.secret;

  // Define valid UUIDs
  const instructorId = "11111111-2222-3333-4444-555555555555";
  const strangerId = "22222222-3333-4444-5555-666666666666";
  const reviewerId = "33333333-4444-5555-6666-777777777777";
  const courseId = "44444444-5555-6666-7777-888888888888";
  const moduleId = "55555555-6666-7777-8888-999999999999";
  const unitId = "66666666-7777-8888-9999-000000000000";

  let instructorToken = "";
  let strangerToken = "";
  let reviewerToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    instructorToken = jwt.sign(
      { userId: instructorId, email: "instructor@pragyaos.com", roles: ["INSTRUCTOR"] },
      secret,
      { expiresIn: "1h" }
    );
    strangerToken = jwt.sign(
      { userId: strangerId, email: "stranger@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );
    reviewerToken = jwt.sign(
      { userId: reviewerId, email: "reviewer@pragyaos.com", roles: ["REVIEWER"] },
      secret,
      { expiresIn: "1h" }
    );

    // Mock roles database fetch
    (prisma.userRole.findMany as any).mockImplementation((args: any) => {
      const uid = args.where.userId;
      if (uid === reviewerId) {
        return Promise.resolve([
          { role: { name: "REVIEWER" } },
        ]);
      }
      return Promise.resolve([
        { role: { name: "INSTRUCTOR" } },
      ]);
    });
  });

  describe("Publishing Rule Engine & Checklist", () => {
    it("should return the publishing checklist and detect critical metadata / curriculum failures", async () => {
      const mockCourse = {
        id: courseId,
        title: "Test Course Draft",
        slug: "test-course-draft",
        categoryId: null, // Critical fail: no category
        thumbnailId: null, // Warning: no thumbnail
        trailerId: null,
        language: "en",
        difficulty: DifficultyLevel.BEGINNER,
        status: CourseStatus.DRAFT,
        revisionNumber: 1,
        instructors: [{ userId: instructorId }],
        objectives: [],
        requirements: [],
        faqs: [],
        modules: [], // Critical fail: no modules
      };

      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);

      const res = await request(app)
        .get(`/api/v1/instructor-studio/courses/${courseId}/checklist`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.isReady).toBe(false); // Critical failures present

      const rules = res.body.data.rules;
      const catRule = rules.find((r: any) => r.ruleId === "course-category");
      expect(catRule.status).toBe("FAILED");

      const health = res.body.data.score;
      expect(health).toBeLessThan(100);
    });
  });

  describe("Workflow Lifecycle Transitions", () => {
    it("should allow owner to submit draft for review if no critical failures exist", async () => {
      const mockCourse = {
        id: courseId,
        title: "Complete Course Draft",
        slug: "complete-course-draft",
        categoryId: "cat-uuid",
        thumbnailId: "thumbnail-uuid",
        trailerId: "trailer-uuid",
        language: "en",
        difficulty: DifficultyLevel.BEGINNER,
        status: CourseStatus.DRAFT,
        revisionNumber: 1,
        instructors: [{ userId: instructorId }],
        objectives: [{ id: "obj-1" }],
        requirements: [{ id: "req-1" }],
        faqs: [],
        modules: [
          {
            id: moduleId,
            sequence: 1,
            learningUnits: [{ id: unitId, type: "VIDEO", title: "Unit 1", mediaId: "media-uuid", media: { status: "READY" } }],
          },
        ],
      };

      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.course.update as any).mockResolvedValue({
        ...mockCourse,
        status: CourseStatus.REVIEW,
      });

      const eventSpy = vi.spyOn(instructorStudioEvents, "emitCourseSubmittedForReview");

      const res = await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/review`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(CourseStatus.REVIEW);
      expect(eventSpy).toHaveBeenCalled();
    });

    it("should prevent non-privileged instructors from directly publishing courses", async () => {
      const mockCourse = {
        id: courseId,
        status: CourseStatus.REVIEW,
        instructors: [{ userId: instructorId }],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);

      await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/publish`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .expect(403); // Forbidden
    });

    it("should allow reviewer/admin role to publish an approved course", async () => {
      const mockCourse = {
        id: courseId,
        title: "Complete Course Draft",
        slug: "complete-course-draft",
        categoryId: "cat-uuid",
        thumbnailId: "thumbnail-uuid",
        trailerId: "trailer-uuid",
        language: "en",
        difficulty: DifficultyLevel.BEGINNER,
        status: CourseStatus.REVIEW,
        revisionNumber: 1,
        instructors: [{ userId: instructorId }],
        objectives: [{ id: "obj-1" }],
        requirements: [{ id: "req-1" }],
        faqs: [],
        modules: [
          {
            id: moduleId,
            sequence: 1,
            learningUnits: [{ id: unitId, type: "VIDEO", title: "Unit 1", mediaId: "media-uuid", media: { status: "READY" } }],
          },
        ],
      };

      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.course.update as any).mockResolvedValue({
        ...mockCourse,
        status: CourseStatus.PUBLISHED,
        revisionNumber: 2,
      });

      const eventSpy = vi.spyOn(instructorStudioEvents, "emitCoursePublished");

      const res = await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/publish`)
        .set("Authorization", `Bearer ${reviewerToken}`)
        .send({ changeSummary: "Approve version 2." })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(CourseStatus.PUBLISHED);
      expect(res.body.data.revisionNumber).toBe(2);
      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe("Course Builder Curriculum Management", () => {
    it("should duplicate a course, its metadata, modules, and units", async () => {
      const mockCourse = {
        id: courseId,
        title: "Original Title",
        slug: "orig-slug",
        categoryId: "cat-uuid",
        thumbnailId: "thumbnail-uuid",
        trailerId: "trailer-uuid",
        language: "en",
        difficulty: DifficultyLevel.BEGINNER,
        status: CourseStatus.PUBLISHED,
        revisionNumber: 2,
        instructors: [{ userId: instructorId }],
        objectives: [{ description: "Objective 1", sequence: 1 }],
        requirements: [{ description: "Req 1", sequence: 1 }],
        faqs: [],
        modules: [
          {
            id: moduleId,
            title: "Module 1",
            description: "Mod Desc",
            sequence: 1,
            learningUnits: [{ title: "Unit 1", description: "Unit Desc", type: "VIDEO", sequence: 1, mediaId: "media-uuid", content: {}, duration: 10 }],
          },
        ],
      };

      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.course.create as any).mockResolvedValue({
        id: "duplicated-course-uuid",
        title: "Duplicated Course Title",
        slug: "orig-slug-copy-12345",
      });

      const res = await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/duplicate`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ newTitle: "Duplicated Course Title" })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe("duplicated-course-uuid");
      expect(prisma.course.create).toHaveBeenCalled();
    });

    it("should allow reordering module curriculum positions", async () => {
      const mockCourse = {
        id: courseId,
        instructors: [{ userId: instructorId }],
        modules: [
          { id: "mod-1", sequence: 1, learningUnits: [] },
          { id: "mod-2", sequence: 2, learningUnits: [] },
        ],
        requirements: [],
        objectives: [],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);

      const res = await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/modules/mod-1/move`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ targetIndex: 1 })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(prisma.courseModule.update).toHaveBeenCalled();
    });
  });

  describe("Stateless Previews", () => {
    it("should sign and return a preview token for instructors", async () => {
      const mockCourse = {
        id: courseId,
        instructors: [{ userId: instructorId }],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);

      const res = await request(app)
        .post(`/api/v1/instructor-studio/courses/${courseId}/preview-token`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ scope: "INSTRUCTOR", expiresInSeconds: 600 })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.previewToken).toBeDefined();

      const decoded: any = jwt.verify(res.body.data.previewToken, config.jwt.secret);
      expect(decoded.courseId).toBe(courseId);
      expect(decoded.previewScope).toBe("INSTRUCTOR");
    });
  });
});
