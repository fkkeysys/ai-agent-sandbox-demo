import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { z } from 'zod';
import { pool } from './db/pool.js';

type DemoUser = {
  id: string;
  name: string;
  role: 'employee' | 'manager' | 'admin';
};

const idParamSchema = z.coerce.number().int().positive();

async function loadDemoUser(request: Request): Promise<DemoUser | null> {
  const userId = request.header('x-demo-user');
  if (!userId) return null;

  const result = await pool.query<DemoUser>(
    'SELECT id, name, role FROM users WHERE id = $1',
    [userId],
  );

  return result.rows[0] ?? null;
}

function asyncHandler(
  handler: (request: Request, response: Response) => Promise<void>,
) {
  return (request: Request, response: Response) => {
    handler(request, response).catch((error: unknown) => {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    });
  };
}

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.get('/health', asyncHandler(async (_request, response) => {
    await pool.query('SELECT 1');
    response.json({ ok: true });
  }));

  app.get('/api/users', asyncHandler(async (_request, response) => {
    const result = await pool.query<DemoUser>(
      `SELECT id, name, role
       FROM users
       ORDER BY CASE role WHEN 'employee' THEN 1 WHEN 'manager' THEN 2 ELSE 3 END`,
    );

    response.json({ users: result.rows });
  }));

  app.get('/api/requests', asyncHandler(async (_request, response) => {
    const result = await pool.query(
      `SELECT
         approval_requests.id,
         approval_requests.title,
         approval_requests.amount_cents AS "amountCents",
         approval_requests.status,
         requester.name AS "requestedByName",
         approver.name AS "approvedByName",
         approval_requests.approved_at AS "approvedAt"
       FROM approval_requests
       JOIN users requester ON requester.id = approval_requests.requested_by
       LEFT JOIN users approver ON approver.id = approval_requests.approved_by
       ORDER BY approval_requests.id`,
    );

    response.json({ requests: result.rows });
  }));

  return app;
}
