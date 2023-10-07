import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { Database } from './types/database.js';
import { environment } from '../config/environment.js';
import { logger } from '../logger/logger.js';

export const database = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: environment.DATABASE_URL,
    }),
  }),

  log: (event) => {
    if (event.level === 'error') {
      logger.error(`Database error`, { error: event.error });
    }
  },

  plugins: [new CamelCasePlugin()],
});
