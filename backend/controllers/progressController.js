const { supabase } = require('../config/supabase');

// @route   POST /api/problems/:problemId/progress
// @desc    Update user progress when solving/attempting a problem
// @access  Private
exports.updateProgress = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { accuracy, isSolved } = req.body;
        const userId = req.user.id;
        const pid = parseInt(problemId);

        // Find existing progress entry
        const { data: existing } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .eq('problem_id', pid)
            .maybeSingle();

        const now = new Date().toISOString();
        let bestAccuracy = existing ? Math.max(existing.best_accuracy, accuracy || 0) : (accuracy || 0);
        let status = existing ? existing.status : 'attempted';
        let solvedAt = existing ? existing.solved_at : null;

        if (isSolved) {
            status = 'solved';
            if (!solvedAt) solvedAt = now;
        } else if (status !== 'solved') {
            status = 'attempted';
        }

        const progressData = {
            user_id: userId,
            problem_id: pid,
            status,
            best_accuracy: bestAccuracy,
            last_submission: now,
            ...(solvedAt ? { solved_at: solvedAt } : {}),
        };

        const { data: progress, error } = await supabase
            .from('progress')
            .upsert(progressData, { onConflict: 'user_id, problem_id' })
            .select()
            .single();

        if (error) throw error;

        // Trigger atomic user stats update
        if (isSolved) {
            await supabase.rpc('increment_user_stats', {
                p_user_id: userId,
                p_solved_inc: 1,
                p_points_inc: accuracy >= 100 ? 100 : Math.round((accuracy || 0) * 10),
            });
        }

        res.json({
            success: true,
            progress: {
                problemId: progress.problem_id,
                status: progress.status,
                bestAccuracy: progress.best_accuracy,
                lastSubmission: progress.last_submission
            }
        });

    } catch (err) {
        console.error('Progress update error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error updating progress',
            error: err.message
        });
    }
};

// @route   GET /api/progress/history
// @desc    Get full problem history for user with problem details (REGULAR PROBLEMS ONLY)
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: historyRows, error } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .lt('problem_id', 1001)
            .order('last_submission', { ascending: false });

        if (error) throw error;

        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();

        const problemMap = {};
        allProblems.forEach(p => { problemMap[p.id] = p; });

        const enrichedHistory = (historyRows || []).map(h => {
            const isActuallySolved = h.best_accuracy === 100;
            return {
                problemId: h.problem_id,
                title: problemMap[h.problem_id]?.title || 'Unknown Problem',
                difficulty: problemMap[h.problem_id]?.difficulty || 'Medium',
                status: isActuallySolved ? 'solved' : h.status,
                bestAccuracy: h.best_accuracy,
                timeTaken: h.time_spent !== undefined ? h.time_spent : 0,
                lastSubmission: h.last_submission,
                solvedAt: isActuallySolved ? (h.solved_at || h.last_submission) : h.solved_at
            };
        });

        res.json({
            success: true,
            history: enrichedHistory
        });

    } catch (err) {
        console.error('Get history error:', err.message);
        res.status(500).json({ success: false, msg: 'Server Error fetching history' });
    }
};

// @route   GET /api/progress/user-stats
// @desc    Get current user's progress statistics (Summary + Difficulty Breakdown) - REGULAR PROBLEMS ONLY
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        const userStats = user ? {
            problemsSolved: user.problems_solved,
            totalPoints: user.total_points,
            currentStreak: user.current_streak,
            averageAccuracy: user.average_accuracy
        } : {};

        const { data: allProgress, error: progError } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .lt('problem_id', 1001);

        if (progError) throw progError;

        const userProgress = allProgress || [];

        const stats = {
            solved: userProgress.filter(p => p.status === 'solved').length,
            attempted: userProgress.filter(p => p.status === 'attempted').length,
            todo: 0
        };

        const solvedIds = userProgress
            .filter(p => p.status === 'solved')
            .map(p => p.problem_id);

        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();
        const regularProblems = allProblems.filter(p => p.problemType === 'regular' || p.id < 1001);

        const difficultyBreakdown = { Easy: 0, Medium: 0, Hard: 0 };
        solvedIds.forEach(pid => {
            const prob = regularProblems.find(p => p.id === pid);
            if (prob && difficultyBreakdown[prob.difficulty] !== undefined) {
                difficultyBreakdown[prob.difficulty]++;
            }
        });

        const totalBreakdown = {
            Easy: 0, Medium: 0, Hard: 0, Total: regularProblems.length
        };
        regularProblems.forEach(p => {
            if (totalBreakdown[p.difficulty] !== undefined) {
                totalBreakdown[p.difficulty]++;
            }
        });

        const uniqueTouched = new Set(userProgress.map(p => p.problem_id)).size;
        stats.todo = totalBreakdown.Total - uniqueTouched;

        res.json({
            success: true,
            userStats,
            progressStats: stats,
            difficultyBreakdown,
            totalBreakdown
        });

    } catch (err) {
        console.error('User stats error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error fetching user stats',
            error: err.message
        });
    }
};