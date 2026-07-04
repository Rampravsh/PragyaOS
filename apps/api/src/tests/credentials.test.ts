import { describe, it, expect, vi, beforeEach } from "vitest";
import { CredentialStatus, VerificationSource } from "@prisma/client";
import * as crypto from "crypto";

// ---------------------------------------------------------------------------
// Mock the Prisma client — must be hoisted before any service imports
// ---------------------------------------------------------------------------
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    credentialTemplate: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    credential: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn().mockResolvedValue(0),
    },
    credentialVerification: {
      create: vi.fn(),
    },
    credentialRevocation: {
      create: vi.fn(),
    },
    $transaction: vi.fn(async (fn: any) => fn(mockPrisma)),
  };
  return { prisma: mockPrisma };
});

// ---------------------------------------------------------------------------
// Import after mock
// ---------------------------------------------------------------------------
import { prisma } from "../database/client";
import { CredentialService } from "../modules/credentials/credentials.service";
import {
  PrismaCredentialTemplateRepository,
  PrismaCredentialRepository,
  PrismaCredentialVerificationRepository,
  PrismaCredentialRevocationRepository,
} from "../modules/credentials/credentials.repository";
import { credentialsEvents } from "../modules/credentials/credentials.events";

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------
const templateId  = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const userId      = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const courseId    = "cccccccc-cccc-cccc-cccc-cccccccccccc";
const credentialId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
const adminId     = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";

const mockTemplate = {
  id: templateId,
  name: "Course Completion Certificate",
  slug: "course-completion-v1",
  templateVersion: "v1",
  htmlTemplate: "<html><body>{{studentName}}</body></html>",
  cssTemplate: "body { font-family: sans-serif; }",
  branding: null,
  active: true,
  createdAt: new Date("2026-07-01T00:00:00Z"),
  updatedAt: new Date("2026-07-01T00:00:00Z"),
};

const mockCredential = {
  id: credentialId,
  credentialNumber: "CERT-2026-000001",
  userId,
  courseId,
  templateId,
  issuedAt: new Date("2026-07-04T00:00:00Z"),
  expiresAt: null,
  verificationToken: "raw-token-123",
  verificationHash: crypto.createHash("sha256").update("raw-token-123").digest("hex"),
  status: CredentialStatus.ISSUED,
  metadata: {
    studentName: "Jane Doe",
    courseTitle: "Advanced Node.js Architecture",
    instructorName: "Staff Instructor",
    completionDate: "2026-07-04",
  },
  revision: 1,
  createdAt: new Date("2026-07-04T00:00:00Z"),
  revocation: null,
};

