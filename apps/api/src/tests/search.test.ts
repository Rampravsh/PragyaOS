import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchSyncStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Mock Prisma client
// ---------------------------------------------------------------------------
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    searchSyncLog: {
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
    category: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    tag: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    $transaction: vi.fn(async (fn: any) => fn(mockPrisma)),
  };
  return { prisma: mockPrisma };
});

// Mock BullMQ Queue
vi.mock("../modules/search/search.queue", () => ({
  searchIndexerQueue: {
    add: vi.fn().mockResolvedValue({ id: "test-job-id" }),
    getActiveCount: vi.fn().mockResolvedValue(0),
    getWaitingCount: vi.fn().mockResolvedValue(0),
    getFailedCount: vi.fn().mockResolvedValue(0),
  },
}));

// ---------------------------------------------------------------------------
// Imports after mocks
// ---------------------------------------------------------------------------
import { prisma } from "../database/client";
import { SearchMapper } from "../modules/search/search.mapper";
import { SearchService } from "../modules/search/search.service";
import { SearchIndexer } from "../modules/search/search.indexer";
import { SearchIndexWorker } from "../modules/search/search.worker";
import { SearchEventConsumer } from "../modules/search/search.consumer";
import { searchIndexerQueue } from "../modules/search/search.queue";
import { SearchProvider, SearchDocument, SearchResult } from "../modules/search/search.types";
import { courseEvents } from "../modules/courses/course.events";

// ---------------------------------------------------------------------------
// Mock SearchProvider
// ---------------------------------------------------------------------------
const mockSearchProvider: SearchProvider = {
  createIndex: vi.fn().mockResolvedValue(undefined),
  deleteIndex: vi.fn().mockResolvedValue(undefined),
  getDocument: vi.fn().mockResolvedValue(null),
  addDocuments: vi.fn().mockResolvedValue(undefined),
  updateDocuments: vi.fn().mockResolvedValue(undefined),
  deleteDocuments: vi.fn().mockResolvedValue(undefined),
  search: vi.fn().mockResolvedValue({
    hits: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    processingTimeMs: 1,
  }),
  autocomplete: vi.fn().mockResolvedValue([]),
  health: vi.fn().mockResolvedValue({ status: "available" }),
};

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const courseId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const categoryId = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const instructorId = "cccccccc-cccc-cccc-cccc-cccccccccccc";
const logId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
const tagId = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";

const mockCourse = {
  id: courseId,
  title: "Docker Mastery",
  subtitle: "Containers from scratch",
  description: "Learn Docker, Kubernetes, and compose.",
  slug: "docker-mastery",
  difficulty: "BEGINNER",
  language: "en",
  status: "PUBLISHED",
  createdAt: new Date("2026-07-01T00:00:00Z"),
  updatedAt: new Date("2026-07-02T00:00:00Z"),
  category: { id: categoryId, name: "DevOps", slug: "devops" },
  instructors: [{ user: { id: instructorId, name: "John Doe" } }],
  tags: [{ tag: { id: tagId, name: "docker", slug: "docker" } }],
};

