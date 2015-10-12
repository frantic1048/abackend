import { Router } from 'express';
import logger from '../../logger';
import User from '../../models/user';

const unregistration = new Router();

/* Method:
 *   DELETE /api/users/<username>
 *
 * Request
 *   body:
 *   {
 *      name: <username> as String,
 *      password: <password> as String,
 *      token: <access token>
 *   }
 *
 * Response:
 * on Success
 *   status: 204
 *   body.args:
 *   {
 *      success: true
 *   }
 * on authentication error
 *   status: 401
 *   body.args:
 *   {
 *      success: false,
 *      message: <error info>
 *   }
 */

unregistration.delete('/', (req, res) => {
  logger.info(req.body);
});

export default unregistration;
