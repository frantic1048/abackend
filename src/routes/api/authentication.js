import { Router } from 'express';
import jwt from 'jsonwebtoken';

import logger from '../../logger';
import { verify } from '../../secure';
import User from '../../models/user';
import { secret } from '../../../abackend.conf';

const authenticate = new Router();

/* Method:
 *   POST /api/authentication
 *
 * Request
 *   body:
 *   {
 *      name: <username> as String,
 *      password: <password> as String
 *   }
 *
 * Response:
 * on Success
 *   status: 200
 *   body:
 *   {
 *      success: true,
 *      id: <userid>,
 *      name: <username>,
 *      token: <access token>
 *   }
 * on failed
 *   status: 401
 *   body:{
 *     success: false,
 *     message: <error info>
 *   }
 *
 */

authenticate.post('/', (req, res) => {
  User.findOne({
    id: req.body.id,
  }, (err, user) => {
    if (!user) {
      logger.error(`Authentication failed. User ${req.body.id} does not exist.`);
      res.status(401).json({
        success: false,
        message: `Authentication failed. User ${req.body.id} does not exist.`,
      });
    } else if (user) {
      // user exist
      if (!verify(`${req.body.id}${req.body.password}`, user.key, user.salt)) {
        // wrong password
        logger.error(`Authentication failed. Wrong password.`);
        res.status(401).json({
          success: false,
          message: `Authentication failed. Wrong password.`,
        });
      } else {
        // right password
        logger.info(`Authentication success for user ${user.id}`);
        const token = jwt.sign(user, secret, {
          expiresIn: 1440 * 60, // expires in 24 hours
        });
        res.status(200).json({
          success: true,
          message: "Here's your token!",
          id: user.id,
          name: user.name,
          token: token,
        });
      }
    }
  });
});

export default authenticate;
