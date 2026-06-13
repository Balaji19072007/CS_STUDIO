import { toast } from 'sonner';
import monitoring from './monitoring';

// ─── Network Recovery ────────────────────────────────────────────
let networkWasOffline = false;

const initNetworkListener = () => {
  window.addEventListener('online', () => {
    if (networkWasOffline) {
      toast.success('Connection restored', {
        description: 'You are back online.',
        duration: 3000,
        position: 'top-right',
      });
    }
    networkWasOffline = false;
  });

  window.addEventListener('offline', () => {
    networkWasOffline = true;
    toast.warning('You are offline', {
      description: 'Some features may be unavailable.',
      duration: 4000,
      position: 'top-right',
    });
  });
};

initNetworkListener();

// ─── Retry Helper ────────────────────────────────────────────────
const RETRYABLE_TYPES = ['NETWORK', 'TIMEOUT'];
const RETRY_DELAYS = [1000, 2000, 4000];

export const withRetry = (fn, maxRetries = 3) => {
  return async (...args) => {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
        const type = classifyError(error);

        if (attempt < maxRetries && RETRYABLE_TYPES.includes(type)) {
          const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  };
};

// ─── Error Categories ────────────────────────────────────────────
export const ErrorType = {
  NETWORK: 'NETWORK',
  AUTH: 'AUTH',
  SERVER: 'SERVER',
  TIMEOUT: 'TIMEOUT',
  VALIDATION: 'VALIDATION',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN: 'UNKNOWN',
};

// ─── Error Classification ────────────────────────────────────────
export const classifyError = (error) => {
  if (!error) return ErrorType.UNKNOWN;

  // Network error (no response from server)
  if (error.code === 'ERR_NETWORK' || error.name === 'AbortError' || !error.response) {
    return ErrorType.NETWORK;
  }

  const status = error.response?.status;

  // Auth errors
  if (status === 401) return ErrorType.AUTH;
  if (status === 403) return ErrorType.AUTH;

  // Not found
  if (status === 404) return ErrorType.NOT_FOUND;

  // Validation errors
  if (status === 400 || status === 422) return ErrorType.VALIDATION;

  // Timeout
  if (status === 408 || error.code === 'ECONNABORTED') return ErrorType.TIMEOUT;

  // Server errors
  if (status >= 500) return ErrorType.SERVER;

  return ErrorType.UNKNOWN;
};

// ─── User-Friendly Messages ──────────────────────────────────────
export const getErrorMessage = (error, type) => {
  const category = type || classifyError(error);

  const messages = {
    [ErrorType.NETWORK]: 'Unable to connect to the server. Please check your internet connection and try again.',
    [ErrorType.AUTH]: 'Your session has expired. Please sign in again.',
    [ErrorType.SERVER]: 'Something went wrong on our end. Our team has been notified.',
    [ErrorType.TIMEOUT]: 'The request took too long to complete. Please try again.',
    [ErrorType.VALIDATION]: error?.response?.data?.msg || error?.response?.data?.message || 'Please check your input and try again.',
    [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.',
  };

  return messages[category] || messages[ErrorType.UNKNOWN];
};

// ─── Auth Session Management ─────────────────────────────────────
let isRedirectingToSignIn = false;

const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
};

const redirectToSignIn = () => {
  if (isRedirectingToSignIn) return;
  if (window.location.pathname.includes('/signin') || window.location.pathname.includes('/signup')) return;

  isRedirectingToSignIn = true;
  clearSession();
  window.location.assign(`/signin?session=expired`);
};

// ─── Toast Display ───────────────────────────────────────────────
const showToast = (type, message, action) => {
  const config = {
    duration: type === ErrorType.AUTH ? 6000 : type === ErrorType.NETWORK ? 5000 : 4000,
    position: 'top-right',
  };

  switch (type) {
    case ErrorType.NETWORK:
      toast.error(message, {
        ...config,
        description: 'Check your connection',
        action: action || { label: 'Retry', onClick: () => window.location.reload() },
      });
      break;
    case ErrorType.AUTH:
      toast.error(message, {
        ...config,
        description: 'Sign in again to continue',
      });
      break;
    case ErrorType.SERVER:
      toast.error(message, {
        ...config,
        action: action || undefined,
      });
      break;
    case ErrorType.TIMEOUT:
      toast.error(message, {
        ...config,
        action: action || { label: 'Retry', onClick: () => window.location.reload() },
      });
      break;
    case ErrorType.VALIDATION:
      toast.error(message, { duration: 4000, position: 'top-right' });
      break;
    case ErrorType.NOT_FOUND:
      toast.warning(message, { duration: 3000, position: 'top-right' });
      break;
    default:
      toast.error(message, config);
  }
};

// ─── Main Error Handler ──────────────────────────────────────────
let errorCounts = new Map();
const RATE_LIMIT_THRESHOLD = 3;
const RATE_LIMIT_WINDOW = 10000;

const isRateLimited = (key) => {
  const now = Date.now();
  const entry = errorCounts.get(key);
  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    errorCounts.set(key, { count: 1, timestamp: now });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_THRESHOLD) return true;
  return false;
};

// Periodically clear the error map to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of errorCounts.entries()) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW * 2) {
      errorCounts.delete(key);
    }
  }
}, 60000);

export const handleApiError = (error, context = {}) => {
  const type = classifyError(error);
  const message = getErrorMessage(error, type);
  const errorKey = `${type}:${message}`;

  // Rate limit toast notifications
  if (isRateLimited(errorKey)) return;

  // Log to monitoring
  monitoring.captureException(error, { ...context, errorType: type });

  // Log to console in dev
  if (import.meta.env.DEV) {
    console.error(`[ErrorService] ${type}:`, error?.response?.data || error.message);
  }

  // Build toast action from retryFn if provided
  let action = context.action;
  if (!action && context.retryFn && (type === ErrorType.NETWORK || type === ErrorType.TIMEOUT)) {
    action = { label: 'Retry', onClick: context.retryFn };
  }

  // Handle auth errors - clear session and redirect
  if (type === ErrorType.AUTH) {
    clearSession();
    showToast(type, message);
    redirectToSignIn();
    return;
  }

  // Show toast for all other errors
  showToast(type, message, action);

  return { type, message };
};

// ─── Create a safe API caller ────────────────────────────────────
export const withErrorHandling = (apiCall, context = {}) => {
  return async (...args) => {
    try {
      const response = await apiCall(...args);
      return response;
    } catch (error) {
      handleApiError(error, context);
      throw error;
    }
  };
};

// ─── Specialized helpers ─────────────────────────────────────────
export const showSuccess = (message, description) => {
  toast.success(message, {
    description,
    duration: 3000,
    position: 'top-right',
  });
};

export const showInfo = (message, description) => {
  toast.info(message, {
    description,
    duration: 3000,
    position: 'top-right',
  });
};

export const showWarning = (message, description) => {
  toast.warning(message, {
    description,
    duration: 4000,
    position: 'top-right',
  });
};

export const showError = (message, description) => {
  toast.error(message, {
    description,
    duration: 5000,
    position: 'top-right',
  });
};

export default {
  handleApiError,
  withErrorHandling,
  classifyError,
  getErrorMessage,
  ErrorType,
  showSuccess,
  showInfo,
  showWarning,
  showError,
  withRetry,
};
