const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_this_in_production', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = generateToken; 