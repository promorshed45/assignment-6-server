import { z } from 'zod';
import { POST_CATEGORY, POST_STATUS } from './post.constant';

export const PostValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(255, { message: 'Title must be less than 255 characters' })
      .trim(),
    description: z.string().min(1, { message: 'Description is required' }),
    images: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    location: z.string().min(1, { message: 'Location is required' }),
    status: z.nativeEnum(POST_STATUS).default(POST_STATUS.ACTIVE),
    authorId: z.string().optional(),
    category: z.nativeEnum(POST_CATEGORY, {
      errorMap: () => ({ message: 'Invalid category' }),
    }),
    upvote: z.number().min(0).optional().default(0),
    downvote: z.number().min(0).optional().default(0),
  }),
});

export const UpdatePostValidation = z.object({
  body: z
    .object({
      title: z
        .string()
        .min(1, { message: 'Title is required' })
        .max(255, { message: 'Title must be less than 255 characters' })
        .trim()
        .optional(),
      description: z
        .string()
        .min(1, { message: 'Description is required' })
        .optional(),
      images: z
        .array(z.string())
        .nonempty({ message: 'At least one image is required' })
        .optional(),
      city: z.string().min(1, { message: 'City is required' }).optional(),
      location: z
        .string()
        .min(1, { message: 'Location is required' })
        .optional(),
      status: z.nativeEnum(POST_STATUS).optional(),
      authorId: z
        .string()
        .min(1, { message: 'Author ID is required' })
        .optional(),
      category: z
        .nativeEnum(POST_CATEGORY, {
          errorMap: () => ({ message: 'Invalid category' }),
        })
        .optional(),
      upvote: z.number().min(0).optional(),
      downvote: z.number().min(0).optional(),
    })
    .partial(),
});
