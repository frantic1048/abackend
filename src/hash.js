import crypto from 'crypto';

function sha512(input) {
  return crypto.createHash('sha512').update(input).digest('hex');
}

export default sha512;
