const { supabase } = require('./config/supabase');

async function test() {
    const { data: users } = await supabase.from('users').select('*').limit(1);
    if (!users || users.length === 0) return console.log('No users found');
    const userId = users[0].id;
    console.log('Testing for user:', users[0].email, userId);

    const { data: userCourseProgress } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', userId);
    console.log('user_course_progress:', userCourseProgress);

    const { data: allCoursesData } = await supabase.from('courses').select('*');
    console.log('allCourses:', allCoursesData.map(c => c.id));

    const { loadAllProblems } = require('./util/problemUtils');
    const allProblems = await loadAllProblems();

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
        
        // Let's actually fetch the user's user_course_progress for this test
        const { data: userCourseProgress } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', userId);
            
        console.log('user_course_progress for user:', userCourseProgress);

        const ucp = userCourseProgress ? userCourseProgress.find(p => p.course_id === courseData.id || p.course_id === courseIdMap) : null;
        console.log('Found ucp:', ucp);

        const problemProgressPercent = 0;
        const finalProgress = ucp && ucp.progress_percentage !== undefined 
            ? ucp.progress_percentage 
            : problemProgressPercent;
        
        console.log('Final Progress for', courseData.id, ':', finalProgress);
        
        const { count: topicProgressCount } = await supabase
            .from('user_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);
        
        console.log('topicProgressCount:', topicProgressCount);
            
        if (ucp || attemptedCount > 0 || (courseLanguage === 'C' && topicProgressCount > 0)) {
            courses.push({ id: courseData.id, progress: finalProgress });
        }
    }
    console.log('Enrolled Courses:', courses);
}

test().catch(console.error);
