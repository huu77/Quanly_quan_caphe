const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function decodeToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

module.exports = decodeToken;