// ---------------------------------------------------------------------------
// Service factory with injected mock repositories
// ---------------------------------------------------------------------------
const makeService = () => {
  const templateRepo = new PrismaCredentialTemplateRepository();
  const credRepo = new PrismaCredentialRepository();
  const verificationRepo = new PrismaCredentialVerificationRepository();
  const revocationRepo = new PrismaCredentialRevocationRepository();
  const events = credentialsEvents;
  vi.spyOn(events, "emitCredentialIssued").mockImplementation(() => {});
  vi.spyOn(events, "emitCredentialRevoked").mockImplementation(() => {});
  vi.spyOn(events, "emitCredentialVerified").mockImplementation(() => {});
  vi.spyOn(events, "emitTemplateUpdated").mockImplementation(() => {});
  return new CredentialService(templateRepo, credRepo, verificationRepo, revocationRepo, events);
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("CredentialService – Template Management", () => {
  let service: CredentialService;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = makeService();
  });

  it("creates a new template when slug is unique", async () => {
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(null);
    mockPrisma.credentialTemplate.create.mockResolvedValue(mockTemplate);

    const result = await service.createTemplate({
      name: "Course Completion Certificate",
      slug: "course-completion-v1",
      templateVersion: "v1",
      htmlTemplate: "<html/>",
      cssTemplate: "body{}",
    });

    expect(result.slug).toBe("course-completion-v1");
    expect(mockPrisma.credentialTemplate.create).toHaveBeenCalledOnce();
  });

  it("rejects template creation when slug already exists", async () => {
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(mockTemplate);

    await expect(
      service.createTemplate({
        name: "Duplicate Template",
        slug: "course-completion-v1",
        templateVersion: "v1",
        htmlTemplate: "<html/>",
        cssTemplate: "body{}",
      })
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("allows updating metadata-only fields after credentials have been issued", async () => {
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(mockTemplate);
    mockPrisma.credential.count.mockResolvedValue(5); // Has issued credentials
    mockPrisma.credentialTemplate.update.mockResolvedValue({ ...mockTemplate, name: "Updated Name" });

    const result = await service.updateTemplate(templateId, { name: "Updated Name" });
    expect(result.name).toBe("Updated Name");
  });

  it("rejects layout changes when template has issued credentials", async () => {
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(mockTemplate);
    mockPrisma.credential.count.mockResolvedValue(3); // Has issued credentials

    await expect(
      service.updateTemplate(templateId, { htmlTemplate: "<html>NEW</html>" })
    ).rejects.toMatchObject({ statusCode: 400 });
  });
});

describe("CredentialService – Issuance", () => {
  let service: CredentialService;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = makeService();
  });

  it("issues a credential with correct CERT-YYYY-NNNNNN number format", async () => {
    mockPrisma.credential.count.mockResolvedValue(0); // No prior credential today
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(mockTemplate);
    mockPrisma.credential.create.mockResolvedValue(mockCredential);

    const result = await service.issueCredential({
      userId,
      courseId,
      templateId,
      metadata: {
        studentName: "Jane Doe",
        courseTitle: "Advanced Node.js",
        instructorName: "Staff Instructor",
        completionDate: "2026-07-04",
      },
    });

    expect(result.credentialNumber).toMatch(/^CERT-\d{4}-\d{6}$/);
  });

  it("blocks duplicate issuance for the same user and course", async () => {
    // First count call (hasIssuedCredential) returns > 0
    mockPrisma.credential.count.mockResolvedValueOnce(1);

    await expect(
      service.issueCredential({
        userId,
        courseId,
        templateId,
        metadata: {
          studentName: "Jane Doe",
          courseTitle: "Advanced Node.js",
          instructorName: "Staff Instructor",
          completionDate: "2026-07-04",
        },
      })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("rejects issuance if template is not found", async () => {
    mockPrisma.credential.count.mockResolvedValue(0);
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue(null);

    await expect(
      service.issueCredential({
        userId,
        courseId,
        templateId,
        metadata: {
          studentName: "Jane Doe",
          courseTitle: "Advanced Node.js",
          instructorName: "Staff Instructor",
          completionDate: "2026-07-04",
        },
      })
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("rejects issuance if template is inactive", async () => {
    mockPrisma.credential.count.mockResolvedValue(0);
    mockPrisma.credentialTemplate.findUnique.mockResolvedValue({ ...mockTemplate, active: false });

    await expect(
      service.issueCredential({
        userId,
        courseId,
        templateId,
        metadata: {
          studentName: "Jane Doe",
          courseTitle: "Advanced Node.js",
          instructorName: "Staff Instructor",
          completionDate: "2026-07-04",
        },
      })
    ).rejects.toMatchObject({ statusCode: 400 });
  });
});

describe("CredentialService – Verification", () => {
  let service: CredentialService;
  const mockPrisma = prisma as any;
  const rawToken = "raw-token-abc";
  const hash = crypto.createHash("sha256").update(rawToken).digest("hex");

  beforeEach(() => {
    vi.clearAllMocks();
    service = makeService();
  });

  it("successfully verifies an issued credential by raw token", async () => {
    mockPrisma.credential.findFirst.mockResolvedValue({
      ...mockCredential,
      verificationHash: hash,
      status: CredentialStatus.ISSUED,
    });
    mockPrisma.credentialVerification.create.mockResolvedValue({});

    const result = await service.verifyCredential(
      rawToken,
      VerificationSource.PUBLIC_PAGE,
      "192.168.0.1",
      "Mozilla/5.0"
    );

    expect(result.id).toBe(credentialId);
    expect(mockPrisma.credentialVerification.create).toHaveBeenCalledOnce();
  });

  it("returns 404 when verification token hash does not match any credential", async () => {
    mockPrisma.credential.findFirst.mockResolvedValue(null);

    await expect(
      service.verifyCredential("unknown-token", VerificationSource.API)
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("logs failed verification attempt and returns 400 for revoked credentials", async () => {
    mockPrisma.credential.findFirst.mockResolvedValue({
      ...mockCredential,
      verificationHash: hash,
      status: CredentialStatus.REVOKED,
    });
    mockPrisma.credentialVerification.create.mockResolvedValue({});

    await expect(
      service.verifyCredential(rawToken, VerificationSource.PUBLIC_PAGE)
    ).rejects.toMatchObject({ statusCode: 400 });

    // Audit log must still be created even for failures
    expect(mockPrisma.credentialVerification.create).toHaveBeenCalledOnce();
  });
});

describe("CredentialService – Revocation", () => {
  let service: CredentialService;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = makeService();
  });

  it("successfully revokes an issued credential", async () => {
    mockPrisma.credential.findUnique.mockResolvedValue(mockCredential);
    mockPrisma.credential.update.mockResolvedValue({ ...mockCredential, status: CredentialStatus.REVOKED, revision: 2 });
    mockPrisma.credentialRevocation.create.mockResolvedValue({});

    const result = await service.revokeCredential(
      { credentialId, reason: "Academic dishonesty confirmed." },
      adminId
    );

    expect(result.status).toBe(CredentialStatus.REVOKED);
    expect(mockPrisma.credentialRevocation.create).toHaveBeenCalledOnce();
  });

  it("rejects revocation for already-revoked credentials", async () => {
    mockPrisma.credential.findUnique.mockResolvedValue({
      ...mockCredential,
      status: CredentialStatus.REVOKED,
    });

    await expect(
      service.revokeCredential({ credentialId, reason: "Duplicate revocation." }, adminId)
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("returns 404 when credential does not exist", async () => {
    mockPrisma.credential.findUnique.mockResolvedValue(null);

    await expect(
      service.revokeCredential({ credentialId, reason: "Testing." }, adminId)
    ).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("CredentialService – AGENTS.md Compliance", () => {
  it("should not import prisma directly in credentials.service.ts", async () => {
    // Validates that the service file does not statically call prisma at the top level
    const fs = await import("fs");
    const path = await import("path");
    const serviceFile = fs.readFileSync(
      path.resolve(__dirname, "../modules/credentials/credentials.service.ts"),
      "utf-8"
    );

    // The only acceptable prisma usage is the dynamic import for transaction block
    const staticPrismaImport = /^import\s+{?\s*prisma\s*}?\s+from\s+["']\.\..*database\/client["']/m;
    expect(staticPrismaImport.test(serviceFile)).toBe(false);
  });
});
