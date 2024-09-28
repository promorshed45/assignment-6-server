import { z } from 'zod';
import { USER_ROLE } from './user.constant';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    address: z.string().optional(),
    mobileNumber: z.number().optional()
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(), // Updated to match schema
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(), // Updated to match schema
    address: z.string().optional(),
    mobileNumber: z.number().optional(), // Updated to match schema
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};