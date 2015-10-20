import { Router } from 'express';
import hash from '../../hash';
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
 *   body:
 *   {
 *      success: true
 *   }
 * on duplicated id
 *   status: 409
 *   body:
 *   {
 *      success: false,
 *      message: <error info>
 *   }
 * on illegal userid
 *   status: 422
 *   body:
 *   {
 *      success: false,
 *      message: <error info>
 *   }
 */

function isValidUserId(reqId) {
  const rule = /\w+/;// [A-Za-z0-9_]
  return rule.test(reqId);
}

registration.post('/', (req, res) => {
  User.findOne({
    id: req.body.id,
  }, (err, user) => {
    if (!user) {
      // userid not used
      if (isValidUserId(req.body.id)) {
        // valid userid, create new user
        const newbie = new User({
          id: req.body.id,
          name: req.body.name || req.body.id,
          password: hash(`${req.body.id}${req.body.password}`),
          admin: true,
        });
        newbie.save(() => {
          logger.info(`new user ${req.body.id} saved successfully!`);
          res.status(201).json({ success: true });
        });
      } else {
        // invalid username
        logger.error('reject an invalid userid registration!');
        res.status(422).json({
          success: false,
          message: 'Registration rejected. invalid userid',
        });
      }
    } else {
      // duplicated username, reject.
      logger.error(`User ${req.body.id} duplicated ! Reject.`);
      res.status(409).json({
        success: false,
        message: 'Registration rejected. duplicated userid.',
      });
    }
  });
});

export default registration;
