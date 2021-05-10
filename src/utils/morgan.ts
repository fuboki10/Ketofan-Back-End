import morgan from 'morgan';
import { Response } from 'express';
// eslint-disable-next-line import/extensions
import logger from './logger';
// eslint-disable-next-line import/order
import config = require('config');
// eslint-disable-next-line import/extensions

const nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV');
morgan.token('message', (_, res : Response) => res.locals.errorMessage || '');

const getIpFormat = () => (nodeEnv === 'production' ? ':remote-addr - :remote-user [:date[clf]]' : '');
// eslint-disable-next-line max-len
const successResponseFormat = `${getIpFormat()} :method :url HTTP/:http-version" :status :res[content-length] :response-time ms`;
// eslint-disable-next-line max-len
const errorResponseFormat = `${getIpFormat()} :method :url HTTP/:http-version" :status :res[content-length] :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_, res : Response) => res.statusCode >= 400,
  stream: { write: (message : string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_, res : Response) => res.statusCode < 400,
  stream: { write: (message : string) => logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
