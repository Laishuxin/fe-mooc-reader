const crypto = require('crypto');

export function hash(source: string) {
  return crypto.createHash('md5').update(source).digest('hex');
}
