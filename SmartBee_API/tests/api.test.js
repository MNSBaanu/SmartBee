const request = require('supertest');
const app = require('../src/index');

describe('SmartBee API', () => {
  let token;

  beforeAll(async () => {
    const email = `test-${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email, password: 'password123', name: 'Test User' });
    token = res.body.data.token;
  });

  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
  });

  it('GET /api/auth/me requires auth', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('GET /api/auth/me returns user when authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBeDefined();
  });

  it('CRUD modules', async () => {
    const create = await request(app)
      .post('/api/modules')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'CS101',
        name: 'Intro to CS',
        credits: '3',
        semester: 'Fall 2026',
        instructor: 'Dr. Smith',
      });
    expect(create.status).toBe(201);
    const id = create.body.data.id;

    const list = await request(app)
      .get('/api/modules')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body.data.length).toBeGreaterThanOrEqual(1);

    await request(app)
      .delete(`/api/modules/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
