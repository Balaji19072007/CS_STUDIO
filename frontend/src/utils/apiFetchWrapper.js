import { buildApiUrl } from '../config/api.js';
import { handleApiError } from '../services/errorService.js';

const getAuthHeaders = (isFormData = false) => {
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) headers['x-auth-token'] = token;
  return headers;
};

const parseResponse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const createError = (response, body) => {
  const error = new Error(body?.msg || body?.message || `Request failed with status ${response.status}`);
  error.status = response.status;
  error.response = { status: response.status, data: body };
  error.code = 'FETCH_ERROR';
  return error;
};

export const apiFetch = async (path, options = {}) => {
  const url = buildApiUrl(path);
  const { body, params, signal, timeout = 15000, ...restOptions } = options;

  // Build query string
  const queryString = params ? '?' + new URLSearchParams(
    Object.entries(params).filter((entry) => entry[1] != null).map(([k, v]) => [k, String(v)])
  ).toString() : '';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const isFormData = body instanceof FormData;
    const { headers: extraHeaders, ...otherOptions } = restOptions;
    const response = await fetch(`${url}${queryString}`, {
      method: otherOptions.method || (body ? 'POST' : 'GET'),
      headers: { ...getAuthHeaders(isFormData), ...extraHeaders },
      body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
      signal: signal || controller.signal,
      credentials: 'include',
      ...otherOptions,
    });

    clearTimeout(timeoutId);
    const data = await parseResponse(response);

    if (!response.ok) {
      throw createError(response, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Normalize AbortError to timeout
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Request timed out');
      timeoutError.code = 'ECONNABORTED';
      timeoutError.status = 408;
      throw timeoutError;
    }

    throw error;
  }
};

export const fetchWithErrorHandling = async (path, options = {}) => {
  try {
    return await apiFetch(path, options);
  } catch (error) {
    handleApiError(error, { source: 'apiFetch', url: path });
    throw error;
  }
};

// Convenience HTTP method wrappers
export const api = {
  get: (path, params, options = {}) =>
    fetchWithErrorHandling(path, { ...options, method: 'GET', params }),

  post: (path, body, options = {}) =>
    fetchWithErrorHandling(path, { ...options, method: 'POST', body }),

  put: (path, body, options = {}) =>
    fetchWithErrorHandling(path, { ...options, method: 'PUT', body }),

  patch: (path, body, options = {}) =>
    fetchWithErrorHandling(path, { ...options, method: 'PATCH', body }),

  delete: (path, options = {}) =>
    fetchWithErrorHandling(path, { ...options, method: 'DELETE' }),
};

// Silent fetch (no toast notifications - for background polls)
export const apiFetchSilent = async (path, options = {}) => {
  try {
    return await apiFetch(path, options);
  } catch {
    return null;
  }
};

export default api;
