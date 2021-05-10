/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from './utils/morgan';
import { errorConverter, errorHandler } from './middlewares/error';
import AppError from './utils/AppError';
import routesV1 from './routes/v1';

// eslint-disable-next-line import/order
import config = require('config');

const app = express();

const nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';

// logger format

if (nodeEnv !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// enable cors
const corsOptions = {
  exposedHeaders: ['x-auth-token', 'auth-token'],
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

// root page
app.get('/', (req : express.Request, res: express.Response) => {
  res.send('Hello world!!');
});

// v1 API routes
app.use('/api/v1', routesV1);

// send back a 404 error for any unknown api request
app.use((req : express.Request, res: express.Response, next : express.NextFunction) => {
  next(new AppError('Not Found', status.NOT_FOUND));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
