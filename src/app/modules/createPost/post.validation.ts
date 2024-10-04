import { z } from "zod";
import { POST_STATUS } from "./post.constant"; // Ensure POST_STATUS is correctly imported

export const PostValidation = z.object({
  body: z.object({
    user: z.string().optional(),
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(255, { message: 'Title must be less than 255 characters' })
      .trim(),
    description: z.string().min(1, { message: 'Description is required' }),
    images: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(), 
    status: z.nativeEnum(POST_STATUS, { errorMap: () => ({ message: 'Invalid status' }) })
      .default(POST_STATUS.FREE),
    reportCount: z.number().min(0).default(0), 
    upvotes: z.number().min(0).optional().default(0),
    downvotes: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false), 
  }),
});


export const UpdatePostValidation = z.object({
  body: z.object({
    user: z.string().optional(),
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(255, { message: 'Title must be less than 255 characters' })
      .trim(),
    description: z.string().min(1, { message: 'Description is required' }),
    images: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(), 
    status: z.nativeEnum(POST_STATUS, { errorMap: () => ({ message: 'Invalid status' }) })
      .default(POST_STATUS.FREE),
    reportCount: z.number().min(0).default(0), 
    upvotes: z.number().min(0).optional().default(0),
    downvotes: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false), 
  }).partial(),
});
