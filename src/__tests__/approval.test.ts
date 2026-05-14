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
});
