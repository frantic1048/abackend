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
        // valid token
        req.decoded = decoded;
        logger.info(`valid token decoded`);
        const reqName = req.url.split('/')[1];
        if (reqName === decoded.name) {
          // valid token right path
          next();
        } else {
          // right user accessing wrong path
          logger.error('token consistency check failed');
          return res.status(403).json({
            success: false,
            message: 'Token consistency check failed.',
          });
        }
      } else {
        // invalid token
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
