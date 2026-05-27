import "dotenv/config";

import * as bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const username = process.env.ADMIN_USERNAME!;
const password = process.env.ADMIN_PASSWORD!;

if (!password) {
  console.error("Missing ADMIN_PASSWORD environment variable.");
  process.exit(1);
}

async function main() {
  const passwordHash = await bcryptjs.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },

    update: {
      passwordHash,
    },

    create: {
      username,
      passwordHash,
    },
  });

}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });