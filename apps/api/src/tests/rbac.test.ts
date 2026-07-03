import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import apiRouter from "../routes";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { permissionResolver } from "../modules/auth/auth.resolver";
import { Guard } from "../modules/auth/auth.middleware";
import { redisClient } from "../lib/redis";
import { prisma } from "../database/client";
import { Request, Response } from "express";

// Mount the test routes on apiRouter so they are placed before the global 404 handler
apiRouter.get("/test/rbac/student-read", Guard.Permission("course:read"), (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Read access granted." });
});

apiRouter.get("/test/rbac/instructor-create", Guard.Permission("course:create"), (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Create access granted." });
});

apiRouter.get("/test/rbac/admin-delete", Guard.Permission("user:delete"), (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Delete access granted." });
});

apiRouter.get("/test/rbac/role-admin", Guard.Role("ADMIN"), (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Role Admin verified." });
});

// Mock Prisma client singleton
vi.mock("../database/client", () => {
  return {
    prisma: {
      userRole: {
        findMany: vi.fn(),
      },
    },
  };
});

describe("RBAC Authorization Layers", () => {
  const secret = config.jwt.secret;
  let studentToken = "";
  let instructorToken = "";
  let adminToken = "";
  let superAdminToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    // Create JWT payloads matching roles
    studentToken = jwt.sign(
      { userId: "student-id", email: "student@pragya.com", roles: ["STUDENT"], permissions: [] },
      secret
    );
    instructorToken = jwt.sign(
      { userId: "instructor-id", email: "instructor@pragya.com", roles: ["INSTRUCTOR"], permissions: [] },
      secret
    );
    adminToken = jwt.sign(
      { userId: "admin-id", email: "admin@pragya.com", roles: ["ADMIN"], permissions: [] },
      secret
    );
    superAdminToken = jwt.sign(
      { userId: "superadmin-id", email: "super@pragya.com", roles: ["SUPER_ADMIN"], permissions: [] },
      secret
    );

    // Spy and bypass Redis checks during tests to isolate DB resolution
    vi.spyOn(redisClient, "get").mockResolvedValue(null);
    vi.spyOn(redisClient, "set").mockResolvedValue(undefined as any);
  });

  describe("Authentication Gate Checks", () => {
    it("should reject request with 401 when Authorization header is missing", async () => {
      const response = await request(app).get("/test/rbac/student-read");
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain("Authentication is required");
    });

    it("should reject request with 401 when JWT token is invalid", async () => {
      const response = await request(app)
        .get("/test/rbac/student-read")
        .set("Authorization", "Bearer invalid-token-signature");
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain("invalid or expired");
    });

    it("should reject request with 401 when JWT token has expired", async () => {
      const expiredToken = jwt.sign(
        { userId: "student-id", exp: Math.floor(Date.now() / 1000) - 60 },
        secret
      );
      const response = await request(app)
        .get("/test/rbac/student-read")
        .set("Authorization", `Bearer ${expiredToken}`);
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("Permission Gates Checks", () => {
    it("should allow Student to access student routes containing course:read", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        {
          role: {
            name: "STUDENT",
            rolePermissions: [{ permission: { name: "course:read" } }],
          },
        },
      ] as any);

      const response = await request(app)
        .get("/test/rbac/student-read")
        .set("Authorization", `Bearer ${studentToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Read access granted.");
    });

    it("should deny Student accessing Instructor routes (course:create)", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        {
          role: {
            name: "STUDENT",
            rolePermissions: [{ permission: { name: "course:read" } }],
          },
        },
      ] as any);

      const response = await request(app)
        .get("/test/rbac/instructor-create")
        .set("Authorization", `Bearer ${studentToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain("do not have permission");
    });

    it("should allow Instructor to create courses but deny deleting users", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        {
          role: {
            name: "INSTRUCTOR",
            rolePermissions: [
              { permission: { name: "course:read" } },
              { permission: { name: "course:create" } },
            ],
          },
        },
      ] as any);

      const createResponse = await request(app)
        .get("/test/rbac/instructor-create")
        .set("Authorization", `Bearer ${instructorToken}`);
      expect(createResponse.status).toBe(200);

      const deleteResponse = await request(app)
        .get("/test/rbac/admin-delete")
        .set("Authorization", `Bearer ${instructorToken}`);
      expect(deleteResponse.status).toBe(403);
    });

    it("should bypass all checks for Super Admin", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        {
          role: {
            name: "SUPER_ADMIN",
            rolePermissions: [], // System bypass resolves all system permissions
          },
        },
      ] as any);

      const response = await request(app)
        .get("/test/rbac/admin-delete")
        .set("Authorization", `Bearer ${superAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Delete access granted.");
    });
  });

  describe("Role Level Guards", () => {
    it("should allow Admin with proper DB roles membership", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        { role: { name: "ADMIN" } },
      ] as any);

      const response = await request(app)
        .get("/test/rbac/role-admin")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });

    it("should deny access if Admin role is not present in database", async () => {
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        { role: { name: "STUDENT" } },
      ] as any);

      const response = await request(app)
        .get("/test/rbac/role-admin")
        .set("Authorization", `Bearer ${studentToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("Cache Invalidation", () => {
    it("should successfully trigger permission cache del calls", async () => {
      const mockDel = vi.spyOn(redisClient, "del").mockResolvedValue(undefined as any);
      
      await permissionResolver.invalidateCache("target-user-id");

      expect(mockDel).toHaveBeenCalledWith("user:perms:target-user-id");
    });
  });
});
