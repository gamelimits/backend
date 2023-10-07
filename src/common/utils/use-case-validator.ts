import { z } from 'zod';
import { ValidationError } from '../errors/validation.error.js';

export const useCaseValidator = <T extends z.ZodType>(schema: T, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.data as ReturnType<T['parse']>;
};
