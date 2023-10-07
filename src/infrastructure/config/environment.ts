import 'dotenv/config';
import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  // Http
  HTTP_PORT: z.coerce.number().int().positive().default(3000),
  HTTP_CORS: z.string().transform((arg) => arg.split(',')),

  // Database
  DATABASE_URL: z.string().startsWith('postgresql://'),

  // Module minecraft
  MINECRAFT_UPDATE_STATS_API_KEY: z.string(),
});

type EnvironmentSchema = z.infer<typeof environmentSchema>;

export const environment: EnvironmentSchema = {
  ...environmentSchema.parse(process.env),
} as const;
