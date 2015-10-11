import { Router } from 'express';

const users = new Router();

users.get('/', (req, res) => {
  res.send('pong! this is api/users');
});

export default users;
