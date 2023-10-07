import { Kysely } from 'kysely';
import { Database } from '../../src/infrastructure/database/types/database.js';

export const minecraft = async (database: Kysely<Database>) => {
  await database
    .insertInto('minecraft__seasons')
    .values([
      {
        id: '018b094f-05fb-71dc-a257-8c15b15fdcfe',
        name: 'Test seasons 1',
        startedAt: new Date('2023-10-07 08:44:16'),
        endedAt: null,
        createdAt: new Date('2023-10-07 08:44:16'),
        updatedAt: new Date('2023-10-07 08:44:16'),
      },
    ])
    .execute();

  await database
    .insertInto('minecraft__players')
    .values([
      {
        id: '018b0951-52d5-7a4e-b14d-e57bec36ee03',
        name: 'xehbit',
        minecraftId: '91e2729a-f71e-46cf-a3de-99453ea65804',
        createdAt: new Date('2023-10-07 08:46:46'),
        updatedAt: new Date('2023-10-07 08:46:46'),
      },
    ])
    .execute();

  await database
    .insertInto('minecraft__stats')
    .values([
      {
        id: '018b0961-9dc6-7578-bcc8-27ccfec478f0',
        minecraft_season_id: '018b094f-05fb-71dc-a257-8c15b15fdcfe',
        minecraft_player_id: '018b0951-52d5-7a4e-b14d-e57bec36ee03',
        category: 'kills',
        stat: 'minecraft:pig',
        value: 1,
        createdAt: new Date('2023-10-07 09:04:34'),
      },
      {
        id: '018b0961-9dc7-7a24-b995-0aa5538b75fd',
        minecraft_season_id: '018b094f-05fb-71dc-a257-8c15b15fdcfe',
        minecraft_player_id: '018b0951-52d5-7a4e-b14d-e57bec36ee03',
        category: 'kills',
        stat: 'minecraft:sheep',
        value: 3,
        createdAt: new Date('2023-10-07 09:04:34'),
      },
    ])
    .execute();
};
