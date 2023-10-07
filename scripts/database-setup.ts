import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs/promises';
import { CamelCasePlugin, FileMigrationProvider, Kysely, Migrator, NO_MIGRATIONS, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from '../src/infrastructure/database/types/database.js';
import { minecraft } from '../database/seeds/minecraft.js';

const database = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.DATABASE_URL,
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

// Re-migrate the database
await migrator.migrateTo(NO_MIGRATIONS);
await migrator.migrateToLatest();

// Seed the database
await minecraft(database);

await database.destroy();
