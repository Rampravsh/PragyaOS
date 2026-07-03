import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import { hashPassword, hashToken } from "../modules/auth/auth.utils";
import jwt from "jsonwebtoken";

// Mock the Prisma Client singleton
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    role: {
      findUnique: vi.fn(),
    },
    userRole: {
      create: vi.fn(),
    },
    refreshToken: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    passwordResetToken: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    emailVerificationToken: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    $transaction: vi.fn((cb: any) => cb(mockPrisma)),
  };
  return { prisma: mockPrisma };
});

describe("Authentication Integration Tests", () => {
  const testEmail = "testuser@pragyaos.com";
  const testPassword = "Password@123";
  let hashedPassword = "";

  beforeEach(async () => {
    vi.clearAllMocks();
    hashedPassword = await hashPassword(testPassword);
  });

  describe("POST /api/v1/auth/register", () => {
    it("should successfully register a new user", async () => {
      // Setup mock returns
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.role.findUnique).mockResolvedValue({ id: "student-role-uuid", name: "STUDENT" } as any);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-uuid",
        email: testEmail,
        firstName: "Test",
        lastName: "User",
      } as any);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: testEmail,
          password: testPassword,
          firstName: "Test",
          lastName: "User",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(testEmail);
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it("should fail if email is already registered", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: "existing-uuid" } as any);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: testEmail,
          password: testPassword,
          firstName: "Test",
          lastName: "User",
        });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe("CONFLICT");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: "user-uuid",
        email: testEmail,
        passwordHash: hashedPassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
        organizationId: null,
        userRoles: [
          {
            role: {
              name: "STUDENT",
              rolePermissions: [{ permission: { name: "courses:read" } }],
            },
          },
        ],
      } as any);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testEmail,
          password: testPassword,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.tokens).toHaveProperty("accessToken");
      expect(response.body.data.tokens).toHaveProperty("refreshToken");
    });

    it("should fail login with incorrect password", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: "user-uuid",
        email: testEmail,
        passwordHash: hashedPassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
      } as any);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testEmail,
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Invalid email or password.");
    });
  });

  describe("POST /api/v1/auth/refresh", () => {
    it("should rotate token pairs successfully", async () => {
      const mockPayload = { userId: "user-uuid", email: testEmail, roles: ["STUDENT"], permissions: [] };
      const testRefreshToken = jwt.sign(mockPayload, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret", {
        expiresIn: "7d",
      });
      const hashed = hashToken(testRefreshToken);

      vi.mocked(prisma.refreshToken.findUnique).mockResolvedValue({
        id: "token-id",
        userId: "user-uuid",
        tokenHash: hashed,
        revoked: false,
        expiresAt: new Date(Date.now() + 100000),
      } as any);

      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: "user-uuid",
        email: testEmail,
        userRoles: [{ role: { name: "STUDENT", rolePermissions: [] } }],
      } as any);

      const response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refreshToken: testRefreshToken });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });
  });

  describe("POST /api/v1/auth/forgot-password", () => {
    it("should respond with 200 regardless of email existence (enumeration prevention)", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      const response = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: "nonexistent@pragyaos.com" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain("password reset link has been sent");
    });
  });

  describe("POST /api/v1/auth/reset-password", () => {
    it("should successfully reset password with valid token", async () => {
      const rawToken = "validresettoken123";
      const hashed = hashToken(rawToken);

      vi.mocked(prisma.passwordResetToken.findUnique).mockResolvedValue({
        id: "reset-id",
        userId: "user-uuid",
        tokenHash: hashed,
        used: false,
        revoked: false,
        expiresAt: new Date(Date.now() + 100000),
      } as any);

      const response = await request(app)
        .post("/api/v1/auth/reset-password")
        .send({
          token: rawToken,
          password: "NewSecurePassword@123",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(prisma.user.update).toHaveBeenCalled();
    });
  });
});
