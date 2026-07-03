import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../database/client";
import { mediaQueue } from "../modules/media/media.queue";
import { mediaStorage } from "../modules/media/media.storage";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { MediaStatus, MediaType, MediaProvider } from "@prisma/client";

// Mock database client singleton
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    media: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    userRole: {
      findMany: vi.fn(),
    },
    course: {
      count: vi.fn().mockResolvedValue(0),
    },
    learningUnit: {
      count: vi.fn().mockResolvedValue(0),
    },
    learningResource: {
      count: vi.fn().mockResolvedValue(0),
    },
  };
  return { prisma: mockPrisma };
});

// Mock BullMQ media-queue
vi.mock("../modules/media/media.queue", () => {
  return {
    mediaQueue: {
      add: vi.fn().mockResolvedValue({ id: "mock-job-id" }),
    },
  };
});

// Mock Cloudflare R2 Storage operations
vi.mock("../modules/media/media.storage", () => {
  return {
    mediaStorage: {
      generatePresignedUploadUrl: vi.fn().mockResolvedValue("https://r2.cloudflare.mock/upload/signed-token-123"),
      generatePresignedDownloadUrl: vi.fn().mockResolvedValue("https://r2.cloudflare.mock/download/signed-token-123"),
      deleteObject: vi.fn().mockResolvedValue(undefined),
      initiateMultipartUpload: vi.fn().mockResolvedValue("mock-upload-id-999"),
      generatePresignedPartUrl: vi.fn().mockResolvedValue("https://r2.cloudflare.mock/upload/part-signed-token"),
      completeMultipartUpload: vi.fn().mockResolvedValue(undefined),
    },
  };
});

