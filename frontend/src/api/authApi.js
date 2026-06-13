import { api } from '../utils/apiFetchWrapper.js';

const API_BASE_URL = '/api/auth';

export const signInLocal = async (email, password) => {
    return api.post(`${API_BASE_URL}/signin`, { email, password });
};

export const signInGoogle = async (idToken) => {
    return api.post(`/api/google-auth`, { idToken });
};

export const updateProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Authentication token missing.");

    return api.put(`${API_BASE_URL}/profile`, profileData);
};
