const express = require('express');
const router = express.Router();

const { loginAdmin, getAllNumbersAdmin, updateNumberStatus } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

// Login admin
router.post('/login', loginAdmin);

// Routes protected for admins only
router.use(authMiddleware);

// Get all numbers with details (admin)
router.get('/numbers', getAllNumbersAdmin);

// Update status of a number (reserve, buy, etc)
router.patch('/numbers/:number', updateNumberStatus);

// Ruta protegida
router.get('/reservations', authenticateToken, getAllReservations);

export default router;