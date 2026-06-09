const { supabase } = require('../config/supabase');
const { body, validationResult } = require('express-validator');
const logAuthEvent = (event, email, ip, status, details = '') => {
  const timestamp = new Date().toISOString();
  console.log(`[AUTH] [${timestamp}] EVENT: ${event} | EMAIL: ${email} | IP: ${ip} | STATUS: ${status} | DETAILS: ${details}`);
};

// Validation schemas
exports.loginValidation = [
  body('email').notEmpty().withMessage('Email or Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.login = async (req, res) => {
  // 1. Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logAuthEvent('LOGIN_VALIDATION_FAILED', req.body.email || 'unknown', req.ip, 'FAILED', JSON.stringify(errors.array()));
    // Generic error to prevent enumeration
    return res.status(401).json({ success: false, msg: 'Invalid credentials' });
  }

    const { email, password, captchaToken } = req.body;
    let authEmail = email;

    try {
        if (!email.includes('@')) {
            const { data: userRow, error: userError } = await supabase.from('users').select('email').eq('username', email).single();
            if (userError || !userRow || !userRow.email) {
                 logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'FAILED', 'Username not found');
                 return res.status(401).json({ success: false, msg: 'Invalid credentials' });
            }
            authEmail = userRow.email;
        }

        // 2. Authenticate with Supabase
        const options = {};
        if (captchaToken) {
            options.captchaToken = captchaToken;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password,
          ...(Object.keys(options).length > 0 && { options })
        });

    if (error) {
      logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'FAILED', error.message);
      console.error('Supabase Login Error:', error.message);
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    if (data.session) {
      // 3. Set HttpOnly cookies
      setCookies(res, data.session);
      
      // Check AAL
      const { createClient } = require('@supabase/supabase-js');
      const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        global: { headers: { Authorization: `Bearer ${data.session.access_token}` } }
      });
      const { data: aalData } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (aalData?.nextLevel === 'aal2' && aalData?.currentLevel === 'aal1') {
          logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'PARTIAL_SUCCESS', 'MFA Required');
          return res.json({ success: true, user: data.user, mfa_required: true });
      }

      logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'SUCCESS');
      return res.json({ success: true, user: data.user, token: data.session.access_token, session: data.session });
    } else if (data.user) {
      // Edge case: User exists but no session
      logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'PARTIAL_SUCCESS', 'MFA Required (Edge case)');
      return res.json({ success: true, user: data.user, mfa_required: true });
    }

    logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'FAILED', 'Unknown error');
    return res.status(401).json({ success: false, msg: 'Invalid credentials' });
  } catch (error) {
    console.error('Login Exception:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, username, captchaToken } = req.body;
  try {
    if (!username) {
        return res.status(400).json({ success: false, msg: 'Username is required' });
    }

    // Check if username exists
    const { data: existingUser } = await supabase.from('users').select('id').eq('username', username).single();
    if (existingUser) {
        return res.status(400).json({ success: false, msg: 'Username already exists' });
    }

    const options = {
      data: { first_name: firstName, last_name: lastName, username }
    };
    if (captchaToken) {
      options.captchaToken = captchaToken;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options
    });

    if (error) {
      console.error('Supabase Signup Error:', error.message);
      return res.status(400).json({ success: false, msg: error.message });
    }

    if (data.user) {
      // Force upsert the user into public.users to ensure the username is saved.
      // This is a failsafe in case the Supabase auth trigger omits the username.
      const { error: upsertError } = await supabase.from('users').upsert({
         id: data.user.id,
         email: email,
         username: username,
         first_name: firstName,
         last_name: lastName,
         role: 'user'
      }, { onConflict: 'id' });

      if (upsertError) {
         console.error('Failed to upsert username into public.users:', upsertError.message);
      }
    }

    if (data.session) {
      setCookies(res, data.session);
    }
    res.json({ success: true, user: data.user, session: data.session, token: data.session?.access_token });
  } catch (error) {
    console.error('Signup Exception:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.checkUsername = async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ success: false, msg: 'Username is required' });
    }

    try {
        const { data: existingUser, error } = await supabase.from('users').select('id').eq('username', username).single();
        
        if (existingUser) {
            return res.json({ success: true, available: false });
        } else {
            return res.json({ success: true, available: true });
        }
    } catch (error) {
        if (error.code === 'PGRST116') {
             // Supabase single() returns this error when no rows are found. This means username is available.
             return res.json({ success: true, available: true });
        }
        console.error('Check Username Exception:', error.message);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ success: false, msg: 'Email and OTP are required' });
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup'
    });

    if (error) {
      console.error('Supabase Verify OTP Error:', error.message);
      return res.status(400).json({ success: false, msg: error.message });
    }

    if (data.session) {
      setCookies(res, data.session);
    }
    
    logAuthEvent('VERIFY_OTP_ATTEMPT', email, req.ip, 'SUCCESS');
    res.json({ success: true, user: data.user, session: data.session, token: data.session?.access_token });
  } catch (error) {
    console.error('Verify OTP Exception:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.access_token || req.headers['x-auth-token'] || req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Invalidate on Supabase side
      await supabase.auth.admin.signOut(token);
    }
  } catch (error) {
    console.error('Logout error:', error.message);
  } finally {
    // Always clear cookies
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('access_token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
    res.clearCookie('refresh_token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
    res.json({ success: true, msg: 'Logged out successfully' });
  }
};

exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ success: false, msg: 'No refresh token' });
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error || !data.session) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.status(401).json({ success: false, msg: 'Session expired' });
    }

    setCookies(res, data.session);
    res.json({ success: true, user: data.user, session: data.session, token: data.session.access_token });
  } catch (error) {
    console.error('Refresh Exception:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.setCookie = (req, res) => {
  const { access_token, refresh_token, expires_in } = req.body;
  
  if (!access_token || !refresh_token) {
    return res.status(400).json({ success: false, msg: 'Missing tokens' });
  }
  
  // We can reconstruct a session object to use our helper
  const session = {
    access_token,
    refresh_token,
    expires_in: expires_in || 3600
  };
  
  setCookies(res, session);
  res.json({ success: true });
};

exports.verifyMFA = async (req, res) => {
    const { factorId, challengeId, code } = req.body;
    // We would need the access token of the user in AAL1 state.
    // If we just logged in, the token isn't in a cookie yet if AAL2 is required.
    // So the frontend needs to pass the temporary access_token from login,
    // OR we set the AAL1 token in the cookie during login, and then upgrade it here.
    
    // Setting AAL1 cookie during login is better, let's read it:
    const token = req.cookies.access_token || req.headers['x-auth-token'] || req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ success: false, msg: 'Missing AAL1 token' });

    try {
        const { data, error } = await supabase.auth.mfa.challengeAndVerify({
            factorId,
            code
        });
        
        if (error) {
            console.error('MFA Verify Error:', error.message);
            return res.status(401).json({ success: false, msg: 'Invalid verification code' });
        }
        
        // At this point we have a new AAL2 session?
        // Wait, challengeAndVerify updates the session. We should fetch the new session.
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (!sessionError && sessionData.session) {
             setCookies(res, sessionData.session);
             return res.json({ success: true, session: sessionData.session, token: sessionData.session.access_token });
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('MFA Verify Exception:', error.message);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
};

// Helper function
function setCookies(res, session) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('access_token', session.access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: session.expires_in * 1000 // usually 3600s
  });

  if (session.refresh_token) {
    res.cookie('refresh_token', session.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 3600000 // 7 days
    });
  }
}

