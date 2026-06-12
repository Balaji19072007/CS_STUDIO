// controllers/leaderboardController.js
const { supabase } = require('../config/supabase');
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
        const { data: topUsers, error } = await supabase
            .from('users')
            .select('*')
            .neq('role', 'admin')
            .order('total_points', { ascending: false })
            .limit(100);

        if (error) throw error;

        // 2. Format data for the front-end
        const leaderboardData = (topUsers || []).map((user, index) => ({
            rank: index + 1,
            _id: user.id, // Frontend expects _id
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
            username: user.username,
            solved: user.problems_solved,
            accuracy: Math.round(user.average_accuracy) || 0,
            streak: user.current_streak,
            points: user.total_points,
            photoUrl: user.photo_url,
            updatedAt: user.updated_at
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
        const { data: allUsers, error: listError } = await supabase
            .from('users')
            .select('id, total_points')
            .neq('role', 'admin')
            .order('total_points', { ascending: false })
            .limit(1000);

        if (listError) throw listError;

        // 2. Find current user's position
        let userRank = (allUsers || []).findIndex(user => user.id === userId);
        let rank = userRank !== -1 ? userRank + 1 : null;

        // 3. Get current user detailed
        const { data: currentUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (userError || !currentUser) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        if (!rank) rank = 1001;

        res.json({
            success: true,
            rank: rank,
            totalUsers: (allUsers || []).length,
            user: {
                _id: currentUser.id,
                firstName: currentUser.first_name,
                lastName: currentUser.last_name,
                username: currentUser.username,
                problemsSolved: currentUser.problems_solved,
                totalPoints: currentUser.total_points,
                currentStreak: currentUser.current_streak,
                averageAccuracy: currentUser.average_accuracy,
                photoUrl: currentUser.photo_url
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
        const { count, error } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .neq('role', 'admin')
            .gt('problems_solved', 0);

        if (error) throw error;

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
