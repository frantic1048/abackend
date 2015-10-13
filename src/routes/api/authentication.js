import { Router } from 'express';
import jwt from 'jsonwebtoken';

import logger from '../../logger';
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
 *   body.args:
 *   {
 *      success: true,
 *      token: <access token>
 *   }
 * on failed
 *   status: 401
 *   body.args:{
 *     success: false,
 *     message: <error info>
 *   }
 *
 */

authenticate.post('/', (req, res) => {
  User.findOne({
    name: req.body.name,
  }, (err, user) => {
    if (!user) {
      logger.error(`Authentication failed. User ${req.body.name} does not exist.`);
      res.status(401).json({ args: {
        success: false,
        message: `Authentication failed. User ${req.body.name} does not exist.`,
      }});
    } else if (user) {
      // user exist
      if (user.password !== req.body.password) {
        // wrong password
        logger.error(`Authentication failed. Wrong password.`);
        res.status(401).json({ args: {
          success: false,
          message: `Authentication failed. Wrong password.`,
        }});
      } else {
        // right password
        logger.info(`Authentication success for user ${user.name}`);
        const token = jwt.sign(user, secret, {
          expiresIn: 1440 * 60, // expires in 24 hours
        });
        res.status(200).json({ args: {
          success: true,
          message: "Here's your token!",
          token: token,
        }});
      }
    }
  });
});

export default authenticate;
