const express = require('express');
const config = require('config');
const cors = require('cors');
const status = require('http-status');
const morgan = require('./utils/morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const AppError = require('./utils/AppError');

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
app.get('/', (req, res) => {
  res.send('Hello world!!');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new AppError('Not Found', status.NOT_FOUND));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
