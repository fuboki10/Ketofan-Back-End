const config = require('config');
const app = require('./app');
const logger = require('./utils/logger');
const db = require('../db/db');

const port = process.env.PORT || config.get('PORT') || 3000;

// start server
const server = app.listen(port, () => logger.info(`app listening on port ${port}`));

// server exit handler
const exitHandler = async () => {
  if (db) {
    await db.destroy();
  }

  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// signals listeners
const unexpectedErrorHandler = (error) => {
  logger.info(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  exitHandler();
});
