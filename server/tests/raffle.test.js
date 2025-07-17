const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('GET /api/raffle', () => {
  it('debería requerir autenticación', async () => {
    const res = await request(app).get('/api/raffle');
    expect(res.statusCode).toBe(401);
  });
});