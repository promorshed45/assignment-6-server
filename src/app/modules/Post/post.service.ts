/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import { addDocumentToIndex } from '../../utils/meilisearch';
import { PostSearchableFields } from './post.constant';
import { TPost } from './post.interface';
import { Post } from './post.model';
import { SearchItemByDateRangeQueryMaker, SearchItemByUserQueryMaker } from './post.utils';



const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {

  const existingPost = await Post.findOne({ title: new RegExp(`^${payload.title}$`, 'i') });
  if (existingPost) {
    throw new Error(`${payload.title} already exists`);
  }

  const { postImages } = images;
  payload.images = postImages.map((image) => image.path);



  const result = await Post.create(payload);
  await addDocumentToIndex(result, "posts")

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


const getPostFromDB = async (postId: string) => {
  const result = await Post.findById(postId)
    .populate('user')
    // .populate('category');
  return result;
};


const updatePost = async  (userId:string , payload: any) => {
  const result = await Post.updateOne({_id: userId}, payload, {
    new: true,
  });
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
  getPostFromDB,
  updatePost,
  deletePostFromDB,
  // updatepost
};
