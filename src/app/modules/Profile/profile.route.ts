import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';


const router = express.Router();

router.get(
  '/',
  auth("USER","ADMIN"),
  ProfileController.getMyProfile,
);

router.patch(
  '/',
  auth("USER","ADMIN"),
  multerUpload.single('profilePhoto'),
  parseBody,
  ProfileController.updateMyProfile,
);

export const ProfileRoutes = router;
