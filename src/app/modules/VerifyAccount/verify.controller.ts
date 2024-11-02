import { VerifyService } from './verify.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const verifyAccount = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await VerifyService.createVerifyUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Verify successful",
    data: result,
  });
});
 


const getAllPayments = catchAsync(async (req, res) => {
  const postData = await VerifyService.getAllPayemnt(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieved successfully',
    data: postData,
  });
});

export const VerifyController = {
  verifyAccount,
  getAllPayments
};
