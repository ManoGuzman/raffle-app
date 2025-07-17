const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const prisma = new PrismaClient();

/**
 * Admin login
 * Body: { username, password }
 */
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(admin);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Get all numbers (admin)
 */
const getAllNumbersAdmin = async (req, res) => {
  try {
    const numbers = await prisma.number.findMany({ orderBy: { number: 'asc' } });
    res.json(numbers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch numbers' });
  }
};

/**
 * Update number status (admin)
 * Params: number (int)
 * Body: { status, reservedBy?, email?, phone? }
 */
const updateNumberStatus = async (req, res) => {
  const { number } = req.params;
  const { status, reservedBy, email, phone } = req.body;

  if (!['AVAILABLE', 'RESERVED', 'SOLD'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedNumber = await prisma.number.update({
      where: { number: parseInt(number) },
      data: {
        status,
        reservedBy,
        email,
        phone,
        reservedAt: status === 'AVAILABLE' ? null : new Date()
      }
    });
    res.json(updatedNumber);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update number' });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    // Trae todos los números que no estén disponibles (reservados o vendidos)
    const reservedNumbers = await prisma.number.findMany({
      where: {
        status: {
          not: 'AVAILABLE',
        },
      },
      orderBy: { number: 'asc' },
    });

    res.json(reservedNumbers);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginAdmin,
  getAllNumbersAdmin,
  updateNumberStatus
};
