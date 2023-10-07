import { MiddlewareHandler } from 'hono';
import { environment } from '../../../infrastructure/config/environment.js';
import { UnauthorizedError } from '../../../common/errors/unauthorized.error.js';

export const aipAuthMiddleware: MiddlewareHandler = (ctx, next) => {
  const xApiKey = ctx.req.header('x-api-key');

  if (!xApiKey || xApiKey !== environment.MINECRAFT_UPDATE_STATS_API_KEY) {
    throw new UnauthorizedError();
  }

  return next();
};
