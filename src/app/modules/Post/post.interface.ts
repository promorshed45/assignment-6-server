import { Document, Types } from "mongoose";
import { POST_STATUS } from "./post.constant";

export interface TPost extends Document {
  user: Types.ObjectId; 
  images?: string[];
  title: string;
  description: string;
  category: string;
  upvote: number;
  downVote: number;
  status: TPostStatus;
  isDeleted: boolean;
}


export type TPostStatus = keyof typeof POST_STATUS;
