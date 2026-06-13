import { api, apiFetch } from '../utils/apiFetchWrapper.js';

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

    const isFormData = profileData instanceof FormData;

    if (isFormData) {
        return apiFetch(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            body: profileData,
        });
    }

    return api.put(`${API_BASE_URL}/profile`, profileData);
};
