const { supabase } = require('../config/supabase');

/**
 * @desc    Auth Middleware - Verify Supabase JWT Token
 * @access  Protected Routes
 */
module.exports = async function (req, res, next) {
  // Get token
  const token = req.cookies?.access_token ||
    req.header('x-auth-token') ||
    req.header('Authorization')?.replace('Bearer ', '') ||
    req.query.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'Access denied. No token provided.',
      code: 'NO_TOKEN'
    });
  }

  try {
    // Determine if we need to retrieve the user's details
    // using supabase.auth.getUser(token)

    // Note: getUser(token) verifies the token signature with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Supabase Auth Error:', error?.message);
      return res.status(401).json({
        success: false,
        msg: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }

    // Populate req.user
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    req.token = token;
    next();

  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(401).json({
      success: false,
      msg: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};