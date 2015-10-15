import { Router } from 'express';
import logger from '../../logger';

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
 *   body:
 *   {
 *      success: true
 *   }
 * on authentication error
 *   status: 401
 *   body:
 *   {
 *      success: false,
 *      message: <error info>
 *   }
 */

unregistration.delete('/', (req, res) => {
  logger.info(req.body);
  res.send('you are calling unregistration!');
});

export default unregistration;