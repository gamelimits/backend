import pLimit from 'p-limit';
import { database } from '../../../infrastructure/database/database.js';
import { fetchMinecraftProfile } from '../utils/fetch-minecraft-profile.js';
import { logger } from '../../../infrastructure/logger/logger.js';

export const updatePlayersUseCase = async () => {
  const players = await database
    .selectFrom('minecraft__players')
    .select(['id', 'name', 'minecraftId'])
    .where('name', 'is', null)
    .limit(100)
    .execute();

  if (players.length === 0) {
    return;
  }

  const limit = pLimit(5);

  await Promise.all(
    players.map((player) =>
      limit(async () => {
        const profile = await fetchMinecraftProfile(player.minecraftId);

        await database
          .updateTable('minecraft__players')
          .where('id', '=', player.id)
          .set({
            name: profile.name,
            updatedAt: new Date(),
          })
          .execute();
      }),
    ),
  );

  logger.info(`[Minecraft] updated ${players.length} player profiles.`);
};
