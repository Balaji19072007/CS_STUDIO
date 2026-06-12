const { supabase } = require('../config/supabase');
const { runCodeTest } = require('../util/codeRunner'); // Keep existing code runner
const TestEvaluationService = require('../util/testEvaluationService');
const TestInputCleaner = require('../util/testInputCleaner');

// @route   GET /api/problems
exports.getProblems = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
        const offset = (page - 1) * limit;
        const difficulty = req.query.difficulty;
        const language = req.query.language;

        // 1. Try Supabase first
        let problems, count, error;

        try {
            let query = supabase
                .from('problems')
                .select('id, title, language, difficulty, category, is_course_problem', { count: 'exact' })
                .eq('is_course_problem', false);

            if (difficulty) query = query.eq('difficulty', difficulty);
            if (language) query = query.eq('language', language);

            const result = await query
                .order('id', { ascending: true })
                .range(offset, offset + limit - 1);

            problems = result.data;
            error = result.error;
            count = result.count;

            if (error) throw error;
        } catch (supaErr) {
            console.warn('Supabase unavailable, falling back to local JSON:', supaErr.message);
            // Fallback: load from local JSON files
            const { loadAllProblems } = require('../util/problemUtils');
            const allProblems = await loadAllProblems();
            const regularOnly = allProblems.filter(p =>
                p.problemType === 'regular' &&
                (!difficulty || p.difficulty === difficulty) &&
                (!language || p.language === language)
            );
            problems = regularOnly.slice(offset, offset + limit).map(p => ({
                id: p.id,
                title: p.title,
                language: p.language,
                difficulty: p.difficulty,
                category: p.category,
                is_course_problem: false
            }));
            count = regularOnly.length;
        }

        // 2. Fetch User Progress if logged in
        let userProgressMap = {};
        if (userId) {
            try {
                const { data: progress } = await supabase
                    .from('progress')
                    .select('problem_id, status')
                    .eq('user_id', userId);

                if (progress) {
                    progress.forEach(p => userProgressMap[p.problem_id] = p.status);
                }
            } catch (_) {
                // Progress read failure is non-fatal
            }
        }

        // 3. Map status
        const projected = (problems || []).map(p => ({
            id: p.id,
            problemId: p.id,
            title: p.title,
            language: p.language,
            difficulty: p.difficulty,
            category: p.category,
            status: userProgressMap[p.id] || 'todo'
        }));

        res.json({
            success: true,
            problems: projected,
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit)
            }
        });
    } catch (err) {
        console.error('getProblems error:', err.message);
        res.status(500).json({ msg: 'Server Error fetching problems' });
    }
};

