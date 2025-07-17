require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const raffleRoutes = require('./routes/raffleRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api/raffle', raffleRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Welcome to Church Raffle API'));

// Errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;