const mockCategory = {
  id: categoryId,
  name: "DevOps",
  slug: "devops",
  description: "Infrastructure tools",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockInstructor = {
  id: instructorId,
  name: "John Doe",
  bio: "Lead Cloud Architect",
  roles: ["INSTRUCTOR"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTag = {
  id: tagId,
  name: "docker",
  slug: "docker",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSyncLog = {
  id: logId,
  entityType: "courses",
  entityId: courseId,
  operation: "CREATE",
  status: SearchSyncStatus.PENDING,
  attempts: 0,
  lastError: null,
  correlationId: "cor-123",
  processedAt: null,
  createdAt: new Date(),
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("SearchMapper", () => {
  it("correctly maps a populated Course to SearchDocument", () => {
    const doc = SearchMapper.courseToDocument(mockCourse);
    expect(doc.id).toBe(courseId);
    expect(doc.title).toBe("Docker Mastery");
    expect(doc.category.name).toBe("DevOps");
    expect(doc.instructors).toHaveLength(1);
    expect(doc.instructors[0].name).toBe("John Doe");
    expect(doc.tags[0].name).toBe("docker");
    expect(doc.version).toBe(new Date("2026-07-02T00:00:00Z").getTime());
  });

  it("correctly maps Category to SearchDocument", () => {
    const doc = SearchMapper.categoryToDocument(mockCategory);
    expect(doc.id).toBe(categoryId);
    expect(doc.name).toBe("DevOps");
    expect(doc.slug).toBe("devops");
  });
});

describe("SearchService", () => {
  let service: SearchService;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new SearchService(mockSearchProvider);
  });

  it("triggers full text search query with proper filter string", async () => {
    await service.search({
      q: "Docker",
      page: 1,
      limit: 20,
      category: "devops",
      difficulty: "BEGINNER",
      sort: "newest",
    });

    expect(mockSearchProvider.search).toHaveBeenCalledWith(
      expect.any(String),
      "Docker",
      expect.objectContaining({
        filters: 'category.slug = "devops" AND difficulty = "BEGINNER" AND status = "PUBLISHED"',
        sort: ["createdAt:desc"],
      })
    );
  });

  it("correctly triggers reindexAll and enqueues jobs", async () => {
    mockPrisma.course.findMany.mockResolvedValue([mockCourse]);
    mockPrisma.course.count.mockResolvedValue(1);
    mockPrisma.category.findMany.mockResolvedValue([mockCategory]);
    mockPrisma.user.findMany.mockResolvedValue([mockInstructor]);
    mockPrisma.tag.findMany.mockResolvedValue([mockTag]);
    mockPrisma.searchSyncLog.create.mockResolvedValue(mockSyncLog);

    const res = await service.reindexAll();
    expect(res.enqueued).toBe(4); // 1 course + 1 category + 1 instructor + 1 tag
    expect(searchIndexerQueue.add).toHaveBeenCalledTimes(4);
  });
});

describe("SearchIndexWorker & Version Checks", () => {
  let worker: SearchIndexWorker;
  const mockPrisma = prisma as any;
  const indexer = new SearchIndexer(mockSearchProvider);
  const mockLogRepo = {
    createLog: vi.fn(),
    updateStatus: vi.fn(),
    findPending: vi.fn(),
    findByEntity: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    worker = new SearchIndexWorker(mockLogRepo as any, indexer, mockSearchProvider);
  });

  it("indexes document if version is newer than existing", async () => {
    mockPrisma.course.findUnique.mockResolvedValue(mockCourse);
    mockLogRepo.updateStatus.mockResolvedValue(mockSyncLog);

    // Mock search provider to return an older version
    const olderVersion = new Date("2026-07-01T00:00:00Z").getTime();
    vi.spyOn(mockSearchProvider, "getDocument").mockResolvedValueOnce({
      id: courseId,
      entityType: "courses",
      version: olderVersion,
      updatedAt: new Date("2026-07-01T00:00:00Z").toISOString(),
    });

    const mockJob = {
      data: {
        logId,
        entityType: "courses",
        entityId: courseId,
        operation: "UPDATE",
      },
      attemptsMade: 1,
    };

    await (worker as any).worker.processFn(mockJob);

    expect(mockSearchProvider.addDocuments).toHaveBeenCalledOnce();
    expect(mockLogRepo.updateStatus).toHaveBeenLastCalledWith(
      logId,
      "INDEXED",
      1
    );
  });

  it("skips indexing if version is stale/older than existing", async () => {
    mockPrisma.course.findUnique.mockResolvedValue(mockCourse);
    mockLogRepo.updateStatus.mockResolvedValue(mockSyncLog);

    // Mock search provider to return a newer version
    const newerVersion = new Date("2026-07-03T00:00:00Z").getTime();
    vi.spyOn(mockSearchProvider, "getDocument").mockResolvedValueOnce({
      id: courseId,
      entityType: "courses",
      version: newerVersion,
      updatedAt: new Date("2026-07-03T00:00:00Z").toISOString(),
    });

    const mockJob = {
      data: {
        logId,
        entityType: "courses",
        entityId: courseId,
        operation: "UPDATE",
      },
      attemptsMade: 1,
    };

    await (worker as any).worker.processFn(mockJob);

    // Should skip call to addDocuments
    expect(mockSearchProvider.addDocuments).not.toHaveBeenCalled();
    // Still sets status to INDEXED since skip is a valid success state
    expect(mockLogRepo.updateStatus).toHaveBeenLastCalledWith(
      logId,
      "INDEXED",
      1
    );
  });

  it("deletes document from search provider on DELETE operation", async () => {
    mockLogRepo.updateStatus.mockResolvedValue(mockSyncLog);

    const mockJob = {
      data: {
        logId,
        entityType: "courses",
        entityId: courseId,
        operation: "DELETE",
      },
      attemptsMade: 1,
    };

    await (worker as any).worker.processFn(mockJob);

    expect(mockSearchProvider.deleteDocuments).toHaveBeenCalledWith(expect.any(String), [courseId]);
  });
});

describe("SearchEventConsumer", () => {
  const mockLogRepo = {
    createLog: vi.fn(),
    updateStatus: vi.fn(),
    findPending: vi.fn(),
    findByEntity: vi.fn(),
  };

  beforeEach(() => {
    courseEvents.removeAllListeners();
    vi.clearAllMocks();
  });

  it("triggers indexing job when course.published is emitted", async () => {
    mockLogRepo.createLog.mockResolvedValue(mockSyncLog);
    const consumer = new SearchEventConsumer(mockLogRepo as any, searchIndexerQueue as any);

    courseEvents.emit("course.published", {
      courseId,
      title: "Docker Mastery",
      slug: "docker-mastery",
      publishedBy: "user-123",
      eventId: "evt-123",
    });

    // Small delay to let event loop tick
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(mockLogRepo.createLog).toHaveBeenCalledOnce();
    expect(searchIndexerQueue.add).toHaveBeenCalledOnce();
  });
});

describe("AGENTS.md Compliance", () => {
  it("search.service.ts does not statically import prisma", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../modules/search/search.service.ts"),
      "utf-8"
    );
    const staticImport = /^import\s+{?\s*prisma\s*}?\s+from\s+["'].*database\/client["']/m;
    expect(staticImport.test(content)).toBe(false);
  });

  it("search.worker.ts does not statically import prisma", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../modules/search/search.worker.ts"),
      "utf-8"
    );
    const staticImport = /^import\s+{?\s*prisma\s*}?\s+from\s+["'].*database\/client["']/m;
    expect(staticImport.test(content)).toBe(false);
  });
});
