import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { CommentControllers } from './comment.controller';
import { CommentValidation, EditCommentValidation } from './comment.validation';

const router = express.Router();

router.post(
  '/',
  auth("USER","ADMIN"),
  validateRequest(CommentValidation),
  CommentControllers.createComment,
);

router.get('/:id', CommentControllers.getComment);

router.put(
  '/:id',
  auth("USER","ADMIN"),
  validateRequest(EditCommentValidation),
  CommentControllers.updateComment,
);

router.delete('/:id', auth(USER_ROLE.USER), CommentControllers.deleteComment);

export const CommentRoutes = router;