const getClient = (req) => {
  const token = req.cookies.access_token || req.headers['x-auth-token'] || req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  const { createClient } = require('@supabase/supabase-js');
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
};

exports.mfaEnroll = async (req, res) => {
  const client = getClient(req);
  if (!client) return res.status(401).json({ success: false, msg: 'Unauthorized' });
  try {
    const { data, error } = await client.auth.mfa.enroll({ factorType: 'totp' });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.mfaChallenge = async (req, res) => {
  const { factorId } = req.body;
  const client = getClient(req);
  if (!client) return res.status(401).json({ success: false, msg: 'Unauthorized' });
  try {
    const { data, error } = await client.auth.mfa.challenge({ factorId });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.mfaVerifyEnroll = async (req, res) => {
  const { factorId, challengeId, code } = req.body;
  const client = getClient(req);
  if (!client) return res.status(401).json({ success: false, msg: 'Unauthorized' });
  try {
    const { data, error } = await client.auth.mfa.verify({ factorId, challengeId, code });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.mfaUnenroll = async (req, res) => {
  const { factorId } = req.body;
  const client = getClient(req);
  if (!client) return res.status(401).json({ success: false, msg: 'Unauthorized' });
  try {
    const { data, error } = await client.auth.mfa.unenroll({ factorId });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.mfaStatus = async (req, res) => {
  const client = getClient(req);
  if (!client) return res.status(401).json({ success: false, msg: 'Unauthorized' });
  try {
    const { data, error } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) throw error;
    const { data: factorsData } = await client.auth.mfa.listFactors();
    res.json({ success: true, aal: data, factors: factorsData?.totp || [] });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
