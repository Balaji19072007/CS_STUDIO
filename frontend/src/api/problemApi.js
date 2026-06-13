import socketService from '../services/socketService';
import { api } from '../utils/apiFetchWrapper.js';

const API_BASE_URL = '/api/problems';

export const fetchDailyProblem = async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return api.get(`${API_BASE_URL}/daily`, { timezone });
};

export const fetchRecommendedProblems = async () => {
    return api.get(`${API_BASE_URL}/recommended`);
};

export const fetchAllProblems = async () => {
    const data = await api.get(`${API_BASE_URL}`);
    return data.problems || data;
};

export const fetchProblemById = async (id) => {
    return api.get(`${API_BASE_URL}/${id}`);
};

export const fetchProblemProgress = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return api.get(`${API_BASE_URL}/${id}/progress`);
};

export const fetchProblemTestCases = async (id) => {
    return api.get(`${API_BASE_URL}/${id}/test-cases`);
};

export const submitSolution = async (id, code, language, timeSpent, timezone) => {
    return api.post(`${API_BASE_URL}/${id}/submit`, { code, language, timeSpent, timezone });
};

export const runTestCases = async (id, code, language) => {
    return api.post(`${API_BASE_URL}/${id}/run-tests`, { code, language });
};

export const setupCompilerSocket = (onOutputCallback) => {
    socketService.setupCompilerListeners(onOutputCallback);
};

export const sendCodeForExecution = (code, language, input = '', args = '') => {
    socketService.executeCode(code, language, input, args);
};

export const sendInputToProgram = (input) => {
    socketService.sendInput(input);
};

export const stopCodeExecution = () => {
    socketService.stopExecution();
};

export const updateProblemProgress = async (id, payload) => {
    return api.post(`${API_BASE_URL}/${id}/progress`, payload);
};
