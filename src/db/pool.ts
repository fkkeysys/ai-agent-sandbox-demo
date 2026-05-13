import pg from 'pg';

const { Pool } = pg;

const defaultDatabaseUrl = 'postgres://sandbox:sandbox@localhost:54320/agent_sandbox';

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? defaultDatabaseUrl;
}

export const pool = new Pool({
  connectionString: getDatabaseUrl(),
});
