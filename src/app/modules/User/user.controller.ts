import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});

const findUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.findUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});



const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});



export const UserController = {
  createUser,
  findUserById,
  updateUserById,
};
