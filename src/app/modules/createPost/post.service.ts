/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import {
  SearchItemByDateRangeQueryMaker,
  SearchItemByUserQueryMaker,
} from './post.utils';
import { PostSearchableFields, postSearchFelids } from './post.constant';

import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {

  const existingPost = await Post.findOne({ title: new RegExp(`^${payload.title}$`, 'i') });
  if (existingPost) {
    throw new Error(`${payload.title} already exists`);
  }

  const { postImages } = images;
  payload.images = postImages.map((image) => image.path);



  const result = await Post.create(payload);

  return result;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  query = (await SearchItemByUserQueryMaker(query)) || query;

  // Date range search
  query = (await SearchItemByDateRangeQueryMaker(query)) || query;

  const postQuery = new QueryBuilder(
    Post.find({ isDeleted: false }).populate('user').populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    }).set({ strictPopulate: true }),
    query,
  )
    .filter()
    .search(PostSearchableFields)
    .sort()
    // .paginate()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

// const getAllPremiumPostFromDB = async (query: Record<string, unknown>) => {
//   query = (await SearchItemByUserQueryMaker(query)) || query;

//   // Date range search
//   query = (await SearchItemByDateRangeQueryMaker(query)) || query;

//   const postQuery = new QueryBuilder(
//     Post.find({ isDeleted: false, status: "PREMIUM" }).populate('user').populate({
//       path: "comments",
//       populate: {
//         path: "user",
//         model: "User",
//       },
//     }).set({ strictPopulate: true }),
//     query,
//   )
//     .filter()
//     .search(PostSearchableFields)
//     .sort()
//     // .paginate()
//     .fields();

//   const result = await postQuery.modelQuery;

//   return result;
// };


// Get all premium posts (with optional filters)



const getAllPremiumPostsFromDB = async (
  query: Record<string, any>
): Promise<TPost[]> => {
  const postQueryBuilder = new QueryBuilder(
    Post.find({ isDeleted: false, status: "PREMIUM" })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      }),
    query
  )
    .search(postSearchFelids)
    .sort()
    .fields()
    .filter();

  const posts = await postQueryBuilder.modelQuery;

  return posts;
};

const getPostFromDB = async (itemId: string) => {
  const result = await Post.findById(itemId)
    .populate('authorId')
    .populate('category');
  return result;
};

const updatePostInDB = async (PostId: string, payload: TPost) => {
  const result = await Post.findByIdAndUpdate(PostId, payload, { new: true });
  // if (result) {
  //   await addDocumentToIndex(result, 'items');
  // } else {
  //   throw new Error(`Item with ID ${itemId} not found.`);
  // }
  return result;
};

const deletePostFromDB = async (itemId: string) => {
  const result = await Post.findByIdAndDelete(itemId);
  // const deletedItemId = result?._id;
  // if (deletedItemId) {
  //   await deleteDocumentFromIndex('items', deletedItemId.toString());
  // }
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getAllPremiumPostsFromDB,
  getPostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
