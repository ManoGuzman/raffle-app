const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all raffle numbers and their status
 */
const getAllNumbers = async (req, res) => {
  try {
    const numbers = await prisma.number.findMany({
      orderBy: { number: 'asc' }
    });
    res.json(numbers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch numbers' });
  }
};

/**
 * Reserve numbers
 * Body: { numbers: [Int], name: String, email: String, phone: String }
 */
const reserveNumber = async (req, res) => {
  const { numbers, name, email, phone } = req.body;

  if (!numbers || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check availability
    const unavailable = await prisma.number.findMany({
      where: {
        number: { in: numbers },
        OR: [{ status: 'RESERVED' }, { status: 'SOLD' }]
      }
    });

    if (unavailable.length > 0) {
      return res.status(409).json({ error: 'Some numbers are already reserved or sold', unavailable: unavailable.map(n => n.number) });
    }

    // Reserve numbers
    await Promise.all(numbers.map(number => 
      prisma.number.update({
        where: { number },
        data: {
          status: 'RESERVED',
          reservedBy: name,
          email,
          phone,
          reservedAt: new Date()
        }
      })
    ));

    res.json({ message: `Numbers ${numbers.join(', ')} reserved successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reserve numbers' });
  }
};

/**
 * Buy numbers
 * Body: { numbers: [Int], name: String, email: String, phone: String }
 * (Se asume que si está reservado, se puede comprar, o también comprar directamente números disponibles)
 */
const buyNumber = async (req, res) => {
  const { numbers, name, email, phone } = req.body;

  if (!numbers || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check availability or reserved by same person
    const invalid = await prisma.number.findMany({
      where: {
        number: { in: numbers },
        NOT: [
          { status: 'AVAILABLE' },
          { AND: [{ status: 'RESERVED' }, { reservedBy: name }] }
        ]
      }
    });

    if (invalid.length > 0) {
      return res.status(409).json({ error: 'Some numbers are not available for purchase', invalid: invalid.map(n => n.number) });
    }

    // Mark numbers as sold
    await Promise.all(numbers.map(number => 
      prisma.number.update({
        where: { number },
        data: {
          status: 'SOLD',
          reservedBy: name,
          email,
          phone,
          reservedAt: new Date()
        }
      })
    ));

    res.json({ message: `Numbers ${numbers.join(', ')} purchased successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase numbers' });
  }
};

module.exports = {
  getAllNumbers,
  reserveNumber,
  buyNumber
};
