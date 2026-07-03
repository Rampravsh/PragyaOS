import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import jwt from "jsonwebtoken";
import { config } from "../config";

const CAT1_UUID = "11111111-1111-1111-1111-111111111111";
const CAT2_UUID = "22222222-2222-2222-2222-222222222222";
const CAT3_UUID = "33333333-3333-3333-3333-333333333333";
const COURSE_UUID = "44444444-4444-4444-4444-444444444444";
const MOD1_UUID = "55555555-5555-5555-5555-555555555555";
const MOD2_UUID = "66666666-6666-6666-6666-666666666666";
const UNIT1_UUID = "77777777-7777-7777-7777-777777777777";
const UNIT2_UUID = "88888888-8888-8888-8888-888888888888";

// Mock the Prisma Client singleton to maintain fast, offline-capable unit testing
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    category: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    courseModule: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
    learningUnit: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
    userRole: {
      findMany: vi.fn(),
    },
    tag: {
      upsert: vi.fn(),
    },
    courseTag: {
      deleteMany: vi.fn(),
    },
    courseRequirement: {
      deleteMany: vi.fn(),
    },
    courseObjective: {
      deleteMany: vi.fn(),
    },
    courseInstructor: {
      deleteMany: vi.fn(),
    },
    $transaction: vi.fn((cb) => {
      if (typeof cb === "function") {
        return cb(mockPrisma);
      }
      return Promise.all(cb);
    }),
  };
  return { prisma: mockPrisma };
});

