const express = require('express');
const config = require('config');
const cors = require('cors');
const morgan = require('./utils/morgan');

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
app.get('/', (_, res) => {
  res.send('Hello world!!');
});

// send back a 404 error for any unknown api request
app.use((_, res) => {
  res.status(404).json('Not found');
});

module.exports = app;
