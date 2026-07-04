import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationStatus, NotificationChannel, NotificationCategory, NotificationPriority } from "@prisma/client";

// ---------------------------------------------------------------------------
// Mock the Prisma client
// ---------------------------------------------------------------------------
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    notificationTemplate: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    notification: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      count: vi.fn().mockResolvedValue(0),
    },
    notificationPreference: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    notificationDelivery: {
      create: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(async (fn: any) => fn(mockPrisma)),
  };
  return { prisma: mockPrisma };
});

// Mock BullMQ queue — prevent real Redis connections in tests
vi.mock("../modules/notifications/notification-inapp.queue", () => ({
  notificationInAppQueue: {
    add: vi.fn().mockResolvedValue({ id: "test-job-id" }),
  },
}));

// ---------------------------------------------------------------------------
// Import after mocks
// ---------------------------------------------------------------------------
import { prisma } from "../database/client";
import { NotificationRenderer } from "../modules/notifications/notification-renderer";
import { NotificationService } from "../modules/notifications/notifications.service";
import { NotificationDispatcher, templateCache } from "../modules/notifications/notification-dispatcher";
import {
  PrismaNotificationTemplateRepository,
  PrismaNotificationRepository,
  PrismaNotificationPreferenceRepository,
  PrismaNotificationDeliveryRepository,
} from "../modules/notifications/notifications.repository";
import { notificationInAppQueue } from "../modules/notifications/notification-inapp.queue";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const userId   = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const notifId  = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const templateId = "cccccccc-cccc-cccc-cccc-cccccccccccc";
const deliveryId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
const eventId  = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";

