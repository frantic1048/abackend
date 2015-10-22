import { randomBytes, pbkdf2Sync } from 'crypto';

function verify(password, originalKey, salt) {
  // check if password match the original one
  const key = pbkdf2Sync(password, salt, 4096, 512, 'sha512').toString('hex');
  return key === originalKey;
}

function hash(password) {
  const salt = randomBytes(64).toString('hex');
  const key = pbkdf2Sync(password, salt, 4096, 512, 'sha512').toString('hex');
  return { key, salt };
}

export default {hash, verify};
