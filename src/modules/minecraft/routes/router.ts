import { Hono } from 'hono';
import { updateStatsHandler } from './handlers/update-stats.handler.js';
import { aipAuthMiddleware } from '../middlewares/api-auth.middleware.js';

const router = new Hono();

router.post('/api/v1/minecraft/update-stats/:seasonId', aipAuthMiddleware, updateStatsHandler);

export { router };
