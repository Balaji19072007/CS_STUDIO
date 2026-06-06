/**
 * @desc    Role Middleware - Verify User Role
 * @access  Protected Routes
 * @param   {...String} roles - Array of allowed roles
 */
module.exports = function (...roles) {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          msg: 'Access denied. User role not found.',
          code: 'NO_ROLE'
        });
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          msg: 'Access denied. Insufficient permissions.',
          code: 'INSUFFICIENT_PERMISSIONS'
        });
      }
  
      next();
    };
  };
