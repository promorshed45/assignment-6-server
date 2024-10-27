import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { PostRoutes } from '../modules/Post/post.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { FollowRoute } from '../modules/follow/follow.route';
import { MeilisearchRoute } from '../modules/Meilisearch/meilisearch.routes';

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
    path: '/search-posts',
    route: MeilisearchRoute,
},
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
