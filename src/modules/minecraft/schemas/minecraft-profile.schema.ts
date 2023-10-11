import { z } from 'zod';

export const minecraftProfileSchema = z.object({
  name: z.string(),
});

export type MinecraftProfileSchema = z.infer<typeof minecraftProfileSchema>;
