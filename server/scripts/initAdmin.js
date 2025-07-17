import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = 'manuel';
  const plainPassword = 'manuel123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await prisma.admin.findUnique({ where: { username } });

  if (existing) {
    console.log(`⚠️ El usuario "${username}" ya existe.`);
    return;
  }

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`✅ Usuario admin creado con éxito: ${username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
