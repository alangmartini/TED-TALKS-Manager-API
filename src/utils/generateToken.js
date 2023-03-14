const crypto = require('crypto');

function generateToken() {
  const randomBytes = crypto.randomBytes(8);
  console.log(randomBytes.buffer);
  const token = randomBytes.toString('hex');
  console.log(token);
  return token;
}
const a = Buffer.from('44d2a26e134e35fe', 'hex')
console.log(a);
generateToken()
module.exports = generateToken;