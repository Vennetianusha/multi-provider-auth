const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const { createTokenPair } = require('./services/token.service');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- HEALTH CHECK -------------------- */
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({
      status: 'OK',
      db: 'connected',
    });
  } catch (err) {
    res.status(500).json({
      status: 'ERROR',
      db: 'disconnected',
    });
  }
});

/* -------------------- TEMP JWT TEST ROUTE -------------------- */
app.get('/test-token', (req, res) => {
  const fakeUser = {
    id: '00000000-0000-0000-0000-000000000000',
    email: 'test@example.com',
    role: 'user',
  };

  const tokens = createTokenPair(fakeUser);
  res.status(200).json(tokens);
});

/* -------------------- ROUTES -------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
