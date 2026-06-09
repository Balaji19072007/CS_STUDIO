
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import { supabase } from '../config/supabase';
import { Turnstile } from '@marsidev/react-turnstile';
import api from '../config/api';

const SignUp = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Removed auto-redirect to allow users to sign in as a different user or if token is stale

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaToken: '',
  });

  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef();

  useEffect(() => {
    feather.replace();
  }, [message, showPassword, loading]);

  // --- Utility Functions ---

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (type === 'success') {
      window.dispatchEvent(new Event('auth-login'));
      setTimeout(() => navigate('/'), 1000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Registration Handler ---

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: '' });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showMessage('error', 'Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showMessage('error', 'Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!termsChecked) {
      showMessage('error', 'Please accept the Terms and Conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/session/signup', { 
        email, 
        password, 
        firstName, 
        lastName, 
        captchaToken: formData.captchaToken 
      });
      
      const data = response.data;

      if (response.status !== 200 || !data.success) {
          throw new Error(data.msg || 'Failed to create account');
      }

      if (data.user && !data.session) {
        showMessage('success', 'Registration successful! Please check your email for verification link.');
      } else {
        showMessage('success', 'Registration successful! Please check your email for verification link.');
        // Navigate or dispatch event if auto-login is preferred
      }

    } catch (error) {
      console.error('[SignUp] Error:', error.message);
      
      if (error.message && (error.message.includes('already registered') || error.message.includes('already exists'))) {
         showMessage('success', 'Registration successful! Please check your email for verification link.');
      } else {
         showMessage('error', error.response?.data?.msg || error.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Google Sign Up Handler ---
  const handleGoogleSignUp = async () => {
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

    } catch (error) {
      console.error('[SignUp] Google Auth Error:', error.message);
      showMessage('error', 'Google authentication failed.');
      setLoading(false);
    }
  };


  // --- Component Render ---

  return (
    <div className="min-h-screen dark-gradient-secondary flex items-center justify-center p-6 py-12 relative">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 lg:top-8 lg:left-8 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg backdrop-blur-md transition-all group z-10"
        title="Go back"
      >
        <i data-feather="arrow-left" className="text-gray-400 group-hover:text-white transition-colors w-5 h-5"></i>
      </Link>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT COLUMN: Informational Content */}
        <div className="hidden lg:block">
          <div className="max-w-md space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <i data-feather="code" className="text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold text-white">CS Studio</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Start Your Journey
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Join thousands of developers learning to code
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="play-circle" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Interactive Learning</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Visual animations and code execution</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="target" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Personalized Path</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Career-focused roadmaps</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="briefcase" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Career Ready</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Build job-ready skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign Up Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <i data-feather="code" className="text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">CS Studio</span>
            </Link>
          </div>

          <div className="dark-glass rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Create Account
              </h2>
              <p className="text-sm text-gray-400">
                Start learning in minutes
              </p>
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

            <form onSubmit={handleRegistrationSubmit} className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="First Name"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Last Name"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="Email Address"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full px-4 pr-12 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="new-password"
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
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="form-input w-full px-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="Confirm Password"
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-700/50 text-primary-500 focus:ring-2 focus:ring-primary-500"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-400 leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-primary-400 hover:text-primary-300 underline">Terms</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary-400 hover:text-primary-300 underline">Privacy</a>
                  </span>
                </label>
              </div>

              {/* Turnstile CAPTCHA */}
              {import.meta.env.VITE_TURNSTILE_SITE_KEY && (
                <div className="flex justify-center my-4">
                    <Turnstile
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setFormData(prev => ({ ...prev, captchaToken: token }))}
                      onError={() => showMessage('error', 'CAPTCHA failed. Please try again.')}
                      ref={turnstileRef}
                      options={{
                        theme: 'dark'
                      }}
                    />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i data-feather="loader" className="w-5 h-5 animate-spin"></i>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

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
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="py-3.5 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                title="Sign up with Google"
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
                title="Sign up with GitHub"
              >
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-6 h-6 invert" alt="GitHub" />
              </button>
            </div>


            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing up, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-400">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-400">Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
