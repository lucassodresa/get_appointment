require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn });
};

module.exports = {
  generateToken
};
