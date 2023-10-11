import { Hono } from 'hono';
import { healthCheckHandler } from './handlers/health-check.handler.js';

const router = new Hono();

router.get('/api/v1/maintenance/health-check', healthCheckHandler);

export { router };
