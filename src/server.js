const config = require('config');
const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT || config.get('PORT') || 3000;

const server = app.listen(port, () => logger.info(`app listening on port ${port}`));

const db = require('../db/db');

db.select().then(console.log);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

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
