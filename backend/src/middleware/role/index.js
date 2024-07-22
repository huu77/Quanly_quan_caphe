const jwt = require('jsonwebtoken');
const ResponseStatus = require('../../ReponseStatus');

// Define role mappings
const allowedRoles = { "Start": 1, "Counter Staff": 2,"Manager":3 };

const authenticateJWT = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json(ResponseStatus.createResponse(403, { message: 'Access denied, token missing!' }));
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Convert role names to IDs
      const allowedRoleIds = roles.map(role => allowedRoles[role]);

      // Check if the user's role ID is in the allowed roles
      if (allowedRoleIds.length && !allowedRoleIds.includes(decoded.role_id)) {
        return res.status(403).json(ResponseStatus.createResponse(403, { message: 'Access denied, insufficient permissions!' }));
      }

      // Attach user to request
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json(ResponseStatus.createResponse(403, { message: 'Access denied, invalid token!' }));
    }
  };
};

module.exports = authenticateJWT;
