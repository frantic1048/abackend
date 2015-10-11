import { Router } from 'express';

const authenticate = new Router();

authenticate.get('/', (req, res) => {
  res.send('pong! this is /api/authenticate');
});

export default authenticate;
