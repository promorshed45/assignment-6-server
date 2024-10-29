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
 




export const VerifyController = {
  verifyAccount
};
