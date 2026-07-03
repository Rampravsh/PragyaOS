import { UserStatus } from "@prisma/client";
import { prisma } from "../src/database/client";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Default Organization
  const org = await prisma.organization.upsert({
    where: { slug: "pragya-core" },
    update: {},
    create: {
      name: "Pragya Core LXP",
      slug: "pragya-core",
    },
  });
  console.log(`🏢 Seeded default organization: ${org.name}`);

  // 2. Seed Default Roles
  const roles = [
    { name: "SUPER_ADMIN", description: "Root platform owner with absolute system access." },
    { name: "ADMIN", description: "Organization operator managing courses, users, and billing." },
    { name: "INSTRUCTOR", description: "Content creator designing curriculums and grading assignments." },
    { name: "STUDENT", description: "Active learner enrolling in courses and submitting assessments." },
  ];

  const seededRoles: Record<string, any> = {};
  for (const role of roles) {
    const dbRole = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: { name: role.name, description: role.description },
    });
    seededRoles[role.name] = dbRole;
  }
  console.log("🔑 Seeded security roles.");

  // 3. Seed Reference Permissions
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
    const dbPerm = await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: { name: perm.name, description: perm.description },
    });
    seededPermissions[perm.name] = dbPerm;
  }
  console.log("🛡️ Seeded access permissions.");

  // 4. Connect Permissions to Roles (RolePermissions Join Table)
  // Super Admin: gets all permissions
  for (const permKey of Object.keys(seededPermissions)) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: seededRoles.SUPER_ADMIN.id,
          permissionId: seededPermissions[permKey].id,
        },
      },
      update: {},
      create: {
        roleId: seededRoles.SUPER_ADMIN.id,
        permissionId: seededPermissions[permKey].id,
      },
    });
  }

  // Admin permissions
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
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: seededRoles.ADMIN.id,
          permissionId: seededPermissions[name].id,
        },
      },
      update: {},
      create: {
        roleId: seededRoles.ADMIN.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }

  // Instructor permissions
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
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: seededRoles.INSTRUCTOR.id,
          permissionId: seededPermissions[name].id,
        },
      },
      update: {},
      create: {
        roleId: seededRoles.INSTRUCTOR.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }

  // Student permissions
  const studentPerms = [
    "course:read",
    "section:read",
    "lesson:read",
    "payment:create", "payment:read",
    "enrollment:create", "enrollment:read",
    "notification:read", "notification:update",
  ];
  for (const name of studentPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: seededRoles.STUDENT.id,
          permissionId: seededPermissions[name].id,
        },
      },
      update: {},
      create: {
        roleId: seededRoles.STUDENT.id,
        permissionId: seededPermissions[name].id,
      },
    });
  }
  console.log("🔗 Established permission matrices for roles.");

  // 5. Create default Super Admin user for local development
  const adminEmail = "superadmin@pragyaos.com";
  const passwordHash = await bcrypt.hash("Password@123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      firstName: "Root",
      lastName: "Administrator",
      status: UserStatus.ACTIVE,
      organizationId: org.id,
    },
  });

  // Assign SUPER_ADMIN role to the admin user
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: seededRoles.SUPER_ADMIN.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: seededRoles.SUPER_ADMIN.id,
    },
  });
  console.log(`👤 Created default superadmin: ${adminEmail} (PW: Password@123)`);

  // 6. Seed baseline system settings
  await prisma.systemSetting.upsert({
    where: { key: "platform:signup_enabled" },
    update: {},
    create: {
      key: "platform:signup_enabled",
      value: "true",
      description: "Controls whether visitor registration is enabled.",
      organizationId: org.id,
    },
  });

  console.log("✅ Seeding sequence finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
