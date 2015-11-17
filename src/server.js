import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import logger from './logger';
import api from './routes/api/root';

import config from '../abackend.conf';

const app = express();  // app instance

// connect to database
mongoose.connect(config.databaseURI, () => {
  if (config.dev) {
    // drop database on dev mode
    mongoose.connection.db.dropDatabase();
  }
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to console
app.use(morgan('dev'));

app.use('/api', api);

const server = app.listen(config.serverPort, () => {
  logger.silly(`abackend API ponpon at http://localhost:${server.address().port}/api/`);
});

server.on('close', () => {
  // close database connection on close.
  mongoose.connection.close();
});

export default server;
