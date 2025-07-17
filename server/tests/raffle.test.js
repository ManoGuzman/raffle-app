const request = require('supertest');
const app = require('../src/app');

describe('Raffle API', () => {
  it('GET /api/raffle/numbers should return 200', async () => {
    const res = await request(app).get('/api/raffle/numbers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/raffle/reserve should fail with missing fields', async () => {
    const res = await request(app).post('/api/raffle/reserve').send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error', 'Validation failed');
  });

  it('POST /api/raffle/reserve should reserve numbers (happy path)', async () => {
    const payload = {
      numbers: [1, 2],
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "8888-8888"
    };

    const res = await request(app).post('/api/raffle/reserve').send(payload);
    expect([200, 409]).toContain(res.statusCode); // Puede fallar si ya están reservados
  });
});
