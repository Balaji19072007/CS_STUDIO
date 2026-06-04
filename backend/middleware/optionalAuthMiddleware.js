const { supabase } = require('../config/supabase');

module.exports = async function optionalAuthMiddleware(req, res, next) {
  const token =
    req.header('x-auth-token') ||
    req.header('Authorization')?.replace('Bearer ', '') ||
    req.query.token;

  if (!token) {
    req.user = null;
    req.token = null;
    return next();
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      req.user = null;
      req.token = null;
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    req.token = token;
  } catch (error) {
    console.log('Optional auth failed (proceeding as guest):', error.message);
    req.user = null;
    req.token = null;
  }

  next();
};
