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
    { name: "users:read", description: "View user directory listings." },
    { name: "users:manage", description: "Create, edit, suspend, or delete users." },
    { name: "courses:read", description: "Access catalog courses details." },
    { name: "courses:write", description: "Create, edit, or delete courses." },
    { name: "courses:approve", description: "Review and publish pending courses." },
    { name: "billing:manage", description: "Orchestrate refunds and review invoices." },
    { name: "settings:manage", description: "Alter system-wide thresholds and configs." },
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

  // Admin: gets user directory, catalog writing, and billing
  const adminPerms = ["users:read", "courses:read", "courses:write", "courses:approve", "billing:manage"];
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
