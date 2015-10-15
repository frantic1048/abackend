import jwt from 'jsonwebtoken';

import logger from '../logger';
import { secret } from '../../abackend.conf';

// middleware for protected APIs

function verifyToken(req, res, next) {
  // checkout token from request parameters/header/body.
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err) {
        // everything is good
        req.decoded = decoded;
        logger.info(`Successfully authenticated token`);
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
