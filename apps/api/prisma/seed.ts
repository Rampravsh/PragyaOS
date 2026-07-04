import {
  UserStatus,
  CourseStatus,
  CourseVisibility,
  DifficultyLevel,
  LearningUnitType,
  ProgressStatus,
  SessionStatus,
  TimelineEventType,
  CourseCompletionReason,
  ProductType,
  ProductStatus,
  PriceType,
  OrderStatus,
  PaymentGateway,
  PaymentStatus,
  CouponType,
  CouponStatus,
  CredentialStatus,
  NotificationChannel,
  NotificationPriority,
  NotificationCategory,
  NotificationStatus,
  MediaProvider,
  MediaStatus,
  MediaType,
  EnrollmentStatus,
} from "@prisma/client";
import dns from "dns";
dns.setServers(["8.8.8.8"]);

import { prisma } from "../src/database/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

async function main() {
  console.log("🌱 Starting expanded PragyaOS database seeding...");

  // ──────────────────────────────────────────────────────────────────
  // 1. Truncate / Delete Dynamic Tables in dependency order
  // ──────────────────────────────────────────────────────────────────
  console.log("🧹 Cleaning existing database tables...");
  const deleteOrder = [
    "credentialVerification",
    "credentialRevocation",
    "credential",
    "credentialTemplate",
    "notificationDelivery",
    "notification",
    "notificationPreference",
    "notificationTemplate",
    "searchSyncLog",
    "learningSession",
    "learningTimeline",
    "courseCompletion",
    "learningProgress",
    "enrollment",
    "paymentAttempt",
    "orderItem",
    "fulfillmentExecution",
    "refund",
    "invoice",
    "order",
    "couponRedemption",
    "coupon",
    "productPrice",
    "product",
    "learningResource",
    "learningUnit",
    "courseModule",
    "courseInstructor",
    "courseTag",
    "tag",
    "course",
    "category",
    "refreshToken",
    "passwordResetToken",
    "emailVerificationToken",
    "auditLog",
    "userRole",
    "media",
    "user",
    "systemSetting",
    "rolePermission",
    "role",
    "permission",
    "organization",
  ];

  for (const table of deleteOrder) {
    if ((prisma as any)[table]) {
      await (prisma as any)[table].deleteMany({});
    }
  }
  console.log("🧹 Database cleanup finished successfully.");

  // ──────────────────────────────────────────────────────────────────
  // 2. Organization
  // ──────────────────────────────────────────────────────────────────
  const org = await prisma.organization.create({
    data: {
      name: "Pragya Core LXP",
      slug: "pragya-core",
    },
  });
  console.log(`🏢 Seeded default organization: ${org.name}`);

  // ──────────────────────────────────────────────────────────────────
  // 3. Roles
  // ──────────────────────────────────────────────────────────────────
  const roles = [
    { name: "SUPER_ADMIN", description: "Root platform owner with absolute system access." },
    { name: "ADMIN", description: "Organization operator managing courses, users, and billing." },
    { name: "INSTRUCTOR", description: "Content creator designing curriculums and grading assignments." },
    { name: "STUDENT", description: "Active learner enrolling in courses and submitting assessments." },
  ];

  const seededRoles: Record<string, any> = {};
  for (const role of roles) {
    const dbRole = await prisma.role.create({
      data: { name: role.name, description: role.description },
    });
    seededRoles[role.name] = dbRole;
  }
  console.log("🔑 Seeded security roles.");

  // ──────────────────────────────────────────────────────────────────
  // 4. Permissions
  // ──────────────────────────────────────────────────────────────────
  const permissions = [
    // Auth permissions
    { name: "auth:login", description: "Permit credential authentication login." },
    { name: "auth:register", description: "Permit visitor registration." },
    // Users permissions
    { name: "user:create", description: "Add new user accounts." },
    { name: "user:read", description: "View user profiles and listings." },
    { name: "user:update", description: "Edit user profile attributes." },
    { name: "user:delete", description: "Permanently delete user profiles." },
    // Roles permissions
    { name: "role:create", description: "Add system security roles." },
    { name: "role:read", description: "View security roles and matrices." },
    { name: "role:update", description: "Modify security role permissions." },
    { name: "role:delete", description: "Delete system security roles." },
    // Courses permissions
    { name: "course:create", description: "Draft new courses." },
    { name: "course:read", description: "Access course catalog details." },
    { name: "course:update", description: "Edit course curriculum information." },
    { name: "course:delete", description: "Delete course curriculum records." },
    { name: "course:publish", description: "Publish pending courses to public catalog." },
    // Sections permissions
    { name: "section:create", description: "Add new chapters/sections." },
    { name: "section:read", description: "View section lists." },
    { name: "section:update", description: "Edit section titles/sequence." },
    { name: "section:delete", description: "Delete section records." },
    // Lessons permissions
    { name: "lesson:create", description: "Add course lessons." },
    { name: "lesson:read", description: "Access course lesson materials." },
    { name: "lesson:update", description: "Edit lesson text/media attachments." },
    { name: "lesson:delete", description: "Delete lesson records." },
    // Uploads permissions
    { name: "upload:create", description: "Upload raw media documents." },
    { name: "upload:read", description: "View media files." },
    { name: "upload:delete", description: "Delete media attachments." },
    // Payments permissions
    { name: "payment:create", description: "Process customer order charges." },
    { name: "payment:read", description: "View purchase invoices and payouts." },
    { name: "payment:refund", description: "Approve payment refunds." },
    // Enrollments permissions
    { name: "enrollment:create", description: "Enroll in course catalogs." },
    { name: "enrollment:read", description: "View active student enrollments." },
    { name: "enrollment:update", description: "Alter student enrollment timelines." },
    { name: "enrollment:delete", description: "Cancel active student enrollments." },
    // Analytics permissions
    { name: "analytics:read", description: "View platform enrollment metrics." },
    // Settings permissions
    { name: "setting:read", description: "View system configurations." },
    { name: "setting:update", description: "Modify system setting variables." },
    // Audit permissions
    { name: "audit:read", description: "Review system security activity logs." },
    // Notifications permissions
    { name: "notification:create", description: "Create platform notification banners." },
    { name: "notification:read", description: "View personal notification alerts." },
    { name: "notification:update", description: "Dismiss/Update notification alerts." },
    { name: "notification:delete", description: "Remove platform notification banners." },
  ];

  const seededPermissions: Record<string, any> = {};
  for (const perm of permissions) {
    const dbPerm = await prisma.permission.create({
      data: { name: perm.name, description: perm.description },
    });
    seededPermissions[perm.name] = dbPerm;
  }
  console.log("🛡️ Seeded access permissions.");

  // Role Permissions
  // Super Admin Gets All
  for (const permKey of Object.keys(seededPermissions)) {
    await prisma.rolePermission.create({
      data: {
        roleId: seededRoles.SUPER_ADMIN.id,
        permissionId: seededPermissions[permKey].id,
      },
    });
  }

  const adminPerms = [
    "user:read", "user:update",
    "role:read",
    "course:create", "course:read", "course:update", "course:delete", "course:publish",
    "section:create", "section:read", "section:update", "section:delete",
    "lesson:create", "lesson:read", "lesson:update", "lesson:delete",
    "upload:read", "upload:create", "upload:delete",
    "payment:read", "payment:refund",
    "enrollment:create", "enrollment:read", "enrollment:update", "enrollment:delete",
    "analytics:read",
    "setting:read", "setting:update",
    "audit:read",
    "notification:create", "notification:read", "notification:update", "notification:delete",
  ];
  for (const name of adminPerms) {
    await prisma.rolePermission.create({
      data: {
        roleId: seededRoles.ADMIN.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }

  const instructorPerms = [
    "course:create", "course:read", "course:update",
    "section:create", "section:read", "section:update", "section:delete",
    "lesson:create", "lesson:read", "lesson:update", "lesson:delete",
    "upload:create", "upload:read",
    "enrollment:read",
    "analytics:read",
    "notification:create", "notification:read",
  ];
  for (const name of instructorPerms) {
    await prisma.rolePermission.create({
      data: {
        roleId: seededRoles.INSTRUCTOR.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }

  const studentPerms = [
    "course:read",
    "section:read",
    "lesson:read",
    "payment:create", "payment:read",
    "enrollment:create", "enrollment:read",
    "notification:read", "notification:update",
  ];
  for (const name of studentPerms) {
    await prisma.rolePermission.create({
      data: {
        roleId: seededRoles.STUDENT.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }
  console.log("🔗 Established permission matrices for roles.");

  // ──────────────────────────────────────────────────────────────────
  // 5. Mock Users
  // ──────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("Password@123", 10);

  const usersData = [
    { email: "superadmin@pragyaos.com", firstName: "Root", lastName: "Administrator", role: "SUPER_ADMIN" },
    { email: "admin@pragyaos.com", firstName: "System", lastName: "Manager", role: "ADMIN" },
    { email: "instructor1@pragyaos.com", firstName: "Jane", lastName: "Doe", role: "INSTRUCTOR" },
    { email: "instructor2@pragyaos.com", firstName: "Richard", lastName: "Feynman", role: "INSTRUCTOR" },
    { email: "student1@pragyaos.com", firstName: "Alice", lastName: "Cooper", role: "STUDENT" },
    { email: "student2@pragyaos.com", firstName: "Bob", lastName: "Dylan", role: "STUDENT" },
    { email: "student3@pragyaos.com", firstName: "Charlie", lastName: "Chaplin", role: "STUDENT" },
  ];

  const seededUsers: Record<string, any> = {};
  for (const u of usersData) {
    const dbUser = await prisma.user.create({
      data: {
        email: u.email,
        passwordHash,
        firstName: u.firstName,
        lastName: u.lastName,
        status: UserStatus.ACTIVE,
        organizationId: org.id,
      },
    });
    await prisma.userRole.create({
      data: {
        userId: dbUser.id,
        roleId: seededRoles[u.role].id,
      },
    });
    seededUsers[u.email] = dbUser;
  }
  console.log("👤 Seeded mock users.");

  // ──────────────────────────────────────────────────────────────────
  // 6. Categories
  // ──────────────────────────────────────────────────────────────────
  const techCat = await prisma.category.create({
    data: { name: "Technology", slug: "technology" },
  });
  const designCat = await prisma.category.create({
    data: { name: "Design", slug: "design" },
  });

  const webDevCat = await prisma.category.create({
    data: { name: "Web Development", slug: "web-development", parentId: techCat.id },
  });
  const mlCat = await prisma.category.create({
    data: { name: "Machine Learning", slug: "machine-learning", parentId: techCat.id },
  });
  const uiuxCat = await prisma.category.create({
    data: { name: "UI/UX Design", slug: "ui-ux-design", parentId: designCat.id },
  });
  console.log("📂 Seeded category hierarchy tree.");

  // ──────────────────────────────────────────────────────────────────
  // 7. Tags
  // ──────────────────────────────────────────────────────────────────
  const tagsData = ["React", "Node.js", "Python", "PyTorch", "Figma"];
  const seededTags: Record<string, any> = {};
  for (const t of tagsData) {
    seededTags[t] = await prisma.tag.create({ data: { name: t } });
  }

  // ──────────────────────────────────────────────────────────────────
  // 8. Courses
  // ──────────────────────────────────────────────────────────────────
  const course1 = await prisma.course.create({
    data: {
      title: "React.js Full-Stack Masterclass",
      slug: "reactjs-fullstack-masterclass",
      subtitle: "Become a professional React developer from scratch",
      description: "Build beautiful React applications and set up production-ready Node.js APIs.",
      difficulty: DifficultyLevel.INTERMEDIATE,
      status: CourseStatus.PUBLISHED,
      visibility: CourseVisibility.PUBLIC,
      categoryId: webDevCat.id,
      publishedAt: new Date(),
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Introduction to Machine Learning with PyTorch",
      slug: "introduction-to-machine-learning-pytorch",
      subtitle: "Learn the core foundations of Deep Learning",
      description: "Understand supervised learning algorithms and implement neural network layers in PyTorch.",
      difficulty: DifficultyLevel.BEGINNER,
      status: CourseStatus.PUBLISHED,
      visibility: CourseVisibility.PUBLIC,
      categoryId: mlCat.id,
      publishedAt: new Date(),
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: "Advanced UI Design Systems in Figma",
      slug: "advanced-ui-design-systems-figma",
      subtitle: "Design components with absolute efficiency",
      description: "Build robust variants, variables, and flexible auto-layout cards inside Figma.",
      difficulty: DifficultyLevel.ADVANCED,
      status: CourseStatus.DRAFT,
      visibility: CourseVisibility.PRIVATE,
      categoryId: uiuxCat.id,
    },
  });

  // Assign Instructors
  await prisma.courseInstructor.createMany({
    data: [
      { courseId: course1.id, userId: seededUsers["instructor1@pragyaos.com"].id },
      { courseId: course2.id, userId: seededUsers["instructor2@pragyaos.com"].id },
      { courseId: course3.id, userId: seededUsers["instructor1@pragyaos.com"].id },
    ],
  });

  // Connect Tags
  await prisma.courseTag.createMany({
    data: [
      { courseId: course1.id, tagId: seededTags["React"].id },
      { courseId: course1.id, tagId: seededTags["Node.js"].id },
      { courseId: course2.id, tagId: seededTags["Python"].id },
      { courseId: course2.id, tagId: seededTags["PyTorch"].id },
      { courseId: course3.id, tagId: seededTags["Figma"].id },
    ],
  });

  console.log("📚 Seeded course definitions.");

  // ──────────────────────────────────────────────────────────────────
  // 9. Course Modules & Units
  // ──────────────────────────────────────────────────────────────────
  // React modules
  const c1m1 = await prisma.courseModule.create({
    data: { title: "Getting Started with React", sequence: 1, courseId: course1.id },
  });
  const c1m2 = await prisma.courseModule.create({
    data: { title: "State and Hooks", sequence: 2, courseId: course1.id },
  });
  const c1m3 = await prisma.courseModule.create({
    data: { title: "Course Wrap-up", sequence: 3, courseId: course1.id },
  });

  const units1 = [
    { title: "Introduction to React & JSX", type: LearningUnitType.ARTICLE, sequence: 1, duration: 10, moduleId: c1m1.id },
    { title: "Setting up your first React App", type: LearningUnitType.VIDEO, sequence: 2, duration: 20, moduleId: c1m1.id },
    { title: "Mastering useState & useEffect", type: LearningUnitType.VIDEO, sequence: 3, duration: 30, moduleId: c1m2.id },
    { title: "State management deep dive", type: LearningUnitType.ARTICLE, sequence: 4, duration: 15, moduleId: c1m2.id },
    { title: "Building a complete React Portfolio", type: LearningUnitType.VIDEO, sequence: 5, duration: 60, moduleId: c1m3.id },
  ];

  const c1Units: any[] = [];
  for (const u of units1) {
    const unit = await prisma.learningUnit.create({
      data: {
        title: u.title,
        type: u.type,
        sequence: u.sequence,
        duration: u.duration,
        moduleId: u.moduleId,
      },
    });
    c1Units.push(unit);
  }

  // Machine Learning modules
  const c2m1 = await prisma.courseModule.create({
    data: { title: "Core Mathematical Background", sequence: 1, courseId: course2.id },
  });
  const c2m2 = await prisma.courseModule.create({
    data: { title: "Deep Learning Basics", sequence: 2, courseId: course2.id },
  });

  const units2 = [
    { title: "Linear Algebra Refresher", type: LearningUnitType.ARTICLE, sequence: 1, duration: 25, moduleId: c2m1.id },
    { title: "Neural Networks from Scratch", type: LearningUnitType.VIDEO, sequence: 2, duration: 40, moduleId: c2m2.id },
  ];

  const c2Units: any[] = [];
  for (const u of units2) {
    const unit = await prisma.learningUnit.create({
      data: {
        title: u.title,
        type: u.type,
        sequence: u.sequence,
        duration: u.duration,
        moduleId: u.moduleId,
      },
    });
    c2Units.push(unit);
  }
  console.log("📑 Seeded course modules & learning units.");

  // ──────────────────────────────────────────────────────────────────
  // 10. Products & Pricing
  // ──────────────────────────────────────────────────────────────────
  const p1 = await prisma.product.create({
    data: { sellableId: course1.id, sellableType: ProductType.COURSE, sku: "SKU-REACT-001", status: ProductStatus.ACTIVE },
  });
  const p2 = await prisma.product.create({
    data: { sellableId: course2.id, sellableType: ProductType.COURSE, sku: "SKU-ML-002", status: ProductStatus.ACTIVE },
  });
  const p3 = await prisma.product.create({
    data: { sellableId: course3.id, sellableType: ProductType.COURSE, sku: "SKU-FIGMA-003", status: ProductStatus.DRAFT },
  });

  const p1Price = await prisma.productPrice.create({
    data: { productId: p1.id, currency: "INR", amount: 499900, priceType: PriceType.ONE_TIME }, // INR 4,999.00
  });
  const p2Price = await prisma.productPrice.create({
    data: { productId: p2.id, currency: "INR", amount: 299900, priceType: PriceType.ONE_TIME }, // INR 2,999.00
  });
  const p3Price = await prisma.productPrice.create({
    data: { productId: p3.id, currency: "INR", amount: 599900, priceType: PriceType.ONE_TIME }, // INR 5,999.00
  });

  console.log("💰 Seeded products & pricing values.");

  // ──────────────────────────────────────────────────────────────────
  // 11. Coupons
  // ──────────────────────────────────────────────────────────────────
  const coupon1 = await prisma.coupon.create({
    data: {
      code: "WELCOME50",
      discountType: CouponType.PERCENTAGE,
      discountValue: 50, // 50% discount
      usageLimit: 100,
      status: CouponStatus.ACTIVE,
    },
  });

  const coupon2 = await prisma.coupon.create({
    data: {
      code: "FREEML",
      discountType: CouponType.PERCENTAGE,
      discountValue: 100, // 100% discount
      usageLimit: 50,
      status: CouponStatus.ACTIVE,
    },
  });

  console.log("🎟️ Seeded coupons.");

  // ──────────────────────────────────────────────────────────────────
  // 12. Enrollments, Timelines & Progress
  // ──────────────────────────────────────────────────────────────────
  const alice = seededUsers["student1@pragyaos.com"];
  const bob = seededUsers["student2@pragyaos.com"];
  const charlie = seededUsers["student3@pragyaos.com"];

  // Enrollment 1: Alice -> React.js (Completed)
  const e1 = await prisma.enrollment.create({
    data: {
      userId: alice.id,
      courseId: course1.id,
      status: ProgressStatus.COMPLETED as any, // COMPLETED status maps to COMPLETED enum in EnrollmentStatus
      enrolledAt: new Date(Date.now() - 15 * 24 * 3600 * 1000), // 15 days ago
      completedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000), // 2 days ago
    },
  });

  // Track Alice's React progress (all units completed)
  for (const unit of c1Units) {
    await prisma.learningProgress.create({
      data: {
        enrollmentId: e1.id,
        learningUnitId: unit.id,
        status: ProgressStatus.COMPLETED,
        completionPercent: 100.0,
        completedAt: new Date(),
      },
    });
  }

  // Create course completion
  await prisma.courseCompletion.create({
    data: {
      enrollmentId: e1.id,
      progressPercent: 100.0,
      completedAt: new Date(),
      eligibleForCertificate: true,
      reason: CourseCompletionReason.COMPLETED_ALL_UNITS,
    },
  });

  // Enrollment 2: Alice -> ML (Active, 50% progress)
  const e2 = await prisma.enrollment.create({
    data: {
      userId: alice.id,
      courseId: course2.id,
      status: EnrollmentStatus.ACTIVE,
    },
  });
  await prisma.learningProgress.create({
    data: {
      enrollmentId: e2.id,
      learningUnitId: c2Units[0].id,
      status: ProgressStatus.COMPLETED,
      completionPercent: 100.0,
      completedAt: new Date(),
    },
  });

  // Enrollment 3: Bob -> React (Active, 40% progress)
  const e3 = await prisma.enrollment.create({
    data: {
      userId: bob.id,
      courseId: course1.id,
      status: EnrollmentStatus.ACTIVE,
    },
  });
  // Completed first two units
  await prisma.learningProgress.create({
    data: {
      enrollmentId: e3.id,
      learningUnitId: c1Units[0].id,
      status: ProgressStatus.COMPLETED,
      completionPercent: 100.0,
      completedAt: new Date(),
    },
  });
  await prisma.learningProgress.create({
    data: {
      enrollmentId: e3.id,
      learningUnitId: c1Units[1].id,
      status: ProgressStatus.COMPLETED,
      completionPercent: 100.0,
      completedAt: new Date(),
    },
  });

  // Enrollment 4: Charlie -> React (Suspended)
  await prisma.enrollment.create({
    data: {
      userId: charlie.id,
      courseId: course1.id,
      status: "SUSPENDED" as any,
    },
  });

  console.log("🎓 Seeded enrollments and active progress values.");

  // ──────────────────────────────────────────────────────────────────
  // 13. Orders & Payment Attempts
  // ──────────────────────────────────────────────────────────────────
  // Alice Order 1: React with WELCOME50
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-000001",
      userId: alice.id,
      status: OrderStatus.PAID,
      currency: "INR",
      subtotalAmount: p1Price.amount,
      discountAmount: Math.floor(p1Price.amount * 0.5),
      netAmount: Math.floor(p1Price.amount * 0.5),
      activeCouponId: coupon1.id,
      customerNameSnapshot: "Alice Cooper",
      customerEmailSnapshot: alice.email,
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: p1.id,
      priceId: p1Price.id,
      priceSnapshot: p1Price.amount,
      discountSnapshot: Math.floor(p1Price.amount * 0.5),
    },
  });
  await prisma.paymentAttempt.create({
    data: {
      orderId: order1.id,
      gateway: PaymentGateway.RAZORPAY,
      gatewayOrderId: "order_mock_001",
      gatewayPaymentId: "pay_mock_001",
      status: PaymentStatus.SUCCESS,
      amount: order1.netAmount,
    },
  });

  // Alice Order 2: ML Course (Full Price)
  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-000002",
      userId: alice.id,
      status: OrderStatus.PAID,
      currency: "INR",
      subtotalAmount: p2Price.amount,
      discountAmount: 0,
      netAmount: p2Price.amount,
      customerNameSnapshot: "Alice Cooper",
      customerEmailSnapshot: alice.email,
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: p2.id,
      priceId: p2Price.id,
      priceSnapshot: p2Price.amount,
      discountSnapshot: 0,
    },
  });
  await prisma.paymentAttempt.create({
    data: {
      orderId: order2.id,
      gateway: PaymentGateway.RAZORPAY,
      gatewayOrderId: "order_mock_002",
      gatewayPaymentId: "pay_mock_002",
      status: PaymentStatus.SUCCESS,
      amount: order2.netAmount,
    },
  });

  // Bob Order 3: React Course (Full Price)
  const order3 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-000003",
      userId: bob.id,
      status: OrderStatus.PAID,
      currency: "INR",
      subtotalAmount: p1Price.amount,
      discountAmount: 0,
      netAmount: p1Price.amount,
      customerNameSnapshot: "Bob Dylan",
      customerEmailSnapshot: bob.email,
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: p1.id,
      priceId: p1Price.id,
      priceSnapshot: p1Price.amount,
      discountSnapshot: 0,
    },
  });
  await prisma.paymentAttempt.create({
    data: {
      orderId: order3.id,
      gateway: PaymentGateway.RAZORPAY,
      gatewayOrderId: "order_mock_003",
      gatewayPaymentId: "pay_mock_003",
      status: PaymentStatus.SUCCESS,
      amount: order3.netAmount,
    },
  });

  console.log("💳 Seeded order registers & transaction history.");

  // ──────────────────────────────────────────────────────────────────
  // 14. Credentials Templates & Issuance
  // ──────────────────────────────────────────────────────────────────
  const template = await prisma.credentialTemplate.create({
    data: {
      name: "Standard Course Completion Certificate",
      slug: "standard-completion-certificate",
      templateVersion: "v1",
      htmlTemplate: "<div class='certificate'><h1>Certificate of Completion</h1><p>Congratulations {{studentName}} on completing {{courseTitle}}!</p></div>",
      cssTemplate: ".certificate { text-align: center; font-family: sans-serif; padding: 50px; border: 5px solid gold; }",
      branding: { logoUrl: "https://pragyaos.com/logo.png" },
      active: true,
    },
  });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  await prisma.credential.create({
    data: {
      credentialNumber: "CERT-2026-000001",
      userId: alice.id,
      courseId: course1.id,
      templateId: template.id,
      verificationToken: rawToken,
      verificationHash: hashedToken,
      status: CredentialStatus.ISSUED,
      metadata: {
        studentName: "Alice Cooper",
        courseTitle: "React.js Full-Stack Masterclass",
        instructorName: "Jane Doe",
        completionDate: new Date().toISOString(),
      },
    },
  });

  console.log("📜 Seeded certificate templates & credentials.");

  // ──────────────────────────────────────────────────────────────────
  // 15. Notification Templates & Banners
  // ──────────────────────────────────────────────────────────────────
  const nTemp1 = await prisma.notificationTemplate.create({
    data: {
      name: "Payment Success Alert",
      slug: "payment-success",
      version: 1,
      channel: NotificationChannel.IN_APP,
      titleTemplate: "Payment Success: {{orderNumber}}",
      bodyTemplate: "Your payment of INR {{amount}} for the course was successfully processed.",
    },
  });

  const nTemp2 = await prisma.notificationTemplate.create({
    data: {
      name: "Course Published Announcement",
      slug: "course-published",
      version: 1,
      channel: NotificationChannel.IN_APP,
      titleTemplate: "New Course: {{courseTitle}}",
      bodyTemplate: "A new course has been added to our catalog. Start learning today!",
    },
  });

  // Create mock notification records
  await prisma.notification.create({
    data: {
      userId: alice.id,
      templateId: nTemp1.id,
      title: "Payment Success: ORD-2026-000001",
      body: "Your payment of INR 2499.50 for the course was successfully processed.",
      category: NotificationCategory.PAYMENT,
      priority: NotificationPriority.NORMAL,
      channel: NotificationChannel.IN_APP,
      status: NotificationStatus.READ,
      readAt: new Date(),
    },
  });

  await prisma.notification.create({
    data: {
      userId: alice.id,
      templateId: nTemp2.id,
      title: "New Course: React.js Full-Stack Masterclass",
      body: "A new course has been added to our catalog. Start learning today!",
      category: NotificationCategory.LEARNING,
      priority: NotificationPriority.LOW,
      channel: NotificationChannel.IN_APP,
      status: NotificationStatus.PENDING,
    },
  });

  console.log("🔔 Seeded notification templates & histories.");

  // ──────────────────────────────────────────────────────────────────
  // 16. Hydrate Meilisearch Index (if running)
  // ──────────────────────────────────────────────────────────────────
  try {
    const { default: meilisearchProvider } = await import("../src/modules/search/meilisearch.provider");
    console.log("🔍 Attempting to hydrate Meilisearch catalog indexes...");
    
    const courseDocs = [
      {
        id: course1.id,
        slug: course1.slug,
        title: course1.title,
        subtitle: course1.subtitle || "",
        description: course1.description || "",
        difficulty: course1.difficulty,
        status: course1.status,
        visibility: course1.visibility,
        category: "Web Development",
        instructor: "Jane Doe",
        tags: ["React", "Node.js"],
        version: course1.updatedAt.getTime(),
      },
      {
        id: course2.id,
        slug: course2.slug,
        title: course2.title,
        subtitle: course2.subtitle || "",
        description: course2.description || "",
        difficulty: course2.difficulty,
        status: course2.status,
        visibility: course2.visibility,
        category: "Machine Learning",
        instructor: "Richard Feynman",
        tags: ["Python", "PyTorch"],
        version: course2.updatedAt.getTime(),
      },
    ];

    await meilisearchProvider.indexDocuments("courses", courseDocs);
    console.log("✅ Successfully populated Meilisearch search index.");
  } catch (err) {
    console.warn("⚠️ Meilisearch offline/unable to index during seeding. Fail-open hydration active.");
  }

  // ──────────────────────────────────────────────────────────────────
  // 17. Baseline settings
  // ──────────────────────────────────────────────────────────────────
  await prisma.systemSetting.create({
    data: {
      key: "platform:signup_enabled",
      value: "true",
      description: "Controls whether visitor registration is enabled.",
      organizationId: org.id,
    },
  });

  console.log("🎉 Seeding sequence finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
