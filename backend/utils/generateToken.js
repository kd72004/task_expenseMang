const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '123', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = generateToken; 
