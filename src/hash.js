import crypto from 'crypto';
import { magic as salt } from '../abackend.conf';

function sha512(input) {
  return crypto.createHash('sha512').update(input).update(salt).digest('hex');
}

export default sha512;
