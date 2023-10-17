import { z } from 'zod';
import { useCaseValidator } from '../../../common/utils/use-case-validator.js';
import { database } from '../../../infrastructure/database/database.js';
import { logger } from '../../../infrastructure/logger/logger.js';

const parametersSchema = z.object({
  seasonId: z.string().uuid(),
  players: z.array(z.string().uuid()),
  stats: z.array(
    z.object({
      minecraftId: z.string().uuid(),
      category: z.string(),
      stat: z.string(),
      value: z.number().int(),
    }),
  ),
  advancements: z.array(
    z.object({
      minecraftId: z.string().uuid(),
      advancement: z.string(),
    }),
  ),
});

type ParametersSchema = z.input<typeof parametersSchema>;

export const updateStatsUseCase = async (parameters: ParametersSchema) => {
  const data = useCaseValidator(parametersSchema, parameters);

  // Make sure all minecraft players are in the database
  await database
    .insertInto('minecraft__players')
    .values(data.players.map((minecraftId) => ({ minecraftId })))
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Insert stats
  if (data.stats.length > 0) {
    const createdStats = await database
      .insertInto('minecraft__stats')
      .values((eb) =>
        data.stats.map((stat) => ({
          minecraftSeasonId: data.seasonId,
          minecraftPlayerId: eb
            .selectFrom('minecraft__players')
            .select('id')
            .where('minecraftId', '=', stat.minecraftId),
          category: stat.category,
          stat: stat.stat,
          value: stat.value,
        })),
      )
      .onConflict((oc) => oc.doNothing())
      .executeTakeFirst();

    logger.info(`[Minecraft] added ${createdStats.numInsertedOrUpdatedRows} stats.`);
  }

  // Insert update advancements
  if (data.advancements.length > 0) {
    const createdAdvancements = await database
      .insertInto('minecraft__advancements')
      .values((eb) =>
        data.advancements.map((advancement) => ({
          minecraftSeasonId: data.seasonId,
          minecraftPlayerId: eb
            .selectFrom('minecraft__players')
            .select('id')
            .where('minecraftId', '=', advancement.minecraftId),
          advancement: advancement.advancement,
        })),
      )
      .onConflict((oc) => oc.doNothing())
      .executeTakeFirst();

    logger.info(`[Minecraft] added ${createdAdvancements.numInsertedOrUpdatedRows} advancements.`);
  }
};
