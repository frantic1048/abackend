import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken';

const users = new Router();

// use middle to force token authentication.
users.use(verifyToken);

users.get('/*', (req, res) => {
  res.status(200).json({
    success: true,
  });
});

export default users;
