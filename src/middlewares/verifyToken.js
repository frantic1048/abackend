import jwt from 'jsonwebtoken';

import logger from '../logger';
import { secret } from '../../abackend.conf';

// middleware for protected APIs

function verifyToken(req, res, next) {
  logger.info('=======> verifyToken');
  // checkout token from request parameters/header/body.
  logger.info(req.headers);
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  logger.info('=======> token:' + token);
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err) {
        // everything is good
        req.decoded = decoded;
        logger.info(`decoded token:${decoded}`);
        next();
      } else {
        logger.error('Failed to authenticate token.');
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.',
    });
  }
}

export default verifyToken;
