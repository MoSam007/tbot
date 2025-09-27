import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: "admin@mail.test", password: "admin123", role: "admin" },
    { email: "trader@mail.test", password: "trader123", role: "trader" },
    { email: "viewer@mail.test", password: "viewer123", role: "viewer" },
    { email: "test@mail.test", password: "password123", role: "trader" },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: hashedPassword,
        role: u.role,
      },
    });

    console.log(`Seeded user: ${user.email} (${user.role})`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
