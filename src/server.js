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
mongoose.connect(config.databaseURI); // connect to database
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to console
app.use(morgan('dev'));

app.use('/api', api);

app.get('/', (req, res) => {
  res.send(`pong! The API is at http://localhost:${config.serverPort}/api`);
});

app.get('/setup', (req, res) => {
  const nico = new User({
    name: 'Nico',
    password: 'niconi',
    admin: true,
  });

  nico.save((err) => {
    if (err) throw err;

    logger.info(`User ${nico.name} saved successfully!`);
    res.json({ 0: {success: true } });
  });
});

const server = app.listen(config.serverPort, () => {
  const host = server.address().address;
  const port = server.address().port;
  logger.silly(`abackend ponpon at http://localhost:${port}`);
});

server.on('close', () => {
  // close database connection on close.
  mongoose.connection.close();
});

export default server;
