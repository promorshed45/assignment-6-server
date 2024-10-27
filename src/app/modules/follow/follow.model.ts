import mongoose, { Schema } from "mongoose";
import { TFollow } from "./follow.interface";


const followSchema = new Schema<TFollow>(
  {
    followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);



export const Follow = mongoose.model<TFollow>("Follow", followSchema);
