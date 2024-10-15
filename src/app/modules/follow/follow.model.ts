import mongoose, { Schema } from "mongoose";
import { TFollow } from "./follow.interface";


const followSchema = new Schema<TFollow>(
  {
    followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Follow","Unfollow"], default: "Follow" }
  },
  { timestamps: true }
);



export const Follow = mongoose.model<TFollow>("Follow", followSchema);
