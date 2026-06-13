// frontend/src/config/api.js
import axios from 'axios';
import { handleApiError } from '../services/errorService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const buildApiUrl = (path = '') => {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with global error handling via errorService
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const url = error.config?.url || 'unknown';
    handleApiError(error, { source: 'config/api.js', url });
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `/api/auth/signin`,
    SIGNUP: `/api/auth/signup`,
    SEND_OTP: `/api/auth/send-otp`,
    VERIFY_OTP: `/api/auth/verify-otp`,
  },

  GOOGLE_AUTH: {
    CALLBACK: `/api/google-auth`,
  },

  PROBLEMS: {
    GET_ALL: `/api/problems`,
    GET_BY_ID: (id) => `/api/problems/${id}`,
  },

  LEADERBOARD: {
    GET: `/api/leaderboard`,
    USER_RANK: `/api/leaderboard/user-rank`,
    TOTAL_USERS: `/api/leaderboard/total-users`,
  },

  STATS: {
    USER_STATS: `/api/stats/user-stats`,
    SUBMIT_RATING: `/api/stats/submit-rating`,
    RATING_STATUS: `/api/stats/rating-status`,
    START_TRACKING: `/api/stats/start-tracking`,
    STOP_TRACKING: `/api/stats/stop-tracking`,
    MARK_RATING_SHOWN: `/api/stats/mark-rating-shown`,
    RATING_ELIGIBILITY: `/api/stats/rating-eligibility`,
    COURSE_RATING_SUBMIT: `/api/stats/course-rating`,
    COURSE_RATING_STATUS: `/api/stats/course-rating-status`,
  },

  // 🔔 NEW: Notification endpoints
  NOTIFICATIONS: {
    BASE: `/api/notifications`,
    UNREAD_COUNT: `/api/notifications/unread-count`,
    MARK_ALL_READ: `/api/notifications/mark-all-read`,
    MARK_AS_READ: (id) => `/api/notifications/${id}/read`,
    CLEAR_ALL: `/api/notifications/clear-all`,
    PREFERENCES: `/api/notifications/preferences`,
  },

  COMMUNITY: {
    GET_ALL: `/api/community`,
    GET_BY_ID: (id) => `/api/community/${id}`,
    CREATE: `/api/community`,
    COMMENT: (id) => `/api/community/${id}/comment`,
    LIKE: (id) => `/api/community/${id}/like`,
    DELETE: (id) => `/api/community/${id}`,
  },

  PREDICTION: {
    PREDICT: `/predict`,
  },

  TESTS: {
    VERIFY_CODE: `/api/tests/verify-code`,
  },

  HEALTH: `/api/health`,
};

// API methods organized by resource
export const statsAPI = {
  // Public routes
  getUserStats: () => api.get(API_ENDPOINTS.STATS.USER_STATS),

  // Protected routes
  submitRating: (data) => api.post(API_ENDPOINTS.STATS.SUBMIT_RATING, data),
  checkRatingStatus: () => api.get(API_ENDPOINTS.STATS.RATING_STATUS),
  startUsageTracking: () => api.post(API_ENDPOINTS.STATS.START_TRACKING, {}),
  stopUsageTracking: () => api.post(API_ENDPOINTS.STATS.STOP_TRACKING, {}),
  markRatingShown: () => api.post(API_ENDPOINTS.STATS.MARK_RATING_SHOWN, {}),
  checkRatingEligibility: () => api.get(API_ENDPOINTS.STATS.RATING_ELIGIBILITY),
};

export const courseRatingAPI = {
  submitCourseRating: (data) => api.post(API_ENDPOINTS.STATS.COURSE_RATING_SUBMIT, data),
  checkCourseRatingStatus: (courseId) => api.get(`${API_ENDPOINTS.STATS.COURSE_RATING_STATUS}/${courseId}`)
};

export const authAPI = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.SIGNIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.SIGNUP, userData),
  sendOtp: (email) => api.post(API_ENDPOINTS.AUTH.SEND_OTP, { email }),
  verifyOtp: (data) => api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data),
  googleAuth: (token) => api.post(API_ENDPOINTS.GOOGLE_AUTH.CALLBACK, { token }),
};

export const problemsAPI = {
  getAll: () => api.get(API_ENDPOINTS.PROBLEMS.GET_ALL),
  getById: (id) => api.get(API_ENDPOINTS.PROBLEMS.GET_BY_ID(id)),
};

export const leaderboardAPI = {
  get: () => api.get(API_ENDPOINTS.LEADERBOARD.GET),
};

// 🔔 NEW: Notifications API
export const notificationsAPI = {
  getAll: (params = {}) => api.get(API_ENDPOINTS.NOTIFICATIONS.BASE, { params }),
  getUnreadCount: () => api.get(API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT),
  markAsRead: (id) => api.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(id)),
  markAllAsRead: () => api.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ),
  delete: (id) => api.delete(API_ENDPOINTS.NOTIFICATIONS.BASE + `/${id}`),
  clearAll: () => api.delete(API_ENDPOINTS.NOTIFICATIONS.CLEAR_ALL),
  getPreferences: () => api.get(API_ENDPOINTS.NOTIFICATIONS.PREFERENCES),
  updatePreferences: (preferences) => api.put(API_ENDPOINTS.NOTIFICATIONS.PREFERENCES, preferences),
};

export const predictionAPI = {
  predict: (data) => api.post(API_ENDPOINTS.PREDICTION.PREDICT, data),
};

export const testAPI = {
  verifyCode: (data) => api.post(API_ENDPOINTS.TESTS.VERIFY_CODE, data),
};

// Utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Legacy functions for backward compatibility
export const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      // CRITICAL: Use ONLY x-auth-token for backend authentication
      headers['x-auth-token'] = token;
    }
  }

  return headers;
};

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  SOCKET_URL: SOCKET_URL,
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  TIMEOUT: 10000,
};

// Export the raw api instance for custom requests
export default api;
