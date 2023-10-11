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
});

type ParametersSchema = z.input<typeof parametersSchema>;

export const updateStatsUseCase = async (parameters: ParametersSchema) => {
  const data = useCaseValidator(parametersSchema, parameters);

  if (data.stats.length === 0) {
    return;
  }

  // Make sure all minecraft players are in the database
  const createdPlayers = await database
    .insertInto('minecraft__players')
    .values(data.players.map((minecraftId) => ({ minecraftId })))
    .onConflict((oc) => oc.doNothing())
    .executeTakeFirst();

  // Insert update stats
  const createdStats = await database
    .insertInto('minecraft__stats')
    .values((eb) =>
      data.stats.map((stat) => ({
        minecraftSeasonId: data.seasonId,
        minecraftPlayerId: eb.selectFrom('minecraft__players').select('id').where('minecraftId', '=', stat.minecraftId),
        category: stat.category,
        stat: stat.stat,
        value: stat.value,
      })),
    )
    .onConflict((oc) => oc.doNothing())
    .executeTakeFirst();

  if (createdPlayers.numInsertedOrUpdatedRows === BigInt(0) && createdStats.numInsertedOrUpdatedRows === BigInt(0)) {
    return;
  }

  logger.info(
    `[Minecraft] created ${createdPlayers.numInsertedOrUpdatedRows} players and ${createdStats.numInsertedOrUpdatedRows} stats`,
  );
};
