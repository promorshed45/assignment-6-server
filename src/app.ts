/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import meiliClient from './app/utils/meilisearch';
const app: Application = express();

//parsers
app.use(express.json());

app.use(cors({origin: '*', credentials: true}));
app.use(cookieParser())

// application routes
app.use('/api', router);

//!This is only for development perpose
//!Don't uncomment this if oyou are not sure what you are doing...
// meiliClient.index("posts").deleteAllDocuments();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Travel Trove API Service',
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
