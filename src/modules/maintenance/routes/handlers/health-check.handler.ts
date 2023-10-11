import { Handler } from 'hono';

export const healthCheckHandler: Handler = (ctx) => ctx.json({ health: 'healthy' });
