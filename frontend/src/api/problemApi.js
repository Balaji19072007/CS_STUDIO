import socketService from '../services/socketService';
import { buildApiUrl } from '../config/api.js';

const API_BASE_URL = '/api/problems';

/**
 * Utility function to handle API response parsing and error checking.
 */
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || data.msg || `API Error: ${response.statusText}`);
    }
    return data;
};

/**
 * Fetch the daily problem
 */
export const fetchDailyProblem = async () => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['x-auth-token'] = token;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await fetch(buildApiUrl(`${API_BASE_URL}/daily?version=${Date.now()}&timezone=${encodeURIComponent(timezone)}`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Fetch recommended problems
 */
export const fetchRecommendedProblems = async () => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/recommended`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Fetch all coding problems
 */
export const fetchAllProblems = async () => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Fetch a single problem by ID
 */
export const fetchProblemById = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Fetch user progress for a specific problem
 */
export const fetchProblemProgress = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return null; // Logic in component handles "if loggedIn" check separately, but good safety.

    const headers = { 'x-auth-token': token };

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}/progress`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Fetch all test cases for a problem
 */
export const fetchProblemTestCases = async (id) => {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}/test-cases`), {
        method: 'GET',
        headers,
        credentials: 'include'
    });
    return handleResponse(response);
};

/**
 * Submit a solution for evaluation
 */
export const submitSolution = async (id, code, language, timeSpent, timezone) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}/submit`), {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ code, language, timeSpent, timezone })
    });
    return handleResponse(response);
};

/**
 * Run code against test cases (HTTP based execution)
 */
export const runTestCases = async (id, code, language) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['x-auth-token'] = token;

    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}/run-tests`), {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ code, language })
    });
    return handleResponse(response);
};

// --- Socket Related Functions ---

/**
 * Setup listeners for real-time compiler output
 */
export const setupCompilerSocket = (onOutputCallback) => {
    socketService.setupCompilerListeners(onOutputCallback);
};

/**
 * Send code for real-time execution via socket
 */
export const sendCodeForExecution = (code, language, input = '', args = '') => {
    socketService.executeCode(code, language, input, args);
};

/**
 * Send input to running program via socket
 */
export const sendInputToProgram = (input) => {
    socketService.sendInput(input);
};

/**
 * Stop running code via socket
 */
export const stopCodeExecution = () => {
    socketService.stopExecution();
};

/**
 * Update user progress for a specific problem (e.g. mark attempting)
 */
export const updateProblemProgress = async (id, payload) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['x-auth-token'] = token;

    // payload: { status: 'attempted', timeSpent: 123 }
    const response = await fetch(buildApiUrl(`${API_BASE_URL}/${id}/progress`), {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(payload)
    });
    return handleResponse(response);
};
