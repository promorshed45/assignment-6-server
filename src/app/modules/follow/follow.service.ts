/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFollow } from "./follow.interface";
import { Follow } from "./follow.model";


const createFollowUser = async (payload: TFollow) => {
    const result = await Follow.create(payload);
  
    return result;
  };

  const getAllFollow = async () => {
    const result = await Follow.find().populate('followingId').populate('followerId');; 
    return result;
  };


  const getAllFollowFilter = async (filter: { followerId?: string; followingId?: string }) => {
    const result = await Follow.find(filter);
    return result;
  };


  const unfollowUser = async ({ followerId, followingId }: any) => {
    const result = await Follow.findOneAndDelete({ followerId, followingId });
    
    return result;
  };

export const FollowServices = {
    createFollowUser,
    unfollowUser,
    getAllFollow,
    getAllFollowFilter
}