import { z } from 'zod';

export const createVerifyValidation = z.object({
  body: z.object({
    USER: z.string().optional()
  })
});

export const VerifyValidations = {
  createVerifyValidation
};
