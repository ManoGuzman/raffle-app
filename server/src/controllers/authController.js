import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
