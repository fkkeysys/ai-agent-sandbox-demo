import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';
import { migrate } from './migrate.js';
import { seed } from './seed.js';

export async function resetDatabase() {
  await pool.query('DROP TABLE IF EXISTS approval_requests, users CASCADE');
  await migrate(pool);
  await seed(pool);
}

const isCli = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isCli) {
  resetDatabase()
    .then(() => pool.end())
    .catch(async (error: unknown) => {
      console.error(error);
      await pool.end();
      process.exit(1);
    });
}
