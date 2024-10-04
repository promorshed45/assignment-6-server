import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import { PostServices } from './post.service';
import catchAsync from '../../utils/catchAsync';
import { TImageFiles } from '../../interface/image.interface';

const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }
  const post = await PostServices.createPostIntoDB(
    req.body,
    req.files as TImageFiles,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
    data: post,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const postData = await PostServices.getAllPostFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieved successfully',
    data: postData,
  });
});


// const getAllPremiumPosts = catchAsync(async (req, res) => {
//   const postData = await PostServices.getAllPremiumPostFromDB(req.query);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Premium Post retrieved successfully',
//     data: postData,
//   });
// });


// Get all  premium posts
const getAllPremiumPosts = catchAsync(async (req, res) => {
  const posts = await PostServices.getAllPremiumPostsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Premium posts retrieved successfully",
    data: posts,
  });
});



const getPost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const postData = await PostServices.getPostFromDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieved successfully',
    data: postData,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedPost = await PostServices.updatePostInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successfully',
    data: updatedPost,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  await PostServices.deletePostFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post deleted successfully',
    data: null,
  });
});

export const PostControllers = {
  createPost,
  getAllPost,
  getAllPremiumPosts,
  getPost,
  updatePost,
  deletePost,
};
