const { supabase } = require('../config/supabase');
const { cache } = require('../util/cache');

const _problemCache = { data: null, loaded: false };

async function _getCachedProblems() {
  if (!_problemCache.loaded) {
    const { loadAllProblems } = require('../util/problemUtils');
    _problemCache.data = await loadAllProblems();
    _problemCache.loaded = true;
  }
  return _problemCache.data;
}

exports.refreshProblemCache = () => { _problemCache.loaded = false; };

exports.getAllCourses = async (req, res) => {
    try {
        const cacheKey = 'courses:all';
        const cached = cache.get(cacheKey);
        if (cached) {
            return res.json({ success: true, courses: cached });
        }

        let courses, phases, topics;

        try {
            const courseResult = await supabase
                .from('courses')
                .select('*');
            courses = courseResult.data;
            if (courseResult.error) throw courseResult.error;

            const phaseResult = await supabase
                .from('phases')
                .select('course_id');
            phases = phaseResult.data;

            const topicResult = await supabase
                .from('topics')
                .select('*, phases!inner(course_id)');
            topics = topicResult.data;
        } catch (supaErr) {
            console.warn('Supabase unavailable for courses, using fallback data:', supaErr.message);
            courses = [
                { id: 'c-programming', title: 'C Programming', description: 'Master C programming from basics to advanced concepts.', icon: '💻', category: 'programming', difficulty: 'Beginner', duration: '12 weeks', is_premium: false, cover_image: null },
                { id: 'java-programming', title: 'Java Programming', description: 'Master Java programming from basics to advanced concepts.', icon: '☕', category: 'programming', difficulty: 'Beginner', duration: '12 weeks', is_premium: false, cover_image: null },
                { id: 'python-programming', title: 'Python Programming', description: 'Learn Python programming from scratch.', icon: '🐍', category: 'programming', difficulty: 'Beginner', duration: '10 weeks', is_premium: false, cover_image: null },
                { id: 'cpp-programming', title: 'C++ Programming', description: 'Master C++ programming with object-oriented concepts.', icon: '🔧', category: 'programming', difficulty: 'Intermediate', duration: '12 weeks', is_premium: false, cover_image: null },
                { id: 'csharp-programming', title: 'C# Programming', description: 'Learn C# programming for modern applications.', icon: '💠', category: 'programming', difficulty: 'Intermediate', duration: '10 weeks', is_premium: false, cover_image: null },
            ];
            phases = null;
            topics = null;
        }

        const moduleCountMap = {};
        if (phases) phases.forEach(p => { moduleCountMap[p.course_id] = (moduleCountMap[p.course_id] || 0) + 1; });

        const topicCountMap = {};
        if (topics) topics.forEach(t => { topicCountMap[t.phases?.course_id] = (topicCountMap[t.phases?.course_id] || 0) + 1; });

        const enrichedCourses = (courses || []).map(course => ({
            id: course.id,
            title: course.title,
            description: course.description,
            icon: course.icon || '💻',
            category: course.category || 'programming',
            difficulty: course.difficulty || 'Beginner',
            duration: course.duration || '8 weeks',
            modules: moduleCountMap[course.id] || 0,
            topics: topicCountMap[course.id] || 0,
            isPremium: course.is_premium || false,
            coverImage: course.cover_image || '/api/placeholder/400/300'
        }));

        // Cache for 5 minutes
        cache.set(cacheKey, enrichedCourses, 300);

        res.json({
            success: true,
            courses: enrichedCourses
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses',
            error: error.message
        });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?.id;

        let course;
        try {
            const { data: c, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();
            if (error) throw error;
            course = c;
        } catch (supaErr) {
            console.warn('Supabase unavailable for course detail, using fallback:', supaErr.message);
            const fallbackCourses = {
                'c-programming': { id: 'c-programming', title: 'C Programming', description: 'Master C programming from basics to advanced concepts.', is_premium: false },
                'java-programming': { id: 'java-programming', title: 'Java Programming', description: 'Master Java programming from basics to advanced concepts.', is_premium: false },
                'python-programming': { id: 'python-programming', title: 'Python Programming', description: 'Learn Python programming from scratch.', is_premium: false },
                'cpp-programming': { id: 'cpp-programming', title: 'C++ Programming', description: 'Master C++ programming with object-oriented concepts.', is_premium: false },
                'csharp-programming': { id: 'csharp-programming', title: 'C# Programming', description: 'Learn C# programming for modern applications.', is_premium: false },
            };
            course = fallbackCourses[courseId];
            if (!course) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
        }

        if (course.is_premium && userId) {
            try {
                const { data: subscription } = await supabase
                    .from('subscriptions')
                    .select('plan')
                    .eq('user_id', userId)
                    .single();

                if (!subscription || subscription.plan === 'FREE') {
                    return res.status(403).json({
                        success: false,
                        message: 'This course requires a PRO or ENTERPRISE subscription',
                        needsUpgrade: true
                    });
                }
            } catch (_) {
                // Subscription check unavailable — allow access
            }
        }

        let phases;
        try {
            const { data: p, error: phasesError } = await supabase
                .from('phases')
                .select('*, topics(*)')
                .eq('course_id', courseId)
                .order('order_index', { ascending: true });
            if (phasesError) throw phasesError;
            phases = p;
        } catch (supaErr) {
            console.warn('Supabase unavailable for phases, returning empty:', supaErr.message);
            phases = [];
        }

        const modules = phases.map(phase => ({
            id: phase.id,
            title: phase.title,
            topics: (phase.topics || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map(topic => ({
                id: topic.id,
                title: topic.title,
                description: topic.description || '',
                order_index: topic.order_index,
                difficulty: topic.difficulty || 'Easy',
                estimated_minutes: topic.estimated_minutes
            }))
        }));

        res.json({
            success: true,
            course: {
                id: course.id,
                title: course.title,
                description: course.description,
                modules: modules
            }
        });

    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch course',
            error: error.message
        });
    }
};

