import { Handler } from 'hono';
import { updateStatsUseCase } from '../../use-cases/update-stats.use-case.js';
import { PlayerStat } from '../../interfaces/player-stat.js';
import { PlayerAdvancement } from '../../interfaces/player-advancement.js';

export const updateStatsHandler: Handler = async (ctx) => {
  const seasonId = ctx.req.param('seasonId');
  const body = await ctx.req.json<{
    readonly players: string[];
    readonly stats: PlayerStat[];
    readonly advancements: PlayerAdvancement[];
  }>();

  await updateStatsUseCase({
    seasonId,
    players: body.players,
    stats: body.stats,
    advancements: body.advancements,
  });

  return ctx.json({ success: true }, 200);
};
