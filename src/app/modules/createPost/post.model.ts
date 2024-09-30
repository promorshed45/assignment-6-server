import mongoose, { Schema } from 'mongoose';
import { TPost } from './post.interface';
import { POST_CATEGORY, POST_STATUS } from './post.constant';

// Define the schema for the post
const PostSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  images: { type: [String], default: []},
  city: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String, enum: Object.values(POST_STATUS),
    default: POST_STATUS.ACTIVE, required: true
  },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: Object.values(POST_CATEGORY), required: true },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 }
},
  { timestamps: true });


const Post = mongoose.model<TPost>('Post', PostSchema);

export default Post;
