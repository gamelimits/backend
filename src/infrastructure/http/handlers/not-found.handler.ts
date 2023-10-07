import { NotFoundHandler } from 'hono';

export const notFoundHandler: NotFoundHandler = (ctx) => ctx.json({ error: 'not-found' }, 404);
