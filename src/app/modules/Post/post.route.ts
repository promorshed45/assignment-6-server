import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { PostControllers } from './post.controller';
import { parseBody } from '../../middlewares/bodyParser';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { multerUpload } from '../../config/multer.config';
import { PostValidation } from './post.validation';

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


// router.patch(
//   '/:id',
//   auth("USER", "ADMIN"),
//   validateRequest(UpdatePostValidation),
//   PostControllers.updatePost
// );

router.patch('/:id', 
  // multerUpload.fields([{ name: 'postImages' }]),
  // auth('ADMIN',"USER"),
  PostControllers.updatePost);



router.delete('/:id', auth("USER","ADMIN"), PostControllers.deletePost);

router.post('/generate-pdf', PostControllers.generatePdf);
router.post('/create-pdf', PostControllers.createPdfPost);

export const PostRoutes = router;