// @route   GET /api/problems/:id
exports.getProblemById = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const userId = req.user ? req.user.id : null;

        const { data: problem, error } = await supabase
            .from('problems')
            .select('*')
            .eq('id', problemId)
            .single();

        if (error || !problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        let isSolved = false;
        if (userId) {
            const { data: progress } = await supabase
                .from('progress')
                .select('status')
                .eq('user_id', userId)
                .eq('problem_id', problemId)
                .single();

            if (progress && progress.status === 'solved') isSolved = true;
        }

        res.json({
            ...problem,
            problemId: problem.id,
            solved: isSolved,
            isSolved: isSolved
        });

    } catch (err) {
        console.error('getProblemById error:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route   POST /api/problems/:id/run-tests
exports.runTestCases = async (req, res) => {
    const { code, language } = req.body;
    const problemId = parseInt(req.params.id);

    try {
        // Fetch test cases from DB
        const { data: problem, error } = await supabase
            .from('problems')
            .select('test_cases')
            .eq('id', problemId)
            .single();

        if (error || !problem || !problem.test_cases) {
            return res.status(404).json({ success: false, message: 'Test cases not found' });
        }

        // Run Tests
        const evaluationService = new TestEvaluationService();
        const results = [];
        let passedCount = 0;

        for (const test of problem.test_cases) {
            try {
                // Clean the input to extract only actual values
                const cleanedInput = TestInputCleaner.cleanTestInput(test.input, language);

                const result = await runCodeTest(language, code, cleanedInput);
                const cleanedOutput = evaluationService.cleanOutput(result.stdout);
                const expected = test.expected ?? test.expected_output ?? test.expectedOutput;
                const comparison = evaluationService.compareOutputs(cleanedOutput, expected, language);

                if (comparison.passed) passedCount++;

                results.push({
                    input: test.input,
                    expected: expected,
                    output: cleanedOutput,
                    error: result.stderr,
                    passed: comparison.passed
                });
            } catch (e) {
                results.push({ input: test.input, passed: false, error: e.message });
            }
        }

        const totalTests = problem.test_cases.length;
        const accuracy = totalTests > 0 ? (passedCount / totalTests) * 100 : 0;

        // Update Progress (Attempted)
        if (req.user) {
            // Fetch existing first to check status
            const { data: currentProg } = await supabase
                .from('progress')
                .select('status')
                .eq('user_id', req.user.id)
                .eq('problem_id', problemId)
                .single();

            const shouldUpdateStatus = !currentProg || currentProg.status !== 'solved';

            const updateData = {
                user_id: req.user.id,
                problem_id: problemId,
                last_submission: new Date()
            };

            if (shouldUpdateStatus) {
                updateData.status = 'attempted';
            }

            await supabase.from('progress').upsert(updateData, { onConflict: 'user_id, problem_id' });
        }

        res.json({
            success: true,
            passed: accuracy === 100,
            accuracy: Math.floor(accuracy),
            results
        });

    } catch (err) {
        console.error('Run tests error:', err.message);
        res.status(500).json({ success: false, msg: 'Error running tests' });
    }
};

// @route   POST /api/problems/:id/submit
exports.submitProblem = async (req, res) => {
    const { code, language, timeSpent } = req.body;
    const problemId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const { data: problem } = await supabase
            .from('problems')
            .select('test_cases')
            .eq('id', problemId)
            .single();

        if (!problem) return res.status(404).json({ message: 'Problem not found' });

        // Run all tests
        const evaluationService = new TestEvaluationService();
        let passedCount = 0;
        let firstFailure = null;

        for (const test of problem.test_cases) {
            // Clean the input to extract only actual values
            const cleanedInput = TestInputCleaner.cleanTestInput(test.input, language);

            const result = await runCodeTest(language, code, cleanedInput);
            const cleanedOutput = evaluationService.cleanOutput(result.stdout);
            const expected = test.expected ?? test.expected_output ?? test.expectedOutput;
            const comparison = evaluationService.compareOutputs(cleanedOutput, expected, language);
            if (comparison.passed) passedCount++;
            else if (!firstFailure) firstFailure = { input: test.input, expected: expected, actual: cleanedOutput };
        }

        const totalTests = problem.test_cases.length;
        const accuracy = (passedCount / totalTests) * 100;
        const isSolved = accuracy === 100;

        // Fetch existing progress to preserve 'solved' state and 'solved_at'
        const { data: existingProgress, error: fetchError } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .eq('problem_id', problemId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "Row not found" error
            console.error('Error fetching progress:', fetchError);
        }

        let newStatus = isSolved ? 'solved' : 'attempted';
        if (existingProgress && existingProgress.status === 'solved') newStatus = 'solved'; // Don't downgrade

        // Critical Fix: Preserve original solved_at date
        // If it was already solved (has solved_at), KEEP IT.
        // If it is newly solved, set to NOW.
        // If not solved, set to NULL (unless it was previously solved, handled by line below).
        let solvedAt = isSolved ? new Date() : null;

        if (existingProgress) {
            if (existingProgress.solved_at) {
                // If we already have a solved date, NEVER overwrite it, regardless of current outcome 
                // (assuming we don't want to revoke it if they fail later, which line 208 ensures status is kept solved)
                solvedAt = existingProgress.solved_at;
            } else if (existingProgress.status === 'solved' && !existingProgress.solved_at) {
                // Edge case: Status is solved but date missing? Fix it now.
                solvedAt = new Date();
            }
        }

        // Update Progress
        const { error: upsertError } = await supabase.from('progress').upsert({
            user_id: userId,
            problem_id: problemId,
            status: newStatus,
            best_accuracy: Math.max(existingProgress?.best_accuracy || 0, accuracy),
            time_spent: (existingProgress?.time_spent || 0) + (parseInt(timeSpent) || 0),
            last_submission: new Date(),
            solved_at: solvedAt
        }, { onConflict: 'user_id, problem_id' });

        if (upsertError) {
            console.error('Progress Upsert Error:', upsertError);
            throw new Error(`Failed to save progress: ${upsertError.message}`);
        }

        // Update User Stats (atomic increment via RPC — race-condition-free)
        if (isSolved && (!existingProgress || existingProgress.status !== 'solved')) {
            const { error: rpcError } = await supabase.rpc('increment_user_stats', {
                p_user_id: userId,
                p_solved_inc: 1,
                p_points_inc: 100
            });
            if (rpcError) console.error('User Stats RPC Error:', rpcError);
        }

        // --- STREAK UPDATE LOGIC (atomic via RPC) ---
        if (isSolved) {
            const { data: streakUser, error: streakFetchError } = await supabase
                .from('users')
                .select('current_streak, last_streak_update')
                .eq('id', userId)
                .single();

            if (!streakFetchError && streakUser) {
                const userTimezone = req.body.timezone || 'UTC';
                const now = new Date();

                const getDateInTimezone = (date, timeZone) => {
                    return new Intl.DateTimeFormat('en-CA', {
                        timeZone: timeZone,
                        year: 'numeric', month: '2-digit', day: '2-digit'
                    }).format(date);
                };

                const todayStr = getDateInTimezone(now, userTimezone);

                let lastStr = null;
                if (streakUser.last_streak_update) {
                    lastStr = getDateInTimezone(new Date(streakUser.last_streak_update), userTimezone);
                }

                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = getDateInTimezone(yesterday, userTimezone);

                if (lastStr !== todayStr) {
                    let newStreak = 1;
                    if (lastStr === yesterdayStr) {
                        newStreak = (streakUser.current_streak || 0) + 1;
                    }

                    const { error: streakUpdateError } = await supabase
                        .rpc('update_user_streak', {
                            p_user_id: userId,
                            p_new_streak: newStreak,
                            p_last_update: now.toISOString()
                        });

                    if (streakUpdateError) console.error('Streak Update RPC Error:', streakUpdateError);
                }
            }
        }

        res.json({
            success: true,
            isSolved,
            accuracy: Math.floor(accuracy),
            passedCount,
            totalTests,
            message: isSolved ? 'Solution accepted!' : 'Keep trying!',
            failureDetails: firstFailure
        });

    } catch (err) {
        console.error('Submit error:', err.message);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

// @route   GET /api/problems/daily
exports.getDailyProblem = async (req, res) => {
    try {
        // 1. Fetch all IDs - Sorted to ensure stability
        const { data: ids, error: idsError } = await supabase.from('problems').select('id').order('id', { ascending: true });

        if (idsError) throw idsError;
        if (!ids || ids.length === 0) return res.status(404).json({ msg: 'No problems found' });

        // 2. Handle Timezone & Date
        let userTimezone = req.query.timezone || 'UTC';
        try {
            userTimezone = decodeURIComponent(userTimezone);
            // Validation check
            new Intl.DateTimeFormat(undefined, { timeZone: userTimezone });
        } catch (tzError) {
            console.warn(`Invalid timezone '${userTimezone}', falling back to UTC.`);
            userTimezone = 'UTC';
        }

        // Get "Today" string in User's Timezone (e.g. "2024-02-03")
        const now = new Date();
        const dateFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: userTimezone,
            year: 'numeric', month: '2-digit', day: '2-digit'
        });
        const todayStr = dateFormatter.format(now);

        // 3. Fetch User Progress (to skip already solved problems)
        let solvedMap = {}; // { problem_id: { status, solved_at_str } }
        const userId = req.user ? req.user.id : null;

        if (userId) {
            const { data: progress } = await supabase
                .from('progress')
                .select('problem_id, status, solved_at')
                .eq('user_id', userId);

            if (progress) {
                progress.forEach(p => {
                    let solvedDay = null;
                    if (p.solved_at) {
                        // Format solved_at to the USER's timezone to check if it was "Today"
                        solvedDay = dateFormatter.format(new Date(p.solved_at));
                    }
                    solvedMap[p.problem_id] = { status: p.status, solvedDay };
                });
            }
        }

        // 4. Stable Selection Logic (Linear Probing)
        // We want a personalized daily problem that:
        // - Is NOT solved (prior to today).
        // - Is STABLE for the day (if I refresh, I get the same one).
        // - Is STABLE if I solve it (it shows as "Completed" for the rest of the day).

        // Seed: Date + UserID (or 'guest')
        // This ensures every user gets a stable start index for the day.
        const seedStr = todayStr + (userId || 'guest');

        // Simple String Hash
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        const startIdx = Math.abs(hash) % ids.length;

        let selectedId = null;

        // Iterate through problems starting at hash index
        for (let i = 0; i < ids.length; i++) {
            const idx = (startIdx + i) % ids.length;
            const pid = ids[idx].id;
            const prog = solvedMap[pid];

            // Condition to select this problem:
            // 1. No progress (Unsolved) OR
            // 2. Progress is NOT 'solved' (Attempted) OR
            // 3. Solved TODAY (We want to show the "Completed" state for today's challenge)

            const isSolved = prog && prog.status === 'solved';
            const isSolvedToday = isSolved && prog.solvedDay === todayStr;

            if (!isSolved || isSolvedToday) {
                selectedId = pid;
                break;
            }
            // If isSolved AND NOT isSolvedToday -> It was solved in the past. Skip it.
        }

        // Fallback: If user has solved ALL problems in the past (Wow!), just pick the specific daily one (startIdx).
        if (!selectedId) {
            selectedId = ids[startIdx].id;
        }

        console.log(`📅 Daily Challenge: User=${userId || 'Guest'} Date=${todayStr} SelectedID=${selectedId}`);

        // 5. Fetch Problem Details
        const { data: problem, error: probError } = await supabase.from('problems').select('*').eq('id', selectedId).single();

        if (probError) throw probError;
        if (!problem) throw new Error(`Problem ${selectedId} not found`);

        const isUserSolved = solvedMap[selectedId]?.status === 'solved';

        res.json({
            ...problem,
            problemId: problem.id,
            solved: isUserSolved, // Frontend uses this to render "Completed" UI
            debug: { todayStr, userTimezone, selectedId }
        });

    } catch (err) {
        console.error('Daily Challenge Error:', err.message);
        res.status(500).json({ msg: 'Error fetching daily problem', error: err.message });
    }
};

exports.getRecommendedProblems = async (req, res) => {
    // Basic implementation: Random 3 unsolved
    try {
        const userId = req.user.id;
        const { data: solved } = await supabase.from('progress').select('problem_id').eq('user_id', userId).eq('status', 'solved');
        const solvedIds = solved ? solved.map(s => s.problem_id) : [];

        // Not 'in' solvedIds
        let query = supabase.from('problems').select('*').limit(3);
        if (solvedIds.length > 0) {
            query = query.not('id', 'in', `(${solvedIds.join(',')})`);
        }

        const { data: recommended } = await query;
        res.json(recommended || []);

    } catch (err) {
        res.status(500).json([]);
    }
};

// Implement other timer endpoints if needed (Update progress essentially)
exports.getProblemTimer = (req, res) => res.json({ success: true, timer: { isRunning: false, timeRemaining: 600 } });
exports.startProblemTimer = (req, res) => res.json({ success: true });
exports.stopProblemTimer = (req, res) => res.json({ success: true });
exports.updateProgress = (req, res) => res.json({ success: true }); // Handled by submit mostly
exports.getProblemTestCases = async (req, res) => {
    // Just fetch test cases
    const { data } = await supabase.from('problems').select('test_cases').eq('id', req.params.id).single();
    res.json({ success: true, testCases: data?.test_cases || [] });
};
exports.getProblemProgress = async (req, res) => {
    // Fetch progress
    const { data } = await supabase.from('progress').select('*').eq('user_id', req.user.id).eq('problem_id', req.params.id).single();
    res.json({ success: true, progress: data || {} });
};