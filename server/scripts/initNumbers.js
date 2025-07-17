import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 200; i++) {
    await prisma.number.upsert({
      where: { number: i },
      update: {},
      create: {
        number: i,
        status: 'AVAILABLE',
      },
    });
  }
  console.log('200 números creados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
