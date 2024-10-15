import { Document, Types } from "mongoose";
import { POST_STATUS } from "./post.constant";

export interface TPost extends Document {
  user: Types.ObjectId; 
  images?: string[];
  title: string;
  description: string;
  category: string;
  status: TPostStatus;
  isDeleted: boolean;
}

export interface TReport {
  user: Types.ObjectId;
  post: Types.ObjectId;
  report: string;
}

export type TPostStatus = keyof typeof POST_STATUS;
