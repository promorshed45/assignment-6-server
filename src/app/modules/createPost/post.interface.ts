import { Document, Types } from "mongoose";
import { POST_STATUS } from "./post.constant";

export interface TPost extends Document {
  user: Types.ObjectId; 
  images?: string[];
  title: string;
  description: string;
  comments?: Types.ObjectId[];
  status: TPostStatus;
  report?: Types.ObjectId[];
  reportCount: number;
  Upvotes: Types.ObjectId;
  downvotes: Types.ObjectId;
  isDeleted: boolean;
}

export interface TReport {
  user: Types.ObjectId;
  post: Types.ObjectId;
  report: string;
}

export type TPostStatus = keyof typeof POST_STATUS;
