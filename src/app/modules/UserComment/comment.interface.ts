import { Types } from 'mongoose';

export type TComment = {
  postId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  parentId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
};
