// controllers/leaderboardController.js
const User = require('../models/User');
const { cache } = require('../util/cache');

// @route   GET /api/leaderboard
// @desc    Get top users sorted by problems solved and points
// @access  Public
exports.getGlobalLeaderboard = async (req, res) => {
    try {
        const cacheKey = 'leaderboard:global';
        const cached = cache.get(cacheKey);
        if (cached) {
            return res.json(cached);
        }

        // 1. Fetch Top Users
        const topUsers = await User.getTopUsers(100);

        // 2. Format data for the front-end
        const leaderboardData = topUsers.map((user, index) => ({
            rank: index + 1,
            _id: user.id, // Frontend expects _id
            name: `${user.firstName} ${user.lastName}`,
            username: user.username,
            solved: user.problemsSolved,
            accuracy: Math.round(user.averageAccuracy) || 0,
            streak: user.currentStreak,
            points: user.totalPoints,
            photoUrl: user.photoUrl,
            updatedAt: user.updatedAt
        }));

        cache.set(cacheKey, leaderboardData, 120); // Cache for 2 minutes
        res.json(leaderboardData);
    } catch (err) {
        console.error('Leaderboard error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error fetching leaderboard',
            error: err.message
        });
    }
};

// @route   GET /api/leaderboard/user-rank
// @desc    Get current user's rank and stats
// @access  Private
exports.getUserRank = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get Top Users to calculate rank
        const allUsers = await User.getTopUsers(1000);

        // 2. Find current user's position
        let userRank = allUsers.findIndex(user => user.id === userId);
        let rank = userRank !== -1 ? userRank + 1 : null;

        // 3. Get current user detailed
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        if (!rank) rank = 1001;

        res.json({
            success: true,
            rank: rank,
            totalUsers: allUsers.length,
            user: {
                _id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                username: currentUser.username,
                problemsSolved: currentUser.problemsSolved,
                totalPoints: currentUser.totalPoints,
                currentStreak: currentUser.currentStreak,
                averageAccuracy: currentUser.averageAccuracy,
                photoUrl: currentUser.photoUrl
            }
        });

    } catch (err) {
        console.error('User rank error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error fetching user rank',
            error: err.message
        });
    }
};

// @route   GET /api/leaderboard/total-users
// @desc    Get total number of users with solved problems
// @access  Public
exports.getTotalUsers = async (req, res) => {
    try {
        const count = await User.count({ hasSolvedProblems: true });
        res.json({
            success: true,
            totalUsers: count || 0
        });
    } catch (err) {
        console.error('Total users error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error fetching total users',
            error: err.message
        });
    }
};
