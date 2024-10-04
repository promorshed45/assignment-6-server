import mongoose, { Schema } from "mongoose";
import { TPost } from "./post.interface";
import { POST_STATUS } from "./post.constant";

const reportSchema = new Schema(
  {
    report: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

const postSchema = new Schema<TPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: { type: [String], default: []},
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    status: { type: String, enum: [POST_STATUS.FREE, POST_STATUS.PREMIUM] },
    report: [reportSchema],
    reportCount: { type: Number, default: 0 },
    Upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Post = mongoose.model<TPost>("Post", postSchema);
