// frontend/src/api/leaderboardApi.js

import { API_ENDPOINTS, getHeaders, buildApiUrl } from '../config/api.js';

/**
 * Fetches the global leaderboard data from the backend.
 * @param {string} timeframe - e.g., 'all-time', 'monthly', 'weekly', 'daily'
 * @param {string} category - e.g., 'all', 'easy', 'medium', 'hard'
 */
export const fetchLeaderboard = async (timeframe = 'all-time', category = 'all') => {
    // Construct query parameters
    const query = new URLSearchParams({ timeframe, category }).toString();
    const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.GET}?${query}`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(false),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || `Failed to fetch leaderboard data: ${response.statusText}`);
    }

    return data;
};

/**
 * Fetch current user's rank and stats
 */
export const fetchUserRank = async () => {
    const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.USER_RANK}`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(true),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || `Failed to fetch user rank: ${response.statusText}`);
    }

    return data;
};

/**
 * Fetch total number of users with solved problems
 */
export const fetchTotalUsers = async () => {
    const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.TOTAL_USERS}`);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(false),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || `Failed to fetch total users: ${response.statusText}`);
    }

    return data;
};