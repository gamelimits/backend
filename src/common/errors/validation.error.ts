import { z } from 'zod';

export class ValidationError extends Error {
  constructor(readonly errors: z.ZodError) {
    super();
  }
}
