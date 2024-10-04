import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import {
  PostValidation,
  UpdatePostValidation,
} from './post.validation';
import { PostControllers } from './post.controller';
import { parseBody } from '../../middlewares/bodyParser';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/',
  auth("USER", "ADMIN"),
  multerUpload.fields([{ name: 'postImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(PostValidation),
  PostControllers.createPost,
);

router.get('/', PostControllers.getAllPost);

router.get('/:id', PostControllers.getPost);

router.get(
  "/premium",
  auth("USER","ADMIN"),
  PostControllers.getAllPremiumPosts
);

router.put(
  '/:id',
  auth("USER"),
  validateRequest(UpdatePostValidation),
  PostControllers.updatePost,
);

router.delete('/:id', auth(USER_ROLE.USER), PostControllers.deletePost);

export const PostRoutes = router;
