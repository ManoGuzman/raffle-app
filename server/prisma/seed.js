const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.number.count();
  if (existing > 0) {
    console.log('Numbers already seeded');
    return;
  }

  const data = Array.from({ length: 200 }, (_, i) => ({
    number: i + 1,
    status: 'AVAILABLE'
  }));

  await prisma.number.createMany({ data });
  console.log('Seeded 200 numbers');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