exports.getLastActiveCourse = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get last touched course problem
        const { data: lastProgress, error } = await supabase
            .from('progress')
            .select('problem_id, last_submission')
            .eq('user_id', userId)
            .gte('problem_id', 1001)
            .order('last_submission', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching last active course progress:', error);
        }

        if (!lastProgress) {
            return res.json({ success: true, course: null });
        }

        // 2. Map problemId to Course (uses cached problem data)
        const allProblems = await _getCachedProblems();
        const lastProblem = allProblems.find(p => p.id === lastProgress.problem_id);

        if (!lastProblem) {
            return res.json({ success: true, course: null });
        }

        let courseId = lastProblem.courseId;

        if (!courseId && lastProblem.language) {
            const LANG_MAP = {
                'C': 'c-programming',
                'Java': 'java-lang',
                'Python': 'python-lang',
                'C++': 'cpp-lang'
            };
            courseId = LANG_MAP[lastProblem.language];
        }

        if (!courseId) {
            return res.json({ success: true, course: null });
        }

        // 3. Get Course Details
        const { data: courseData } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (!courseData) {
            return res.json({ success: true, course: null });
        }

        // 4. Calculate Progress
        const courseProblems = allProblems.filter(p =>
            p.courseId === courseId ||
            (p.language === lastProblem.language && p.id >= 1001)
        );

        const totalTopics = courseProblems.length;

        const { count: solvedCount } = await supabase
            .from('progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .in('problem_id', courseProblems.map(cp => cp.id))
            .eq('status', 'solved');

        const progressPercent = totalTopics > 0 ? Math.round((solvedCount / totalTopics) * 100) : 0;

        res.json({
            success: true,
            course: {
                id: courseId,
                title: courseData.title,
                coverImage: courseData.cover_image || '/api/placeholder/400/300',
                currentModule: lastProblem.category || 'Continue Learning',
                progress: progressPercent,
                lastTopicId: lastProblem.id
            }
        });

    } catch (error) {
        console.error('Get last active course error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const allProblems = await _getCachedProblems();

        let allCoursesData;
        try {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) throw error;
            allCoursesData = data;
        } catch (supaErr) {
            console.warn('Supabase unavailable for enrolled courses, using fallback:', supaErr.message);
            allCoursesData = [
                { id: 'c-programming', title: 'C Programming', description: 'Master C programming from basics to advanced concepts.', icon: '💻' },
                { id: 'java-programming', title: 'Java Programming', description: 'Master Java programming from basics to advanced concepts.', icon: '☕' },
                { id: 'python-programming', title: 'Python Programming', description: 'Learn Python programming from scratch.', icon: '🐍' },
                { id: 'cpp-programming', title: 'C++ Programming', description: 'Master C++ programming with object-oriented concepts.', icon: '🔧' },
                { id: 'csharp-programming', title: 'C# Programming', description: 'Learn C# programming for modern applications.', icon: '💠' },
            ];
        }

        let problemProgress = [];
        try {
            const { data } = await supabase
                .from('progress')
                .select('problem_id, status')
                .eq('user_id', userId);
            if (data) problemProgress = data;
        } catch (_) {}

        let userCourseProgress = [];
        try {
            const { data } = await supabase
                .from('user_course_progress')
                .select('*')
                .eq('user_id', userId);
            if (data) userCourseProgress = data;
        } catch (_) {}

        // Hoist user_progress count outside the loop
        let topicProgressCount = 0;
        try {
            const { count, error: tpError } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);
            if (!tpError) topicProgressCount = count || 0;
        } catch (_) {}

        // Build a Set of problem IDs with progress for O(1) lookups
        const progressByProblemId = {};
        if (problemProgress) {
            problemProgress.forEach(p => { progressByProblemId[p.problem_id] = p; });
        }

        // Build a Map for user_course_progress lookups
        const ucpMap = {};
        if (userCourseProgress) {
            userCourseProgress.forEach(p => { ucpMap[p.course_id] = p; });
        }

        // Pre-compute course language mapping
        const courseLanguageMap = {
            'c-lang': { lang: 'C', mapTo: 'c-programming' },
            'c-programming': { lang: 'C', mapTo: 'c-programming' },
            'java-lang': { lang: 'Java', mapTo: 'java-lang' },
            'python-lang': { lang: 'Python', mapTo: 'python-lang' },
            'cpp-lang': { lang: 'C++', mapTo: 'cpp-lang' },
        };

        const courses = [];

        for (const courseData of (allCoursesData || [])) {
            const langInfo = courseLanguageMap[courseData.id];
            const courseIdMap = langInfo ? langInfo.mapTo : courseData.id;
            const courseLanguage = langInfo ? langInfo.lang : null;

            const courseProblems = allProblems.filter(p =>
                p.courseId === courseData.id || p.courseId === courseIdMap ||
                (courseLanguage && p.language === courseLanguage && p.id >= 1001)
            );

            const totalTopics = courseProblems.length;
            let solvedCount = 0;
            let attemptedCount = 0;

            if (courseProblems.length > 0) {
                for (const p of courseProblems) {
                    const prog = progressByProblemId[p.id];
                    if (prog) {
                        attemptedCount++;
                        if (prog.status === 'solved') solvedCount++;
                    }
                }
            }

            const problemProgressPercent = totalTopics > 0 ? Math.round((solvedCount / totalTopics) * 100) : 0;

            const ucp = ucpMap[courseData.id] || ucpMap[courseIdMap];

            let finalProgress = problemProgressPercent;
            if (ucp && ucp.progress_percentage !== undefined) {
                finalProgress = ucp.progress_percentage;
            }

            if (!ucp && courseLanguage === 'C' && topicProgressCount > 0) {
                const approxPercent = Math.min(100, Math.round((topicProgressCount / 178) * 100));
                finalProgress = Math.max(finalProgress, approxPercent);
            }

            if (ucp || attemptedCount > 0 || (courseLanguage === 'C' && topicProgressCount > 0)) {
                courses.push({
                    id: courseData.id,
                    title: courseData.title,
                    description: courseData.description,
                    icon: courseData.icon || '💻',
                    progress: finalProgress,
                    coverImage: courseData.cover_image || '/api/placeholder/400/300',
                    lastAccessed: ucp ? ucp.last_accessed_at : new Date().toISOString()
                });
            }
        }

        courses.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));

        res.json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getTopicById = async (req, res) => {
    try {
        const { topicId } = req.params;

        let topic;
        try {
            const { data: t, error } = await supabase
                .from('topics')
                .select('*')
                .eq('id', topicId)
                .single();
            if (error) throw error;
            topic = t;
        } catch (supaErr) {
            console.warn('Supabase unavailable for topic:', supaErr.message);
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.json({
            success: true,
            topic: {
                id: topic.id,
                title: topic.title,
                description: topic.description || '',
                order_index: topic.order_index,
                difficulty: topic.difficulty || 'Easy',
                estimated_minutes: topic.estimated_minutes || 30
            }
        });

    } catch (error) {
        console.error('Error fetching topic:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch topic',
            error: error.message
        });
    }
};

