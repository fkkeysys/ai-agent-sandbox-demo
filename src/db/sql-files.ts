import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Pool } from 'pg';

export async function runSqlDirectory(pool: Pool, relativeDirectory: string) {
  const directory = path.join(process.cwd(), relativeDirectory);
  const files = (await readdir(directory))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = await readFile(path.join(directory, file), 'utf8');
    await pool.query(sql);
  }
}