const mockTemplate: any = {
  id: templateId,
  name: "Credential Issued",
  slug: "credential-issued",
  version: 1,
  channel: NotificationChannel.IN_APP,
  locale: "en",
  titleTemplate: "Your certificate is ready, {{firstName}}!",
  bodyTemplate: "Congratulations! You completed {{courseName}}.",
  variables: ["firstName", "courseName"],
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockNotification: any = {
  id: notifId,
  userId,
  templateId,
  dedupeKey: "some-hash",
  title: "Your certificate is ready, Jane!",
  body: "Congratulations! You completed Advanced Node.js.",
  category: NotificationCategory.CREDENTIAL,
  priority: NotificationPriority.NORMAL,
  channel: NotificationChannel.IN_APP,
  status: NotificationStatus.DELIVERED,
  payload: {},
  correlationId: null,
  scheduledAt: null,
  deliveredAt: new Date(),
  readAt: null,
  expiresAt: null,
  revision: 1,
  createdAt: new Date(),
};

const makeDispatcher = () => {
  templateCache.clear();
  const templates = new PrismaNotificationTemplateRepository();
  const notifications = new PrismaNotificationRepository();
  const preferences = new PrismaNotificationPreferenceRepository();
  const deliveries = new PrismaNotificationDeliveryRepository();
  return new NotificationDispatcher(templates, notifications, preferences, deliveries);
};

const makeService = () => {
  const notifications = new PrismaNotificationRepository();
  const preferences = new PrismaNotificationPreferenceRepository();
  return new NotificationService(notifications, preferences);
};

// ---------------------------------------------------------------------------
// Tests: NotificationRenderer
// ---------------------------------------------------------------------------
describe("NotificationRenderer", () => {
  const renderer = new NotificationRenderer();

  it("replaces {{variable}} placeholders correctly", () => {
    const template = { ...mockTemplate };
    const result = renderer.render(template, { firstName: "Jane", courseName: "Advanced Node.js" });
    expect(result.title).toBe("Your certificate is ready, Jane!");
    expect(result.body).toBe("Congratulations! You completed Advanced Node.js.");
  });

  it("leaves unresolved placeholders when variable is missing", () => {
    const template = { ...mockTemplate };
    const result = renderer.render(template, { firstName: "Jane" }); // missing courseName
    expect(result.body).toContain("{{courseName}}");
  });

  it("handles templates with no declared variables cleanly", () => {
    const template = { ...mockTemplate, variables: [], titleTemplate: "Hello World", bodyTemplate: "Static body." };
    const result = renderer.render(template, {});
    expect(result.title).toBe("Hello World");
    expect(result.body).toBe("Static body.");
  });

  it("replaces multiple occurrences of the same variable", () => {
    const template = { ...mockTemplate, bodyTemplate: "{{name}} enrolled. Welcome {{name}}!" };
    const result = renderer.render(template, { name: "Jane" });
    expect(result.body).toBe("Jane enrolled. Welcome Jane!");
  });
});

// ---------------------------------------------------------------------------
// Tests: NotificationService
// ---------------------------------------------------------------------------
describe("NotificationService – Query Operations", () => {
  let service: NotificationService;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = makeService();
  });

  it("returns paginated notification list", async () => {
    mockPrisma.notification.findMany.mockResolvedValue([mockNotification]);
    mockPrisma.notification.count.mockResolvedValue(1);

    const result = await service.getUserNotifications(userId, { page: 1, limit: 20 });
    expect(result.items).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it("returns unread count correctly", async () => {
    mockPrisma.notification.count.mockResolvedValue(5);
    const count = await service.getUnreadCount(userId);
    expect(count).toBe(5);
  });

  it("marks a single notification as read", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(mockNotification);
    mockPrisma.notification.update.mockResolvedValue({ ...mockNotification, status: "READ", readAt: new Date() });

    const result = await service.markAsRead(notifId, userId);
    expect(result.status).toBe("READ");
  });

  it("returns the notification unchanged if already read (idempotent)", async () => {
    const readNotification = { ...mockNotification, status: "READ" };
    mockPrisma.notification.findUnique.mockResolvedValue(readNotification);

    const result = await service.markAsRead(notifId, userId);
    expect(result.status).toBe("READ");
    expect(mockPrisma.notification.update).not.toHaveBeenCalled();
  });

  it("throws 403 if notification belongs to a different user", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue({ ...mockNotification, userId: "other-user" });

    await expect(service.markAsRead(notifId, userId)).rejects.toMatchObject({ statusCode: 403 });
  });

  it("throws 404 if notification not found", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);
    await expect(service.markAsRead(notifId, userId)).rejects.toMatchObject({ statusCode: 404 });
  });

  it("marks all notifications as read and returns count", async () => {
    mockPrisma.notification.updateMany.mockResolvedValue({ count: 7 });
    const result = await service.markAllAsRead(userId);
    expect(result.count).toBe(7);
  });

  it("returns default preferences when no record exists", async () => {
    mockPrisma.notificationPreference.findUnique.mockResolvedValue(null);
    const prefs = await service.getPreferences(userId);
    expect(prefs.marketingOptIn).toBe(true);
    expect(prefs.digestEnabled).toBe(false);
  });

  it("updates user preferences via upsert", async () => {
    const updatedPrefs = {
      userId, channelPreferences: { EMAIL: false }, categoryPreferences: {},
      marketingOptIn: false, digestEnabled: false, createdAt: new Date(), updatedAt: new Date(),
    };
    mockPrisma.notificationPreference.upsert.mockResolvedValue(updatedPrefs);

    const result = await service.updatePreferences(userId, { marketingOptIn: false });
    expect(result.marketingOptIn).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Tests: NotificationDispatcher
// ---------------------------------------------------------------------------
describe("NotificationDispatcher", () => {
  let dispatcher: NotificationDispatcher;
  const mockPrisma = prisma as any;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatcher = makeDispatcher();
  });

  const baseCtx = {
    userId,
    eventId,
    templateSlug: "credential-issued",
    channel: NotificationChannel.IN_APP,
    category: NotificationCategory.CREDENTIAL,
    priority: NotificationPriority.NORMAL,
    variables: { firstName: "Jane", courseName: "Advanced Node.js" },
    correlationId: notifId,
  };

  it("creates notification and enqueues job for new event", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null); // no dedupe hit
    mockPrisma.notificationPreference.findUnique.mockResolvedValue(null); // default prefs
    mockPrisma.notificationTemplate.findFirst.mockResolvedValue(mockTemplate);
    mockPrisma.notification.create.mockResolvedValue(mockNotification);
    mockPrisma.notificationDelivery.create.mockResolvedValue({ id: deliveryId });

    await dispatcher.dispatch(baseCtx);

    expect(mockPrisma.notification.create).toHaveBeenCalledOnce();
    expect(notificationInAppQueue.add).toHaveBeenCalledOnce();
  });

  it("skips duplicate notification via dedupeKey", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(mockNotification); // dedupe hit

    await dispatcher.dispatch(baseCtx);

    expect(mockPrisma.notification.create).not.toHaveBeenCalled();
    expect(notificationInAppQueue.add).not.toHaveBeenCalled();
  });

  it("skips when user has disabled the category", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);
    mockPrisma.notificationPreference.findUnique.mockResolvedValue({
      channelPreferences: {},
      categoryPreferences: { CREDENTIAL: false },
    });

    await dispatcher.dispatch(baseCtx);

    expect(mockPrisma.notification.create).not.toHaveBeenCalled();
  });

  it("bypasses preferences for SECURITY category (uncancellable)", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);
    mockPrisma.notificationTemplate.findFirst.mockResolvedValue({
      ...mockTemplate,
      slug: "account-locked",
    });
    mockPrisma.notification.create.mockResolvedValue(mockNotification);
    mockPrisma.notificationDelivery.create.mockResolvedValue({ id: deliveryId });

    await dispatcher.dispatch({
      ...baseCtx,
      templateSlug: "account-locked",
      category: NotificationCategory.SECURITY,
      priority: NotificationPriority.CRITICAL,
    });

    // Should dispatch even though categoryPreferences might block it
    expect(mockPrisma.notification.create).toHaveBeenCalledOnce();
  });

  it("skips gracefully when template slug is not found", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);
    mockPrisma.notificationPreference.findUnique.mockResolvedValue(null);
    mockPrisma.notificationTemplate.findFirst.mockResolvedValue(null); // template missing

    await expect(dispatcher.dispatch(baseCtx)).resolves.not.toThrow();
    expect(mockPrisma.notification.create).not.toHaveBeenCalled();
  });

  it("uses template cache on second dispatch with same slug", async () => {
    mockPrisma.notification.findUnique.mockResolvedValue(null);
    mockPrisma.notificationPreference.findUnique.mockResolvedValue(null);
    mockPrisma.notificationTemplate.findFirst.mockResolvedValue(mockTemplate);
    mockPrisma.notification.create.mockResolvedValue(mockNotification);
    mockPrisma.notificationDelivery.create.mockResolvedValue({ id: deliveryId });

    // First dispatch — hits DB
    await dispatcher.dispatch({ ...baseCtx, eventId: "event-1" });
    // Second dispatch — should use cache, not hit DB again
    await dispatcher.dispatch({ ...baseCtx, eventId: "event-2" });

    // Template DB was only fetched once due to caching
    expect(mockPrisma.notificationTemplate.findFirst).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Tests: AGENTS.md Compliance
// ---------------------------------------------------------------------------
describe("AGENTS.md Compliance", () => {
  it("notifications.service.ts does not statically import prisma", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../modules/notifications/notifications.service.ts"),
      "utf-8"
    );
    const staticImport = /^import\s+{?\s*prisma\s*}?\s+from\s+["'].*database\/client["']/m;
    expect(staticImport.test(content)).toBe(false);
  });

  it("notification-dispatcher.ts does not statically import prisma", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../modules/notifications/notification-dispatcher.ts"),
      "utf-8"
    );
    const staticImport = /^import\s+{?\s*prisma\s*}?\s+from\s+["'].*database\/client["']/m;
    expect(staticImport.test(content)).toBe(false);
  });
});
