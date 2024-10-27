import { Types } from "mongoose";

export type TFollow = {
    followingId: Types.ObjectId; 
    followerId: Types.ObjectId;
};
