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

        const { data: courses, error } = await supabase
            .from('courses')
            .select('*');

        if (error) throw error;

        // Batch queries instead of N+1 — 3 queries total vs 2N+1
        const { data: phases } = await supabase
            .from('phases')
            .select('course_id');

        const { data: topics } = await supabase
            .from('topics')
            .select('*, phases!inner(course_id)');

        const moduleCountMap = {};
        if (phases) phases.forEach(p => { moduleCountMap[p.course_id] = (moduleCountMap[p.course_id] || 0) + 1; });

        const topicCountMap = {};
        if (topics) topics.forEach(t => { topicCountMap[t.phases.course_id] = (topicCountMap[t.phases.course_id] || 0) + 1; });

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

        const { data: course, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (error || !course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.is_premium && userId) {
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
        }

        const { data: phases, error: phasesError } = await supabase
            .from('phases')
            .select('*, topics(*)')
            .eq('course_id', courseId)
            .order('order', { ascending: true });

        if (phasesError) throw phasesError;

        const modules = phases.map(phase => ({
            id: phase.id,
            title: phase.title,
            topics: (phase.topics || []).sort((a, b) => a.order - b.order).map(topic => ({
                id: topic.id,
                title: topic.title,
                type: topic.type || 'content',
                content: topic.content || '',
                videoUrl: topic.video_url || null,
                questions: topic.questions || [],
                diagram: topic.diagram || null,
                seoTitle: topic.seo_title || null,
                seoDescription: topic.seo_description || null,
                seoKeywords: topic.seo_keywords || []
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

        const { data: allCoursesData, error: coursesError } = await supabase.from('courses').select('*');
        if (coursesError) throw coursesError;

        const { data: problemProgress } = await supabase
            .from('progress')
            .select('problem_id, status')
            .eq('user_id', userId);

        const { data: userCourseProgress } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', userId);

        // Hoist user_progress count outside the loop (was N+1 before)
        const { count: topicProgressCount, error: tpError } = await supabase
            .from('user_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (tpError) {
            console.error("Error fetching topic progress:", tpError);
        }

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

        const { data: topic, error } = await supabase
            .from('topics')
            .select('*')
            .eq('id', topicId)
            .single();

        if (error || !topic) {
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
                type: topic.type || 'content',
                content: topic.content || '',
                videoUrl: topic.video_url || null,
                questions: topic.questions || [],
                diagram: topic.diagram || null,
                seoTitle: topic.seo_title || null,
                seoDescription: topic.seo_description || null,
                seoKeywords: topic.seo_keywords || []
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

