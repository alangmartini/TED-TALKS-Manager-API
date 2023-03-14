const crypto = require('crypto');

function generateToken() {
  const randomBytes = crypto.randomBytes(8);
  const token = randomBytes.toString('hex');
  return token;
}

console.log(generateToken());
module.exports = generateToken;