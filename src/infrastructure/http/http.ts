import { Hono } from 'hono';
import { errorHandler } from './handlers/error.handler.js';
import { notFoundHandler } from './handlers/not-found.handler.js';
import { secureHeadersMiddleware } from './middlewares/secure-headers.middleware.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';

const http = new Hono();

http.use('*', corsMiddleware);
http.use('*', secureHeadersMiddleware);

http.onError(errorHandler);
http.notFound(notFoundHandler);

export { http };
