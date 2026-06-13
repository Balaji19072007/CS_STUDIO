import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock('../services/monitoring', () => ({
  default: { captureException: vi.fn(), captureMessage: vi.fn(), setUser: vi.fn(), clearUser: vi.fn() },
}));

describe('errorService', () => {
  let errorService;
  let toast;
  let monitoring;

  const mockStorage = {};

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    errorService = await import('../services/errorService');
    toast = (await import('sonner')).toast;
    monitoring = (await import('../services/monitoring')).default;
    Object.keys(mockStorage).forEach(k => delete mockStorage[k]);
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((k) => mockStorage[k] ?? null),
      setItem: vi.fn((k, v) => { mockStorage[k] = String(v); }),
      removeItem: vi.fn((k) => { delete mockStorage[k]; }),
      clear: vi.fn(() => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }),
      get length() { return Object.keys(mockStorage).length; },
      key: vi.fn((i) => Object.keys(mockStorage)[i] ?? null),
    });
    delete window.location;
    window.location = { assign: vi.fn(), pathname: '/' };
  });

  // ─── classifyError ──────────────────────────────────────────────

  describe('classifyError', () => {
    it('returns UNKNOWN for null/undefined', () => {
      expect(errorService.classifyError(null)).toBe('UNKNOWN');
      expect(errorService.classifyError()).toBe('UNKNOWN');
    });

    it('returns NETWORK for network errors without response', () => {
      const err = new Error('Network error');
      err.code = 'ERR_NETWORK';
      expect(errorService.classifyError(err)).toBe('NETWORK');
    });

    it('returns NETWORK for AbortError', () => {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      expect(errorService.classifyError(err)).toBe('NETWORK');
    });

    it('returns NETWORK for ECONNABORTED', () => {
      const err = new Error('Timeout');
      err.code = 'ECONNABORTED';
      expect(errorService.classifyError(err)).toBe('NETWORK');
    });

    it('returns AUTH for 401', () => {
      const err = new Error('Unauthorized');
      err.response = { status: 401 };
      expect(errorService.classifyError(err)).toBe('AUTH');
    });

    it('returns AUTH for 403', () => {
      const err = new Error('Forbidden');
      err.response = { status: 403 };
      expect(errorService.classifyError(err)).toBe('AUTH');
    });

    it('returns NOT_FOUND for 404', () => {
      const err = new Error('Not found');
      err.response = { status: 404 };
      expect(errorService.classifyError(err)).toBe('NOT_FOUND');
    });

    it('returns VALIDATION for 400', () => {
      const err = new Error('Bad request');
      err.response = { status: 400 };
      expect(errorService.classifyError(err)).toBe('VALIDATION');
    });

    it('returns VALIDATION for 422', () => {
      const err = new Error('Unprocessable');
      err.response = { status: 422 };
      expect(errorService.classifyError(err)).toBe('VALIDATION');
    });

    it('returns TIMEOUT for 408', () => {
      const err = new Error('Timeout');
      err.response = { status: 408 };
      expect(errorService.classifyError(err)).toBe('TIMEOUT');
    });

    it('returns SERVER for 500+', () => {
      const err = new Error('Server error');
      err.response = { status: 500 };
      expect(errorService.classifyError(err)).toBe('SERVER');
      err.response = { status: 503 };
      expect(errorService.classifyError(err)).toBe('SERVER');
    });

    it('returns UNKNOWN for other status codes', () => {
      const err = new Error('Teapot');
      err.response = { status: 418 };
      expect(errorService.classifyError(err)).toBe('UNKNOWN');
    });
  });

  // ─── getErrorMessage ────────────────────────────────────────────

  describe('getErrorMessage', () => {
    it('returns network message for NETWORK type', () => {
      expect(errorService.getErrorMessage(null, 'NETWORK')).toContain('Unable to connect');
    });

    it('returns auth message for AUTH type', () => {
      expect(errorService.getErrorMessage(null, 'AUTH')).toContain('session has expired');
    });

    it('returns server message for SERVER type', () => {
      expect(errorService.getErrorMessage(null, 'SERVER')).toContain('Something went wrong');
    });

    it('returns timeout message for TIMEOUT type', () => {
      expect(errorService.getErrorMessage(null, 'TIMEOUT')).toContain('took too long');
    });

    it('returns validation message from response for VALIDATION type', () => {
      const err = new Error('Validation');
      err.response = { data: { msg: 'Email is required' } };
      expect(errorService.getErrorMessage(err, 'VALIDATION')).toBe('Email is required');
    });

    it('returns validation fallback for VALIDATION type without response', () => {
      expect(errorService.getErrorMessage(null, 'VALIDATION')).toContain('check your input');
    });

    it('returns not found message for NOT_FOUND type', () => {
      expect(errorService.getErrorMessage(null, 'NOT_FOUND')).toContain('not found');
    });

    it('returns unknown message for UNKNOWN type', () => {
      expect(errorService.getErrorMessage(null, 'UNKNOWN')).toContain('unexpected error');
    });

    it('classifies error when type is not provided', () => {
      const err = new Error('Test');
      err.response = { status: 404 };
      const msg = errorService.getErrorMessage(err);
      expect(msg).toContain('not found');
    });
  });

  // ─── handleApiError ─────────────────────────────────────────────

  describe('handleApiError', () => {
    it('calls toast.error for server errors', () => {
      const err = new Error('Server error');
      err.response = { status: 500, data: {} };
      errorService.handleApiError(err, { url: '/api/test' });
      expect(toast.error).toHaveBeenCalled();
      expect(monitoring.captureException).toHaveBeenCalled();
    });

    it('rate limits repeated identical errors', () => {
      const err = new Error('Server error');
      err.response = { status: 500, data: {} };
      for (let i = 0; i < 5; i++) {
        errorService.handleApiError(err, { url: '/api/test' });
      }
      expect(toast.error).toHaveBeenCalledTimes(3);
    });

    it('clears session and redirects on auth errors', () => {
      localStorage.setItem('token', 'abc123');
      localStorage.setItem('refreshToken', 'xyz789');
      localStorage.setItem('userData', JSON.stringify({ name: 'Test' }));
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: {} };
      errorService.handleApiError(err, { url: '/api/test' });
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
      expect(window.location.assign).toHaveBeenCalledWith('/signin?session=expired');
    });

    it('does not redirect on auth errors if already on signin page', () => {
      window.location.pathname = '/signin';
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: {} };
      errorService.handleApiError(err);
      expect(window.location.assign).not.toHaveBeenCalled();
    });

    it('returns { type, message } on non-auth errors', () => {
      const err = new Error('Not found');
      err.response = { status: 404, data: {} };
      const result = errorService.handleApiError(err, { url: '/api/test' });
      expect(result).toHaveProperty('type', 'NOT_FOUND');
      expect(result).toHaveProperty('message');
    });

    it('uses retryFn for NETWORK errors when provided', () => {
      const retryFn = vi.fn();
      const err = new Error('Network down');
      err.code = 'ERR_NETWORK';
      errorService.handleApiError(err, { retryFn, url: '/api/test' });
      expect(toast.error).toHaveBeenCalled();
      const callArgs = toast.error.mock.calls[0];
      expect(callArgs[1].action.label).toBe('Retry');
      callArgs[1].action.onClick();
      expect(retryFn).toHaveBeenCalled();
    });

    it('does not redirect on auth errors on signup path', () => {
      window.location.pathname = '/signup';
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: {} };
      errorService.handleApiError(err);
      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  // ─── withErrorHandling ──────────────────────────────────────────

  describe('withErrorHandling', () => {
    it('returns response on success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const wrapped = errorService.withErrorHandling(fn);
      const result = await wrapped();
      expect(result).toBe('success');
    });

    it('calls handleApiError and re-throws on failure', async () => {
      const err = new Error('API error');
      err.response = { status: 500, data: {} };
      const fn = vi.fn().mockRejectedValue(err);
      const wrapped = errorService.withErrorHandling(fn, { url: '/api/test' });
      await expect(wrapped()).rejects.toThrow('API error');
      expect(toast.error).toHaveBeenCalled();
    });
  });

  // ─── withRetry ──────────────────────────────────────────────────

  describe('withRetry', () => {
    it('returns result on first success', async () => {
      const fn = vi.fn().mockResolvedValue('ok');
      const wrapped = errorService.withRetry(fn);
      await expect(wrapped()).resolves.toBe('ok');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries on NETWORK errors up to maxRetries', async () => {
      const networkErr = new Error('Network');
      networkErr.code = 'ERR_NETWORK';
      const fn = vi.fn()
        .mockRejectedValueOnce(networkErr)
        .mockRejectedValueOnce(networkErr)
        .mockResolvedValue('recovered');
      const wrapped = errorService.withRetry(fn, 2);
      await expect(wrapped()).resolves.toBe('recovered');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('throws after exhausting retries', async () => {
      const networkErr = new Error('Network');
      networkErr.code = 'ERR_NETWORK';
      const fn = vi.fn().mockRejectedValue(networkErr);
      const wrapped = errorService.withRetry(fn, 1);
      await expect(wrapped()).rejects.toThrow('Network');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('does not retry on SERVER errors', async () => {
      const serverErr = new Error('Server');
      serverErr.response = { status: 500 };
      const fn = vi.fn().mockRejectedValue(serverErr);
      const wrapped = errorService.withRetry(fn, 3);
      await expect(wrapped()).rejects.toThrow('Server');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries on TIMEOUT errors', async () => {
      const timeoutErr = new Error('Timeout');
      timeoutErr.response = { status: 408 };
      const fn = vi.fn()
        .mockRejectedValueOnce(timeoutErr)
        .mockResolvedValue('ok');
      const wrapped = errorService.withRetry(fn, 1);
      await expect(wrapped()).resolves.toBe('ok');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  // ─── Toast Helpers ──────────────────────────────────────────────

  describe('showSuccess', () => {
    it('calls toast.success with message and description', () => {
      errorService.showSuccess('Done!', 'Operation completed');
      expect(toast.success).toHaveBeenCalledWith('Done!', expect.objectContaining({ description: 'Operation completed' }));
    });
  });

  describe('showInfo', () => {
    it('calls toast.info with message', () => {
      errorService.showInfo('Heads up', 'Something noteworthy');
      expect(toast.info).toHaveBeenCalledWith('Heads up', expect.any(Object));
    });
  });

  describe('showWarning', () => {
    it('calls toast.warning with message', () => {
      errorService.showWarning('Warning', 'Be careful');
      expect(toast.warning).toHaveBeenCalledWith('Warning', expect.any(Object));
    });
  });

  describe('showError', () => {
    it('calls toast.error with message', () => {
      errorService.showError('Error', 'Something broke');
      expect(toast.error).toHaveBeenCalledWith('Error', expect.any(Object));
    });
  });

  // ─── Network Recovery ───────────────────────────────────────────

  describe('network recovery', () => {
    it('shows offline toast when window fires offline event', () => {
      window.dispatchEvent(new Event('offline'));
      expect(toast.warning).toHaveBeenCalledWith('You are offline', expect.any(Object));
    });

    it('shows restored toast when window fires online event after offline', () => {
      window.dispatchEvent(new Event('offline'));
      vi.clearAllMocks();
      window.dispatchEvent(new Event('online'));
      expect(toast.success).toHaveBeenCalledWith('Connection restored', expect.any(Object));
    });
  });
});
