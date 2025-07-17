const request = require('supertest');
const app = require('../app');

describe('POST /api/login', () => {
  it('debería responder con un token si el login es correcto', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'adminpassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('debería fallar con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });
});