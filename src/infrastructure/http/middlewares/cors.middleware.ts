import { cors } from 'hono/cors';
import { environment } from '../../config/environment.js';

export const corsMiddleware = cors({
  origin: environment.HTTP_CORS,
  credentials: true,
});
