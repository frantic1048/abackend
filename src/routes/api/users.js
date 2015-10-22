import { Router } from 'express';

import logger from '../../logger';
import { hash, verify } from '../../secure';
import User from '../../models/user';
import notes from './notes';
import verifyToken from '../../middlewares/verifyToken';

const users = new Router();

users.get('/:user_id', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
  });
});

users.patch('/:user_id', verifyToken, (req, res) => {
  // update password
  const userId = req.params.user_id;
  const oldPassword = `${userId}${req.body.password}`;
  const newPassword = `${userId}${req.body.newPassword}`;
  User.findOne({
    id: userId,
  }, (err, user) => {
    if (verify(oldPassword, user.key, user.salt)) {
      // right old password, update to the new
      const newPass = hash(newPassword);
      user.key = newPass.key;
      user.salt = newPass.salt;
      user.save(() => {
        res.status(200).json({
          success: true,
        });
      });
    } else {
      // bad old password
      res.status(401).json({
        success: false,
        message: 'Old password not Correct',
      });
    }
  });
});

users.delete('/:user_id', verifyToken, (req, res) => {
  // delete an account
  logger.info('del user');
  logger.info(req.params);
  logger.info(req.body.password);
  const userId = req.params.user_id;
  const password = `${userId}${req.body.password}`;
  User.findOne({
    id: userId,
  }, (err, user) => {
    if (verify(password, user.key, user.salt)) {
      user.remove(() => {
        res.status(204).json({
          success: true,
        });
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Wrong password',
      });
    }
  });
});

users.use('/:user_id/notes/', verifyToken, notes);

export default users;
