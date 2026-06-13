// frontend/src/api/leaderboardApi.js

import { API_ENDPOINTS, getHeaders, buildApiUrl } from '../config/api.js';

/**
 * Fetches the global leaderboard data from the backend.
 * @param {string} timeframe - e.g., 'all-time', 'monthly', 'weekly', 'daily'
 * @param {string} category - e.g., 'all', 'easy', 'medium', 'hard'
 */
export const fetchLeaderboard = async (timeframe = 'all-time', category = 'all') => {
    try {
        const query = new URLSearchParams({ timeframe, category }).toString();
        const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.GET}?${query}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(false),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(text ? JSON.parse(text).msg || `HTTP ${response.status}` : `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        if (err.message && err.message.startsWith('HTTP')) throw err;
        throw new Error(err.message || 'Failed to fetch leaderboard data');
    }
};

/**
 * Fetch current user's rank and stats
 */
export const fetchUserRank = async () => {
    try {
        const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.USER_RANK}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(true),
            credentials: 'include',
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(text ? JSON.parse(text).msg || `HTTP ${response.status}` : `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        if (err.message && err.message.startsWith('HTTP')) throw err;
        throw new Error(err.message || 'Failed to fetch user rank');
    }
};

/**
 * Fetch total number of users with solved problems
 */
export const fetchTotalUsers = async () => {
    try {
        const url = buildApiUrl(`${API_ENDPOINTS.LEADERBOARD.TOTAL_USERS}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(false),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(text ? JSON.parse(text).msg || `HTTP ${response.status}` : `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        if (err.message && err.message.startsWith('HTTP')) throw err;
        throw new Error(err.message || 'Failed to fetch total users');
    }
};