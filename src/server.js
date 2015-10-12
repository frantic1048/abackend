import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import logger from './logger';
import api from './routes/api/root';

import User from './models/user';
import config from '../abackend.conf';

const app = express();  // app instance

// connect to database
mongoose.connect(config.databaseURI, () => {
  if (config.dev) {
    // drop database on dev mode
    mongoose.connection.db.dropDatabase();
  }
});
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to console
app.use(morgan('dev'));

app.use('/api', api);

app.get('/', (req, res) => {
  res.send(`pong! The API is at http://localhost:${config.serverPort}/api`);
});

const server = app.listen(config.serverPort, () => {
  logger.silly(`abackend ponpon at http://localhost:${server.address().port}`);
});

server.on('close', () => {
  // close database connection on close.
  mongoose.connection.close();
});

export default server;
