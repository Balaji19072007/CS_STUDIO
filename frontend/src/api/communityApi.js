import { api } from '../utils/apiFetchWrapper.js';

const API_BASE_URL = '/api/community';

export const communityAPI = {
    getAllDiscussions: () => api.get(API_BASE_URL),

    getDiscussionById: (id) => api.get(`${API_BASE_URL}/${id}`),

    createDiscussion: (data) => api.post(API_BASE_URL, data),

    addComment: (id, content) => api.post(`${API_BASE_URL}/${id}/comment`, { content }),

    toggleLike: (id) => api.put(`${API_BASE_URL}/${id}/like`),

    deleteDiscussion: (id) => api.delete(`${API_BASE_URL}/${id}`),
};
