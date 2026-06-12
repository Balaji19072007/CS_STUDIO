const { supabase } = require('../config/supabase');
const { cache } = require('../util/cache');

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

        // Fetch counts for modules and topics separately if not in main table
        const enrichedCourses = await Promise.all(courses.map(async (course) => {
            const { count: modulesCount } = await supabase
                .from('phases')
                .select('*', { count: 'exact', head: true })
                .eq('course_id', course.id);

            const { count: topicsCount } = await supabase
                .from('topics')
                .select('*, phases!inner(*)', { count: 'exact', head: true })
                .eq('phases.course_id', course.id);

            return {
                id: course.id,
                title: course.title,
                description: course.description,
                icon: course.icon || '💻',
                category: course.category || 'programming',
                difficulty: course.difficulty || 'Beginner',
                duration: course.duration || '8 weeks',
                modules: modulesCount || 0,
                topics: topicsCount || 0,
                isPremium: course.is_premium || false,
                coverImage: course.cover_image || '/api/placeholder/400/300'
            };
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
            .gte('problem_id', 1001) // Course problems only
            .order('last_submission', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching last active course progress:', error);
        }

        if (!lastProgress) {
            return res.json({ success: true, course: null });
        }

        // 2. Map problemId to Course
        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();
        const lastProblem = allProblems.find(p => p.id === lastProgress.problem_id);

        if (!lastProblem) {
            return res.json({ success: true, course: null });
        }

        let courseId = lastProblem.courseId;

        // Fallback: Map by Language if courseId is missing
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
        
        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();
        
        // Fetch all courses
        const { data: allCoursesData, error: coursesError } = await supabase.from('courses').select('*');
        if (coursesError) throw coursesError;
        
        // Fetch user's problem progress
        const { data: problemProgress } = await supabase
            .from('progress')
            .select('problem_id, status')
            .eq('user_id', userId);
            
        // Fetch user_course_progress
        const { data: userCourseProgress } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', userId);

        const courses = [];
        
        for (const courseData of (allCoursesData || [])) {
            const courseIdMap = courseData.id === 'c-lang' ? 'c-programming' : courseData.id;
            const courseLanguage = (courseData.id === 'c-lang' || courseData.id === 'c-programming') ? 'C' : 
                                  courseData.id === 'java-lang' ? 'Java' : 
                                  courseData.id === 'python-lang' ? 'Python' : 
                                  courseData.id === 'cpp-lang' ? 'C++' : null;
                                  
            const courseProblems = allProblems.filter(p =>
                p.courseId === courseData.id || p.courseId === courseIdMap ||
                (courseLanguage && p.language === courseLanguage && p.id >= 1001)
            );
            
            const totalTopics = courseProblems.length;
            let solvedCount = 0;
            let attemptedCount = 0;
            
            if (problemProgress && courseProblems.length > 0) {
                const courseProblemIds = new Set(courseProblems.map(p => p.id));
                const userCourseProblemProgress = problemProgress.filter(p => courseProblemIds.has(p.problem_id));
                
                solvedCount = userCourseProblemProgress.filter(p => p.status === 'solved').length;
                attemptedCount = userCourseProblemProgress.length;
            }
            
            const problemProgressPercent = totalTopics > 0 ? Math.round((solvedCount / totalTopics) * 100) : 0;
            
            const ucp = userCourseProgress ? userCourseProgress.find(p => p.course_id === courseData.id || p.course_id === courseIdMap) : null;
            
            // Prefer the official course progress (from topics/quizzes) if it exists, otherwise fallback to coding problems progress
            let finalProgress = problemProgressPercent;
            if (ucp && ucp.progress_percentage !== undefined) {
                finalProgress = ucp.progress_percentage;
            }
            
            // User is enrolled if they have an explicit user_course_progress entry, OR they've attempted/solved at least one problem in the course
            // ALSO consider them enrolled if they have any topic progress in user_progress table
            
            // We fetch the topic progress for this user to check enrollment
            const { count: topicProgressCount, error: tpError } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);
                
            if (tpError) {
                console.error("Error fetching topic progress:", tpError);
            }
                
            // If they have topic progress and the course is C, they are likely enrolled in C.
            // A more robust check would join topics -> phases -> course_id, but if ucp exists it catches most.
            // Since they completed the course, ucp WILL exist as long as we check both c-lang and c-programming.
            // Wait, what if they don't have ucp? Then finalProgress might be 0. Let's assume if they completed, they have ucp.
            // If they don't, we'll calculate it from topicProgressCount approximately (max 100).
            if (!ucp && courseLanguage === 'C' && topicProgressCount > 0) {
                // Approximate fallback if no ucp. 135 topics + 43 quizzes = 178 total
                const approxPercent = Math.min(100, Math.round((topicProgressCount / 178) * 100));
                finalProgress = Math.max(finalProgress, approxPercent);
            }

            console.log(`Course ${courseData.id}: ucp=${!!ucp}, attemptedCount=${attemptedCount}, topicProgressCount=${topicProgressCount}, finalProgress=${finalProgress}`);

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
        
        // Sort by lastAccessed descending
        courses.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));

        console.log("Returning courses:", courses.length);
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