describe("Media Platform Integration Tests", () => {
  const secret = config.jwt.secret;
  const adminId = "admin-uuid-001";
  const userId = "user-uuid-002";
  const strangerId = "stranger-uuid-003";

  let adminToken = "";
  let userToken = "";
  let strangerToken = "";

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock tokens
    adminToken = jwt.sign(
      { userId: adminId, email: "admin@pragyaos.com", roles: ["ADMIN"] },
      secret,
      { expiresIn: "1h" }
    );
    userToken = jwt.sign(
      { userId: userId, email: "user@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );
    strangerToken = jwt.sign(
      { userId: strangerId, email: "stranger@pragyaos.com", roles: ["STUDENT"] },
      secret,
      { expiresIn: "1h" }
    );

    // Mock permissions resolver
    (prisma.userRole.findMany as any).mockImplementation((args: any) => {
      const uid = args.where.userId;
      if (uid === adminId) {
        return Promise.resolve([
          { role: { name: "ADMIN", rolePermissions: [{ permission: { name: "user:update" } }] } },
        ]);
      }
      return Promise.resolve([
        { role: { name: "STUDENT", rolePermissions: [] } },
      ]);
    });
  });

  describe("Single File Direct Upload Presigning", () => {
    it("should generate a presigned upload URL successfully", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        type: MediaType.IMAGE,
        provider: MediaProvider.CLOUDFLARE_R2,
        bucket: "pragyaos-media",
        key: "uploads/user-uuid-002/media-uuid-111.png",
        mimeType: "image/png",
        size: BigInt(2048),
        hash: "checksum-sha-256",
        status: MediaStatus.UPLOADING,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.create as any).mockResolvedValue(mockMedia);
      (prisma.media.findFirst as any).mockResolvedValue(null); // No duplicates

      const res = await request(app)
        .post("/api/v1/media/uploads/url")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          filename: "profile.png",
          mimeType: "image/png",
          size: 2048,
          hash: "checksum-sha-256",
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.uploadUrl).toContain("signed-token-123");
      expect(res.body.data.mediaId).toBeDefined();
      expect(prisma.media.create).toHaveBeenCalled();
    });

    it("should fail upload requests that exceed size limits", async () => {
      // Image exceeds max size (limits.maxImageSizeBytes defaults to 5MB)
      const res = await request(app)
        .post("/api/v1/media/uploads/url")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          filename: "huge-photo.jpg",
          mimeType: "image/jpeg",
          size: 10 * 1024 * 1024, // 10MB
        })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("size exceeds maximum limit");
    });

    it("should deduplicate and return download URL if file checksum already exists as READY", async () => {
      const mockExisting = {
        id: "media-uuid-existing",
        type: MediaType.IMAGE,
        provider: MediaProvider.CLOUDFLARE_R2,
        bucket: "pragyaos-media",
        key: "uploads/user-uuid-002/existing.png",
        mimeType: "image/png",
        size: BigInt(2048),
        hash: "existing-checksum",
        status: MediaStatus.READY,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findFirst as any).mockResolvedValue(mockExisting);

      const res = await request(app)
        .post("/api/v1/media/uploads/url")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          filename: "profile.png",
          mimeType: "image/png",
          size: 2048,
          hash: "existing-checksum",
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.mediaId).toBe("media-uuid-existing");
      expect(res.body.data.uploadUrl).toContain("signed-token-123"); // Reused existing link
      expect(prisma.media.create).not.toHaveBeenCalled();
    });
  });

  describe("Media Upload Confirmation & Processing", () => {
    it("should allow owner to confirm upload complete", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.UPLOADING,
        userId: userId,
        key: "uploads/user-uuid-002/media-uuid-111.png",
        size: BigInt(2048),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);
      (prisma.media.update as any).mockResolvedValue({
        ...mockMedia,
        status: MediaStatus.UPLOADED,
      });

      const res = await request(app)
        .post("/api/v1/media/media-uuid-111/confirm")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(MediaStatus.UPLOADED);
      expect(mediaQueue.add).toHaveBeenCalledWith(
        "process-media",
        { mediaId: "media-uuid-111", action: "PROCESS" },
        { jobId: "proc-media-uuid-111" }
      );
    });

    it("should prevent non-owner from confirming upload complete", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.UPLOADING,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);

      const res = await request(app)
        .post("/api/v1/media/media-uuid-111/confirm")
        .set("Authorization", `Bearer ${strangerToken}`)
        .expect(403);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("do not own or have permission");
    });
  });

  describe("Multipart Upload Flow", () => {
    it("should initiate a multipart upload and generate presigned part URLs", async () => {
      const mockMedia = {
        id: "media-uuid-multipart",
        type: MediaType.VIDEO,
        provider: MediaProvider.CLOUDFLARE_R2,
        bucket: "pragyaos-media",
        key: "uploads/user-uuid-002/multipart.mp4",
        mimeType: "video/mp4",
        size: BigInt(50 * 1024 * 1024),
        status: MediaStatus.UPLOADING,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.create as any).mockResolvedValue(mockMedia);

      // 1. Initiate Multipart
      const initRes = await request(app)
        .post("/api/v1/media/multipart/initiate")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          filename: "lecture.mp4",
          mimeType: "video/mp4",
          size: 50 * 1024 * 1024,
        })
        .expect(200);

      expect(initRes.body.success).toBe(true);
      expect(initRes.body.data.uploadId).toBe("mock-upload-id-999");
      const mediaId = initRes.body.data.mediaId;

      // 2. Presign Part Url
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);
      const partRes = await request(app)
        .post(`/api/v1/media/${mediaId}/multipart/part`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          key: "uploads/user-uuid-002/multipart.mp4",
          uploadId: "mock-upload-id-999",
          partNumber: 1,
        })
        .expect(200);

      expect(partRes.body.success).toBe(true);
      expect(partRes.body.data.partNumber).toBe(1);
      expect(partRes.body.data.uploadUrl).toContain("part-signed-token");

      // 3. Complete Multipart
      (prisma.media.update as any).mockResolvedValue({
        ...mockMedia,
        status: MediaStatus.UPLOADED,
      });

      const completeRes = await request(app)
        .post(`/api/v1/media/${mediaId}/multipart/complete`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          key: "uploads/user-uuid-002/multipart.mp4",
          uploadId: "mock-upload-id-999",
          parts: [{ PartNumber: 1, ETag: "etag-part-1" }],
        })
        .expect(200);

      expect(completeRes.body.success).toBe(true);
      expect(completeRes.body.data.status).toBe(MediaStatus.UPLOADED);
      expect(mediaQueue.add).toHaveBeenCalled();
    });
  });

  describe("Download & Deletion Operations", () => {
    it("should allow owners to get a presigned download URL", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.READY,
        userId: userId,
        key: "uploads/user-uuid-002/media-uuid-111.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);

      const res = await request(app)
        .get("/api/v1/media/media-uuid-111/download")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.downloadUrl).toContain("signed-token-123");
    });

    it("should allow privileged roles (Admin) to download other files", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.READY,
        userId: userId,
        key: "uploads/user-uuid-002/media-uuid-111.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);

      const res = await request(app)
        .get("/api/v1/media/media-uuid-111/download")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.downloadUrl).toBeDefined();
    });

    it("should prevent stranger from downloading private files", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.READY,
        userId: userId,
        key: "uploads/user-uuid-002/media-uuid-111.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);

      const res = await request(app)
        .get("/api/v1/media/media-uuid-111/download")
        .set("Authorization", `Bearer ${strangerToken}`)
        .expect(403);

      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("permission to access this media");
    });

    it("should allow owner to delete a media file", async () => {
      const mockMedia = {
        id: "media-uuid-111",
        status: MediaStatus.READY,
        userId: userId,
        key: "uploads/user-uuid-002/media-uuid-111.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.media.findUnique as any).mockResolvedValue(mockMedia);
      (prisma.media.update as any).mockResolvedValue({
        ...mockMedia,
        status: MediaStatus.DELETED,
      });

      const res = await request(app)
        .delete("/api/v1/media/media-uuid-111")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(mediaStorage.deleteObject).toHaveBeenCalledWith(mockMedia.key);
    });
  });
});
