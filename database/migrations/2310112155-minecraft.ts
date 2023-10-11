import { Migration, sql } from 'kysely';

export default {
  up: async (database) => {
    await database.schema
      .createTable('minecraft__advancements')
      .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v7()`))
      .addColumn('minecraft_season_id', 'uuid', (col) => col.notNull().references('minecraft__seasons.id'))
      .addColumn('minecraft_player_id', 'uuid', (col) => col.notNull().references('minecraft__players.id'))
      .addColumn('advancement', 'varchar(128)', (col) => col.notNull())
      .addColumn('created_at', 'timestamp(0)', (col) => col.notNull().defaultTo(sql`now()`))
      .addUniqueConstraint('minecraft_advancements_unique', [
        'minecraft_season_id',
        'minecraft_player_id',
        'advancement',
      ])
      .execute();
  },

  down: async (database) => {
    await database.schema.dropTable('minecraft__advancements').ifExists().execute();
  },
} as Migration;
