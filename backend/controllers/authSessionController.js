const { supabase } = require('../config/supabase');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const emailService = require('../util/emailService');

// In-memory store for OTPs: email -> { otp, userData, expiresAt }
global.otpStore = global.otpStore || new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
            const searchUsername = email.replace(/[%_]/g, '\\$&');
            const { data: userRows, error: userError } = await supabase.from('users').select('email').ilike('username', searchUsername).limit(1);
            if (userError || !userRows || userRows.length === 0 || !userRows[0].email) {
                 logAuthEvent('LOGIN_ATTEMPT', email, req.ip, 'FAILED', 'Username not found');
                 return res.status(401).json({ success: false, msg: 'Invalid credentials' });
            }
            authEmail = userRows[0].email;
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
  try {
    const { email, password, firstName, lastName, username, captchaToken } = req.body;

    if (!email || !password || !firstName || !lastName || !username) {
      return res.status(400).json({ success: false, msg: 'All fields are required' });
    }

    // Check if username exists
    const searchUsername = username.replace(/[%_]/g, '\\$&');
    const { data: existingUsers } = await supabase.from('users').select('id').ilike('username', searchUsername).limit(1);
    if (existingUsers && existingUsers.length > 0) {
        return res.status(400).json({ success: false, msg: 'Username already exists' });
    }

    // Check if email exists in Supabase
    const { data: existingEmail } = await supabase.from('users').select('id').eq('email', email).limit(1);
    if (existingEmail && existingEmail.length > 0) {
        return res.status(400).json({ success: false, msg: 'User already registered' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    global.otpStore.set(email, {
      otp,
      userData: { email, password, firstName, lastName, username },
      expiresAt
    });

    try {
      await emailService.sendOTPEmail(email, otp, firstName);
    } catch (emailErr) {
      console.error('Failed to send OTP via Nodemailer:', emailErr);
      return res.status(500).json({ success: false, msg: 'Failed to send OTP email. Please try again later.' });
    }

    // Return success to proceed to OTP screen
    res.json({ success: true, user: { email }, session: null });
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
        const searchUsername = username.replace(/[%_]/g, '\\$&');
        const { data: existingUsers, error } = await supabase.from('users').select('id').ilike('username', searchUsername).limit(1);
        
        if (existingUsers && existingUsers.length > 0) {
            return res.json({ success: true, available: false });
        } else {
            return res.json({ success: true, available: true });
        }
    } catch (error) {
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

    const record = global.otpStore.get(email);
    if (!record) {
      return res.status(400).json({ success: false, msg: 'OTP expired or invalid. Please sign up again.' });
    }

    if (Date.now() > record.expiresAt) {
      global.otpStore.delete(email);
      return res.status(400).json({ success: false, msg: 'OTP has expired. Please sign up again.' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, msg: 'Invalid OTP' });
    }

    // OTP matches! Create the user in Supabase
    const { userData } = record;
    
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
      user_metadata: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username
      }
    });

    if (adminError) {
      console.error('Supabase Admin Create User Error:', adminError.message);
      return res.status(400).json({ success: false, msg: adminError.message });
    }

    // Upsert into public.users
    if (adminData.user) {
      const { error: upsertError } = await supabase.from('users').upsert({
         id: adminData.user.id,
         email: userData.email,
         username: userData.username,
         first_name: userData.firstName,
         last_name: userData.lastName,
         role: 'user'
      }, { onConflict: 'id' });

      if (upsertError) {
         console.error('Failed to upsert username into public.users:', upsertError.message);
      }
    }

    global.otpStore.delete(email); // Clear OTP

    // Log the user in to get a session
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password
    });

    if (loginError || !loginData.session) {
      // User was created but login failed (rare)
      return res.json({ success: true, user: adminData.user, msg: 'Account verified. Please log in.' });
    }

    setCookies(res, loginData.session);
    logAuthEvent('VERIFY_OTP_ATTEMPT', email, req.ip, 'SUCCESS');
    res.json({ success: true, user: loginData.user, session: loginData.session, token: loginData.session.access_token });
  } catch (error) {
    console.error('Verify OTP Exception:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, msg: 'Email is required' });
    }

    const record = global.otpStore.get(email);
    if (!record) {
      return res.status(400).json({ success: false, msg: 'Session expired. Please sign up again.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    global.otpStore.set(email, {
      ...record,
      otp,
      expiresAt
    });

    try {
      await emailService.sendOTPEmail(email, otp, record.userData.firstName);
    } catch (emailErr) {
      console.error('Failed to resend OTP via Nodemailer:', emailErr);
      return res.status(500).json({ success: false, msg: 'Failed to send OTP email.' });
    }

    res.json({ success: true, msg: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP Exception:', error.message);
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
