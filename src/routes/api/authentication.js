import { Router } from 'express';

const authenticate = new Router();

authenticate.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
  res.send('pong! this is /api/authenticate');
});

export default authenticate;
