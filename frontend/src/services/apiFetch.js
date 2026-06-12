import monitoring from './monitoring';

// Wraps fetch to add error tracking and timeout support
const apiFetch = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = options.timeout || 15000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const error = new Error(errorBody.message || errorBody.msg || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = errorBody;
      throw error;
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      const timeoutErr = new Error('Request timed out');
      timeoutErr.status = 408;
      monitoring.captureException(timeoutErr, { url, timeout });
      throw timeoutErr;
    }

    if (!err.status) {
      monitoring.captureException(err, { url });
    }

    throw err;
  }
};

export default apiFetch;
