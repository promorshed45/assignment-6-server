import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FollowServices } from './follow.service';



const createFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.createFollowUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Followed successfully',
    data: result,
  });
});

const getAllFollow = catchAsync(async (req, res) => {
    const result = await FollowServices.getAllFollow();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users Retrieved Successfully',
      data: result,
    });
  });


//   get follow with filter
const getAllFollowFilter = catchAsync(async (req, res) => {
    const followerId = req.query.followerId as string | undefined; 
    const followingId = req.query.followingId as string | undefined; 
  
    const result = await FollowServices.getAllFollowFilter({ followerId, followingId });
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users Retrieved Successfully',
      data: result,
    });
  });
  

// Unfollow the user
const unfollowUser = catchAsync(async (req, res) => {
  const followerId = req.query.followerId as string; 
  const followingId = req.query.followingId as string; 

  // Call the service to unfollow the user
  const result = await FollowServices.unfollowUser({ followerId, followingId });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Unfollowed Successfully',
    data: result,
  });
});

  

export const FollowController = {
  createFollow,
  unfollowUser,
  getAllFollow,
  getAllFollowFilter
};
