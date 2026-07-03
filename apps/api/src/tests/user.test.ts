import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import { hashPassword, hashToken } from "../modules/auth/auth.utils";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { redisClient } from "../lib/redis";

// Mock the Prisma Client singleton
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    userRole: {
      findMany: vi.fn(),
    },
    refreshToken: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    auditLog: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    $transaction: vi.fn((cb) => cb(mockPrisma)),
  };
  return { prisma: mockPrisma };
});

describe("User Domain Integration Tests", () => {
  const secret = config.jwt.secret;
  const testUserId = "user-uuid-123";
  const testEmail = "testuser@pragyaos.com";
  let userToken = "";
  let adminToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    userToken = jwt.sign(
      { userId: testUserId, email: testEmail, roles: ["STUDENT"], permissions: [] },
      secret
    );

    adminToken = jwt.sign(
      { userId: "admin-uuid", email: "admin@pragya.com", roles: ["ADMIN"], permissions: ["user:read", "user:update", "user:delete"] },
      secret
    );

    // Bypass Redis
    vi.spyOn(redisClient, "get").mockResolvedValue(null);
    vi.spyOn(redisClient, "set").mockResolvedValue(undefined as any);
  });

  describe("GET /api/v1/users/me", () => {
    it("should successfully retrieve own user profile", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: testUserId,
        email: testEmail,
        firstName: "Jane",
        lastName: "Doe",
        displayName: "JaneD",
        bio: "Learning developer",
        avatarUrl: "https://avatar.com/jane",
        timezone: "EST",
        language: "en",
        status: "ACTIVE",
        preferences: { theme: "DARK", emailPreference: true },
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any);

      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(testEmail);
      expect(response.body.data.preferences.theme).toBe("DARK");
    });
  });

  describe("PATCH /api/v1/users/me", () => {
    it("should update profile details and write audit log", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);
      vi.mocked(prisma.user.update).mockResolvedValue({
        id: testUserId,
        firstName: "JaneUpdated",
        lastName: "Doe",
      } as any);

      const response = await request(app)
        .patch("/api/v1/users/me")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ firstName: "JaneUpdated" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe("JaneUpdated");
      expect(prisma.auditLog.create).toHaveBeenCalled();
    });

    it("should reject invalid language payload", async () => {
      const response = await request(app)
        .patch("/api/v1/users/me")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ language: "invalid-lang" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PATCH /api/v1/users/me/avatar", () => {
    it("should update avatar url link", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);
      vi.mocked(prisma.user.update).mockResolvedValue({ id: testUserId, avatarUrl: "https://foo.com/bar.png" } as any);

      const response = await request(app)
        .patch("/api/v1/users/me/avatar")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ avatarUrl: "https://foo.com/bar.png" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.avatarUrl).toBe("https://foo.com/bar.png");
    });
  });

  describe("POST /api/v1/users/me/password", () => {
    it("should change password when current password matches", async () => {
      const currentHashed = await hashPassword("OldPassword@123");
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: testUserId,
        passwordHash: currentHashed,
      } as any);

      const response = await request(app)
        .post("/api/v1/users/me/password")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          currentPassword: "OldPassword@123",
          newPassword: "NewPassword@123",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(prisma.refreshToken.updateMany).toHaveBeenCalled();
    });

    it("should reject password change when current password is wrong", async () => {
      const currentHashed = await hashPassword("OldPassword@123");
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: testUserId,
        passwordHash: currentHashed,
      } as any);

      const response = await request(app)
        .post("/api/v1/users/me/password")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          currentPassword: "WrongPassword@123",
          newPassword: "NewPassword@123",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/users/me/sessions", () => {
    it("should list active sessions", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);
      vi.mocked(prisma.refreshToken.findMany).mockResolvedValue([
        {
          id: "session-1",
          tokenHash: "hash-1",
          ipAddress: "127.0.0.1",
          userAgent: "Mozilla",
          deviceInfo: "Windows PC",
          lastUsedAt: new Date(),
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 10000),
        },
      ] as any);

      const response = await request(app)
        .get("/api/v1/users/me/sessions")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });

  describe("DELETE /api/v1/users/me/sessions/:sessionId", () => {
    it("should revoke a session", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);
      vi.mocked(prisma.refreshToken.findUnique).mockResolvedValue({
        id: "session-1",
        userId: testUserId,
      } as any);

      const response = await request(app)
        .delete("/api/v1/users/me/sessions/session-1")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(prisma.refreshToken.update).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/users/me/sessions", () => {
    it("should revoke all other sessions", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);

      const response = await request(app)
        .delete("/api/v1/users/me/sessions")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(prisma.refreshToken.updateMany).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/users/me/deactivate", () => {
    it("should deactivate own account and revoke sessions", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: testUserId } as any);
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([]); // not superadmin

      const response = await request(app)
        .post("/api/v1/users/me/deactivate")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(prisma.user.update).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/users/:id", () => {
    it("should allow Admin to soft delete Student account", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: "target-student-id" } as any);
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([]); // target not super admin

      // Mock user roles checks in resolver for middleware
      vi.mocked(prisma.userRole.findMany).mockResolvedValueOnce([
        { role: { name: "STUDENT" } }, // Target role check
      ] as any);

      const response = await request(app)
        .delete("/api/v1/users/target-student-id")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(prisma.user.update).toHaveBeenCalled();
    });

    it("should deny Student from deleting another Student profile", async () => {
      const response = await request(app)
        .delete("/api/v1/users/another-student-id")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    it("should deny soft deleting Super Admin", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: "super-id" } as any);
      vi.mocked(prisma.userRole.findMany).mockResolvedValue([
        { role: { name: "SUPER_ADMIN" } },
      ] as any);

      const response = await request(app)
        .delete("/api/v1/users/super-id")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error.message).toContain("strictly prohibited");
    });
  });
});
