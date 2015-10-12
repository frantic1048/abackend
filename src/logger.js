import { transports, Logger } from 'winston';
import { logLevel } from '../abackend.conf.js';

const logLevels = {
  transports: [
    new transports.Console({
      level: logLevel || 'info',
      colorize: true,
    }),
  ],
  levels: {
    silly: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  colors: {
    silly: 'grey',
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

const logger = new Logger(logLevels);

export default logger;
