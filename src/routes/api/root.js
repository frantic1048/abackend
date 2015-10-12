import { Router } from 'express';

import registration from './registration';
import authentication from './authentication';
import users from './users';

const api = new Router();

api.use('/registration', registration);
api.use('/authentication', authentication);
api.use('/users', users);

api.get('/', (req, res) => {
  res.send('pong! this is /api/');
});

export default api;
