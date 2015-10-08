import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from './models/user';
import config from '../abackend.conf';

const app = express();

app.get('/', (req, res) => {
  res.send('yahalo! GET!');
});

app.get('/api/', (req, res) => {
  res.send('yahalo! POST!');
});

const server = app.listen(config.serverPort, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`abackend listening at ${host}:${port}`);
});

export default server;
