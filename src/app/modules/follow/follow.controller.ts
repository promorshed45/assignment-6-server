import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FollowServices } from './follow.service';



const createFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.createFollowUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Following',
    data: result,
  });
});

const getAllFollow = catchAsync(async (req, res) => {
    const result = await FollowServices.getAllFollow();
    console.log(result);
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
  
  

export const FollowController = {
  createFollow,
  getAllFollow,
  getAllFollowFilter
};
