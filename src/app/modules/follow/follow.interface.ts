import { Types } from "mongoose";
import { FOLLOW_STATUS } from "./follow.constant";

export type TFollow = {
    followingId: Types.ObjectId; 
    followerId: Types.ObjectId;
    status: keyof typeof FOLLOW_STATUS;
};
