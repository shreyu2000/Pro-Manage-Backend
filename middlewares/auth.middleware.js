const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiResponse  = require('../utils/ApiResponse');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return ApiResponse(res, 401, 'Unauthorized - Missing token');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return ApiResponse(res, 401, 'Unauthorized - Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return ApiResponse(res, 500, 'Internal server error');
  }
};

module.exports = authMiddleware;
