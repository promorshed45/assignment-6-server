import express from 'express';
import auth from '../../middlewares/auth';
import { FollowController } from './follow.controller';


const router = express.Router();

router.post(
  '/',
  auth("USER","ADMIN"),
  FollowController.createFollow,
);

router.get(
  '/',
  // auth("USER","ADMIN"),
  FollowController.getAllFollow,
);

router.delete(
  '/',
  // auth("USER","ADMIN"),
  FollowController.unfollowUser,
);



export const FollowRoute = router;
