import * as winston from 'winston';
import config = require('config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const transports = [
  new winston.transports.Console({
    stderrLevels: ['error'],
  }),
];

const nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';

const logger = winston.createLogger({
  level: nodeEnv === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    nodeEnv === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports,
});

export default logger;
