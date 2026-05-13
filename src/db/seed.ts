import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Pool } from 'pg';
import { pool } from './pool.js';
import { runSqlDirectory } from './sql-files.js';

export async function seed(db: Pool = pool) {
  await runSqlDirectory(db, 'db/seeds');
}

const isCli = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isCli) {
  seed()
    .then(() => pool.end())
    .catch(async (error: unknown) => {
      console.error(error);
      await pool.end();
      process.exit(1);
    });
}
