import { Router } from 'express';

import authenticate from './authenticate';
import users from './users';

const api = new Router();

api.use('/authenticate', authenticate);
api.use('/users', users);

api.get('/', (req, res) => {
  res.send('pong! this is /api/');
});

export default api;
