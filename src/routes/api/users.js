import { Router } from 'express';

import notes from './notes';
import verifyToken from '../../middlewares/verifyToken';

const users = new Router();

users.get('/:user_id', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
  });
});

users.use('/:user_id/notes/*', verifyToken, notes);

export default users;
