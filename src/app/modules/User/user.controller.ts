import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});


const updateUser = catchAsync(async (req, res) => {
  const userId=req.params.id
   const result = await UserServices.updateProfile(userId,req.body);
   sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message: "User update Successfully",
     data: result,
   });
 });

 // delete user
const deleteUser = catchAsync(async (req, res) => {
  const userId=req?.params?.id
  const result = await UserServices.deleteUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User delete Successfully",
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  updateUser,
  deleteUser
};
