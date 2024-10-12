import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { PostRoutes } from '../modules/Post/post.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { paymentRouter } from '../utils/payment/paymant.router';
import { verifyUserRoutes } from '../modules/Verify/verify.router';
import { FollowRoute } from '../modules/follow/follow.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/following',
    route: FollowRoute,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
   {
    path: '/verifyAccount',
    route: verifyUserRoutes,
  },
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
