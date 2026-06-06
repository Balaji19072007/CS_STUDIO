import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import { supabase } from '../config/supabase';
import { Turnstile } from '@marsidev/react-turnstile';
import api from '../config/api';

const SignIn = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaToken: '',
    mfaCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });
  const [loading, setLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const turnstileRef = useRef();

  useEffect(() => {
    feather.replace();
  }, [message, showPassword, loading, mfaRequired]);

  // --- Utility Functions ---

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (type === 'success') {
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Login Handler ---

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: '' });

    const { email, password, captchaToken } = formData;

    if (!email || !password) {
      showMessage('error', 'Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/session/login', { 
        email, 
        password, 
        captchaToken 
      });
      
      const data = response.data;

      if (response.status !== 200 || !data.success) {
          throw new Error(data.msg || 'Invalid credentials');
      }

      if (data.mfa_required) {
          setMfaRequired(true);
          setLoading(false);
          return;
      }

      showMessage('success', 'Signed in successfully!');
      window.dispatchEvent(new Event('auth-login'));
      setTimeout(() => navigate('/'), 1000);

    } catch (error) {
      console.error('[SignIn] Login error:', error.response?.data?.msg || error.message);
      showMessage('error', 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      // First get the active factor
      const statusRes = await api.get('/api/auth/session/mfa/status');
      const statusData = statusRes.data;
      const factors = statusData.factors || [];
      if (factors.length === 0) throw new Error('No MFA factors found');

      const factorId = factors[0].id;

      // Verify
      const verifyRes = await api.post('/api/auth/session/verify-mfa', {
        factorId, 
        code: formData.mfaCode 
      });
      const verifyData = verifyRes.data;
      
      if (!verifyData.success) throw new Error(verifyData.msg || 'Invalid verification code');

      showMessage('success', 'Signed in successfully!');
      window.dispatchEvent(new Event('auth-login'));
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      showMessage('error', error.response?.data?.msg || error.message || 'MFA verification failed');
    } finally {
      setLoading(false);
    }
  };

  // --- Google Sign In Handler ---
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      // Redirect happens automatically with OAuth
    } catch (error) {
      console.error('[SignIn] Google Auth Error:', error.message);
      showMessage('error', 'Google authentication failed.');
      setLoading(false);
    }
  };

  // --- Component Render ---

  return (
    <div className="min-h-screen dark-gradient-secondary flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT COLUMN: Informational Content */}
        <div className="hidden lg:block">
          <div className="max-w-md space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <i data-feather="code" className="text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold nav-user-text">CS Studio</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Continue your coding journey and track your progress
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="book-open" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Resume Learning</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Pick up where you left off</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="award" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Track Progress</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Monitor your skill growth</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="users" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Join Community</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Connect with learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign In Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <i data-feather="code" className="text-white"></i>
              </div>
              <span className="text-xl font-bold nav-user-text">CS Studio</span>
            </Link>
          </div>

          <div className="dark-glass rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Sign In</h2>
              <p className="text-sm text-gray-400">Access your dashboard</p>
            </div>

            {/* Message Display */}
            {message.type && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500 text-green-100'
                  : 'bg-red-500/20 border border-red-500 text-red-100'
                  }`}
              >
                {message.text}
              </div>
            )}

            {mfaRequired ? (
              <form onSubmit={handleMfaVerify} className="space-y-5">
                <div>
                  <label htmlFor="mfaCode" className="sr-only">Authenticator Code</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                      <i data-feather="shield" className="w-5 h-5"></i>
                    </span>
                    <input
                      type="text"
                      id="mfaCode"
                      name="mfaCode"
                      value={formData.mfaCode}
                      onChange={handleChange}
                      maxLength={6}
                      className="form-input w-full pl-12 pr-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-center tracking-widest font-mono text-xl"
                      placeholder="000000"
                      disabled={loading}
                    />
                  </div>
                  <p className="mt-3 text-sm text-center text-gray-400">Enter the 6-digit code from your authenticator app</p>
                </div>
                <button
                  type="submit"
                  disabled={loading || formData.mfaCode.length !== 6}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                <button
                  type="button"
                  onClick={() => setMfaRequired(false)}
                  className="w-full py-2 text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </form>
            ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="mail" className="w-5 h-5"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full pl-12 pr-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Email Address"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="lock" className="w-5 h-5"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full pl-12 pr-12 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <i
                      data-feather={showPassword ? 'eye-off' : 'eye'}
                      className="w-5 h-5"
                    ></i>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-300">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>

              {/* Turnstile CAPTCHA */}
              <div className="flex justify-center my-4">
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                    onSuccess={(token) => setFormData(prev => ({ ...prev, captchaToken: token }))}
                    onError={() => showMessage('error', 'CAPTCHA failed. Please try again.')}
                    ref={turnstileRef}
                    options={{
                      theme: 'dark'
                    }}
                  />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i data-feather="loader" className="w-5 h-5 animate-spin"></i>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="text-gray-400 text-sm">Or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="py-3.5 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                title="Sign in with Google"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  setMessage({ type: null, text: '' });
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'github',
                      options: { redirectTo: `${window.location.origin}/auth/callback` },
                    });
                    if (error) throw error;
                  } catch (error) {
                    console.error('GitHub Auth Error:', error.message);
                    showMessage('error', 'GitHub authentication failed.');
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="py-3.5 bg-[#24292e] text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-[#1b1f23] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed border border-gray-700"
                title="Sign in with GitHub"
              >
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-6 h-6 invert" alt="GitHub" />
              </button>
            </div>



            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-400">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-400">Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
