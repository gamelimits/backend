import { ErrorHandler } from 'hono';
import { logger } from '../../logger/logger.js';
import { ValidationError } from '../../../common/errors/validation.error.js';
import { UnauthorizedError } from '../../../common/errors/unauthorized.error.js';

export const errorHandler: ErrorHandler = (error, ctx) => {
  if (error instanceof UnauthorizedError) {
    return ctx.json({ error: 'unauthorized' }, 401);
  }

  if (error instanceof ValidationError) {
    return ctx.json({ error: 'validation', validation: error.errors.issues }, 400);
  }

  logger.error(error.stack);
  return ctx.json({ error: 'server' }, 500);
};
