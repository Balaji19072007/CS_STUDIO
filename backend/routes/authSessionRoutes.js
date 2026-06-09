const express = require('express');
const router = express.Router();
const authSessionController = require('../controllers/authSessionController');

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per window
  message: { success: false, msg: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 signup requests per hour
  message: { success: false, msg: 'Too many accounts created from this IP, please try again after an hour' },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- POST /api/auth/session/login ---
router.post('/login', loginLimiter, authSessionController.loginValidation, authSessionController.login);

// --- POST /api/auth/session/signup ---
router.post('/signup', signupLimiter, authSessionController.signup);

// --- GET /api/auth/session/check-username ---
router.get('/check-username', authSessionController.checkUsername);

// --- POST /api/auth/session/logout ---
router.post('/logout', authSessionController.logout);

// --- POST /api/auth/session/refresh ---
router.post('/refresh', authSessionController.refresh);

// --- POST /api/auth/session/set-cookie ---
router.post('/set-cookie', authSessionController.setCookie);

// --- POST /api/auth/session/verify-mfa ---
router.post('/verify-mfa', authSessionController.verifyMFA);

// --- MFA Routes ---
router.post('/mfa/enroll', authSessionController.mfaEnroll);
router.post('/mfa/challenge', authSessionController.mfaChallenge);
router.post('/mfa/verify-enroll', authSessionController.mfaVerifyEnroll);
router.post('/mfa/unenroll', authSessionController.mfaUnenroll);
router.get('/mfa/status', authSessionController.mfaStatus);

module.exports = router;
