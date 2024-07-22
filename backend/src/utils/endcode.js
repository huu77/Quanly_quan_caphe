const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function encode(user) {
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role_id: user.role_id 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' } // Access token expires in 15 minutes
  );

  const refreshToken = jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role_id: user.role_id 
    }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: '7d' } // Refresh token expires in 7 days
  );

  return { accessToken, refreshToken };
}

module.exports = encode;