describe("Learning Content Domain Integration Tests", () => {
  const secret = config.jwt.secret;
  const adminId = "admin-uuid-999";
  const instructorId = "instructor-uuid-888";
  const studentId = "student-uuid-777";

  let adminToken = "";
  let instructorToken = "";
  let studentToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock tokens with correct userId keys
    adminToken = jwt.sign(
      { userId: adminId, email: "admin@pragyaos.com", roles: ["ADMIN"] },
      secret,
      { expiresIn: "1h" }
    );
    instructorToken = jwt.sign(
      { userId: instructorId, email: "instructor@pragyaos.com", roles: ["INSTRUCTOR"] },
      secret,
      { expiresIn: "1h" }
    );
    studentToken = jwt.sign(
      { userId: studentId, email: "student@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );

    // Mock permissions resolver bypass for testing roles
    (prisma.userRole.findMany as any).mockImplementation((args: any) => {
      const userId = args.where.userId;
      if (userId === adminId) {
        return Promise.resolve([
          { role: { name: "ADMIN", rolePermissions: [{ permission: { name: "user:update" } }, { permission: { name: "user:delete" } }] } },
        ]);
      }
      if (userId === instructorId) {
        return Promise.resolve([
          { role: { name: "INSTRUCTOR", rolePermissions: [{ permission: { name: "user:update" } }] } },
        ]);
      }
      return Promise.resolve([
        { role: { name: "STUDENT", rolePermissions: [{ permission: { name: "course:read" } }] } },
      ]);
    });
  });

  describe("Categories CRUD", () => {
    it("should retrieve category recursive trees", async () => {
      const mockCategories = [
        { id: CAT1_UUID, parentId: null, name: "Engineering", slug: "engineering", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: CAT2_UUID, parentId: CAT1_UUID, name: "Web Dev", slug: "web-dev", description: null, createdAt: new Date(), updatedAt: new Date() },
      ];
      (prisma.category.findMany as any).mockResolvedValue(mockCategories);

      const res = await request(app)
        .get("/api/v1/categories")
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].id).toBe(CAT1_UUID);
      expect(res.body.data[0].children[0].id).toBe(CAT2_UUID);
    });

    it("should allow Admin to create a category", async () => {
      const newCat = { id: CAT3_UUID, parentId: null, name: "Math", slug: "math", description: null, createdAt: new Date(), updatedAt: new Date() };
      (prisma.category.findFirst as any).mockResolvedValue(null);
      (prisma.category.findUnique as any).mockResolvedValue(null);
      (prisma.category.create as any).mockResolvedValue(newCat);

      const res = await request(app)
        .post("/api/v1/categories")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "Math" })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Math");
    });

    it("should prevent duplicate slugs during category creation", async () => {
      (prisma.category.findFirst as any).mockResolvedValue(null);
      (prisma.category.findUnique as any).mockResolvedValue({ id: CAT1_UUID });

      const res = await request(app)
        .post("/api/v1/categories")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "Web Dev", slug: "web-dev" })
        .expect(409);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("already in use");
    });

    it("should restrict category delete if containing subcategories", async () => {
      (prisma.category.findUnique as any).mockResolvedValue({ id: CAT1_UUID });
      (prisma.category.count as any).mockImplementation((args: any) => {
        if (args.where.parentId) return Promise.resolve(1); // subcategory exists
        return Promise.resolve(0);
      });

      const res = await request(app)
        .delete(`/api/v1/categories/${CAT1_UUID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("nested sub-categories");
    });
  });

  describe("Courses CRUD & Ownership", () => {
    it("should allow instructor to create a course", async () => {
      const mockCourse = {
        id: COURSE_UUID,
        categoryId: CAT1_UUID,
        slug: "intro-to-coding-abc",
        title: "Intro to Coding",
        status: "DRAFT",
        visibility: "PUBLIC",
        createdAt: new Date(),
        updatedAt: new Date(),
        instructors: [],
        requirements: [],
        objectives: [],
        tags: [],
      };
      (prisma.category.findUnique as any).mockResolvedValue({ id: CAT1_UUID });
      (prisma.course.create as any).mockResolvedValue(mockCourse);

      const res = await request(app)
        .post("/api/v1/courses")
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({
          title: "Intro to Coding",
          categoryId: CAT1_UUID,
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(COURSE_UUID);
    });

    it("should enforce ownership checks on course updates", async () => {
      const mockCourse = {
        id: COURSE_UUID,
        categoryId: CAT1_UUID,
        instructors: [{ userId: "other-instructor-id" }],
        requirements: [],
        objectives: [],
        tags: [],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);

      const res = await request(app)
        .patch(`/api/v1/courses/${COURSE_UUID}`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ title: "New Title" })
        .expect(403);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("do not own or instruct");
    });

    it("should allow admin to bypass ownership checks on updates", async () => {
      const mockCourse = {
        id: COURSE_UUID,
        categoryId: CAT1_UUID,
        instructors: [{ userId: "other-instructor-id", user: { id: "other", email: "other@pragyaos.com" } }],
        requirements: [],
        objectives: [],
        tags: [],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.course.update as any).mockResolvedValue({
        ...mockCourse,
        title: "Admin Override Title",
      });

      const res = await request(app)
        .patch(`/api/v1/courses/${COURSE_UUID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ title: "Admin Override Title" })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Admin Override Title");
    });
  });

  describe("Modules & Units Reordering", () => {
    it("should reorder course modules in a single transaction", async () => {
      const mockCourse = {
        id: COURSE_UUID,
        instructors: [{ userId: instructorId }],
      };
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.courseModule.count as any).mockResolvedValue(2);
      (prisma.courseModule.findMany as any).mockResolvedValue([
        { id: MOD2_UUID, sequence: 1 },
        { id: MOD1_UUID, sequence: 2 },
      ]);

      const res = await request(app)
        .post(`/api/v1/courses/${COURSE_UUID}/modules/reorder`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ moduleIds: [MOD2_UUID, MOD1_UUID] })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data[0].id).toBe(MOD2_UUID);
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it("should reorder learning units in a module", async () => {
      const mockCourse = {
        id: COURSE_UUID,
        instructors: [{ userId: instructorId }],
      };
      (prisma.courseModule.findUnique as any).mockResolvedValue({ courseId: COURSE_UUID });
      (prisma.course.findUnique as any).mockResolvedValue(mockCourse);
      (prisma.learningUnit.count as any).mockResolvedValue(2);
      (prisma.learningUnit.findMany as any).mockResolvedValue([
        { id: UNIT2_UUID, sequence: 1 },
        { id: UNIT1_UUID, sequence: 2 },
      ]);

      const res = await request(app)
        .post(`/api/v1/learning-units/modules/${MOD1_UUID}/units/reorder`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({ unitIds: [UNIT2_UUID, UNIT1_UUID] })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data[0].id).toBe(UNIT2_UUID);
      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });
});
