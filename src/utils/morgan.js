const morgan = require('morgan');
const config = require('config');
const logger = require('./logger');

const nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV');
morgan.token('message', (_, res) => res.locals.errorMessage || '');

const getIpFormat = () => (nodeEnv === 'production' ? ':remote-addr - :remote-user [:date[clf]]' : '');
// eslint-disable-next-line max-len
const successResponseFormat = `${getIpFormat()} :method :url HTTP/:http-version" :status :res[content-length] :response-time ms`;
// eslint-disable-next-line max-len
const errorResponseFormat = `${getIpFormat()} :method :url HTTP/:http-version" :status :res[content-length] :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
