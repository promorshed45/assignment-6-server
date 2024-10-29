import mongoose, { Schema } from "mongoose";
import { TPost } from "./post.interface";
import { POST_STATUS } from "./post.constant";


const postSchema = new Schema<TPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: { type: [String], default: []},
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    upvote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    status: { type: String, enum: [POST_STATUS.FREE, POST_STATUS.PREMIUM] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const Post = mongoose.model<TPost>("Post", postSchema);
