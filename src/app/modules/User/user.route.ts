import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserValidationSchema, updateUserValidationSchema, } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);


router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.findUserById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);


export const UserRoutes = router;
