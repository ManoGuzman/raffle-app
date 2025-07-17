const express = require('express');
const router = express.Router();

const { getAllNumbers, reserveNumber, buyNumber } = require('../controllers/raffleController');
const { reserveValidation } = require('../validations/raffleValidation');
const { validateRequest } = require('../middlewares/errorHandler');

// Obtener lista de números
router.get('/numbers', getAllNumbers);

// Apartar número(s)
router.post('/reserve', reserveValidation, validateRequest, reserveNumber);

// Comprar número(s)
router.post('/buy', reserveValidation, validateRequest, buyNumber);

module.exports = router;
