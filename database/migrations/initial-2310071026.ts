import { Migration, sql } from 'kysely';

export default {
  up: async (database) => {
    // CREATE EXTENSION pg_uuidv7;

    await database.schema
      .createTable('minecraft__seasons')
      .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v7()`))
      .addColumn('name', 'varchar(128)', (col) => col.notNull())
      .addColumn('started_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .addColumn('ended_at', 'timestamp(0)')
      .addColumn('created_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .addColumn('updated_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .execute();

    await database.schema
      .createTable('minecraft__players')
      .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v7()`))
      .addColumn('name', 'varchar(128)')
      .addColumn('minecraft_id', 'uuid', (col) => col.notNull().unique())
      .addColumn('created_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .addColumn('updated_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .execute();

    await database.schema
      .createTable('minecraft__stats')
      .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v7()`))
      .addColumn('minecraft_season_id', 'uuid', (col) => col.notNull().references('minecraft__seasons.id'))
      .addColumn('minecraft_player_id', 'uuid', (col) => col.notNull().references('minecraft__players.id'))
      .addColumn('category', 'varchar(128)', (col) => col.notNull())
      .addColumn('stat', 'varchar(512)', (col) => col.notNull())
      .addColumn('value', 'integer', (col) => col.notNull())
      .addColumn('created_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .addUniqueConstraint('minecraft_status_unique', [
        'minecraft_season_id',
        'minecraft_player_id',
        'category',
        'stat',
        'value',
      ])
      .execute();
  },

  down: async (database) => {
    await database.schema.dropTable('minecraft__stats').ifExists().execute();
    await database.schema.dropTable('minecraft__players').ifExists().execute();
    await database.schema.dropTable('minecraft__seasons').ifExists().execute();
  },
} as Migration;
