import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { migrate } from '../db/migrate.js';
import { pool } from '../db/pool.js';
import { seed } from '../db/seed.js';

const app = createApp();

beforeAll(async () => {
  await migrate(pool);
});

beforeEach(async () => {
  await seed(pool);
});

afterAll(async () => {
  await pool.end();
});

describe('approval requests', () => {
  it('responds to health checks', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('lists seeded approval requests', async () => {
    const response = await request(app).get('/api/requests');

    expect(response.status).toBe(200);
    expect(response.body.requests).toHaveLength(3);
    expect(response.body.requests[0]).toMatchObject({
      id: 1,
      title: 'Laptop stand',
      status: 'pending',
      requestedByName: 'Eli Employee',
    });
  });

  it('requires a demo user before approving a request', async () => {
    const response = await request(app).post('/api/requests/1/approve');

    expect(response.status).toBe(401);
  });

  it('allows a manager to approve a pending request', async () => {
    const response = await request(app)
      .post('/api/requests/1/approve')
      .set('x-demo-user', 'manager-1');

    expect(response.status).toBe(200);
    expect(response.body.request).toMatchObject({
      id: 1,
      status: 'approved',
      approvedBy: 'manager-1',
    });
  });

  it('returns 404 for a missing approval request', async () => {
    const response = await request(app)
      .post('/api/requests/999/approve')
      .set('x-demo-user', 'manager-1');

    expect(response.status).toBe(404);
  });

  it('does not approve the same request twice', async () => {
    await request(app)
      .post('/api/requests/1/approve')
      .set('x-demo-user', 'manager-1')
      .expect(200);

    const response = await request(app)
      .post('/api/requests/1/approve')
      .set('x-demo-user', 'admin-1');

    expect(response.status).toBe(409);
  });
});
