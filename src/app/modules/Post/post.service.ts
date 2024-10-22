/* eslint-disable @typescript-eslint/no-explicit-any */
import puppeteer from 'puppeteer';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interface/image.interface';
import { addDocumentToIndex } from '../../utils/meilisearch';
import { PostSearchableFields } from './post.constant';
import { TPost } from './post.interface';
import { Post } from './post.model';
import {
  SearchItemByDateRangeQueryMaker,
  SearchItemByUserQueryMaker,
} from './post.utils';
import { PDFDocument, rgb } from 'pdf-lib';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
  const existingPost = await Post.findOne({
    title: new RegExp(`^${payload.title}$`, 'i'),
  });
  if (existingPost) {
    throw new Error(`${payload.title} already exists`);
  }

  const { postImages } = images;
  payload.images = postImages.map((image) => image.path);

  const result = await Post.create(payload);
  await addDocumentToIndex(result, 'posts');

  return result;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  query = (await SearchItemByUserQueryMaker(query)) || query;

  // Date range search
  query = (await SearchItemByDateRangeQueryMaker(query)) || query;

  const postQuery = new QueryBuilder(
    Post.find({ isDeleted: false })
      .populate('user')
      .set({ strictPopulate: true }),
    query,
  )
    .filter()
    .search(PostSearchableFields)
    .sort()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const getPostFromDB = async (postId: string) => {
  const result = await Post.findById(postId).populate('user');
  return result;
};

const updatePost = async (id: string, payload: Partial<TPost>) => {
  const post = await Post.findByIdAndUpdate(id, payload, { new: true });

  return post;
};

const deletePostFromDB = async (itemId: string) => {
  const result = await Post.findByIdAndDelete(itemId);
  // const deletedItemId = result?._id;
  // if (deletedItemId) {
  //   await deleteDocumentFromIndex('items', deletedItemId.toString());
  // }
  return result;
};

const generatePdfPost = async (post) => {
  const browser = await puppeteer.launch();  // Ensure Puppeteer is properly configured
  const page = await browser.newPage();

  const htmlContent = `
  <html>
    <head>
      <title>${post.title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        p { margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>${post.title}</h1>
      <p>${post.description}</p>
      <h2>Comments:</h2>
      <!-- Include comments if available -->
    </body>
  </html>
  `;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 });
  await browser.close();

  return pdfBuffer;
};


const createPdfPost = async (post) => {
  console.log('Received post data:', post);

  const doc = await PDFDocument.create();
  const page = doc.addPage();
  page.drawText(post.title, { x: 50, y: 750 });
  page.drawText(post.description, { x: 50, y: 700 });
  return await doc.save();
};


export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getPostFromDB,
  updatePost,
  deletePostFromDB,
  generatePdfPost,
  createPdfPost,
};
