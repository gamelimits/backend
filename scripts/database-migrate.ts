import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs/promises';
import { CamelCasePlugin, FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from '../src/infrastructure/database/types/database.js';

const database = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.DATABASE_URL_MIGRATE,
    }),
  }),

  plugins: [new CamelCasePlugin()],
});

const migrator = new Migrator({
  db: database,
  migrationTableName: '__migration',
  migrationLockTableName: '__migration_lock',
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(process.cwd(), 'database', 'migrations'),
  }),
});

await migrator.migrateToLatest();

await database.destroy();
