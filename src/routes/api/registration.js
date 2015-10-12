import { Router } from 'express';
import logger from '../../logger';
import User from '../../models/user';

const registration = new Router();

/* Method:
 *   POST /api/registration
 *
 * Request
 *   body:
 *   {
 *      name: <username> as String,
 *      password: <password> as String,
 *   }
 *
 * Response:
 * on Success
 *   status: 201
 *   body.args:
 *   {
 *      success: true
 *   }
 * on duplicated username
 *   status: 409
 *   body.args:
 *   {
 *      success: false,
 *      message: <error info>
 *   }
 */

registration.post('/', (req, res) => {
  logger.info(req.body);

  User.findOne({
    name: req.body.name,
  }, (err, user) => {
    if (!user) {
      // username not used, create new user
      const newbie = new User({
        name: req.body.name,
        password: req.body.password,
        admin: true,
      });
      newbie.save(() => {
        logger.info(`new User ${req.body.name} saved successfully!`);
        res.status(201).json({ args: { success: true }});
      });
    } else {
      // duplicated username, reject.
      logger.error(`User ${req.body.name} duplicated ! Reject.`);
      res.status(409).json({ args: {
        success: false,
        message: 'Registration rejected. duplicated username.',
      }});
    }
  });
});

export default registration;
