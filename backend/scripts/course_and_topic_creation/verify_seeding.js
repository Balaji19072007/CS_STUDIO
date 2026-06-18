const { supabase } = require('../config/supabase');

async function verifySeeding() {
    console.log('🔍 Verifying Seeded Data...\n');

    try {
        // Check courses
        const { data: courses, error: coursesError } = await supabase
            .from('courses')
            .select('id, title, has_modules');

        if (coursesError) {
            console.error('❌ Error fetching courses:', coursesError.message);
            return;
        }

        console.log(`✅ Courses: ${courses.length} total`);
        const languages = courses.filter(c => !c.has_modules);
        const tracks = courses.filter(c => c.has_modules);
        console.log(`   • Programming Languages: ${languages.length}`);
        console.log(`   • Career Tracks: ${tracks.length}\n`);

        // Check modules
        const { data: modules, error: modulesError } = await supabase
            .from('course_modules')
            .select('id, title, course_id');

        if (modulesError) {
            console.error('❌ Error fetching modules:', modulesError.message);
            return;
        }

        console.log(`✅ Modules: ${modules.length} total\n`);

        // Group modules by course
        const modulesByCourse = {};
        modules.forEach(m => {
            if (!modulesByCourse[m.course_id]) {
                modulesByCourse[m.course_id] = [];
            }
            modulesByCourse[m.course_id].push(m);
        });

        console.log('📊 Modules by Course:');
        tracks.forEach(course => {
            const count = modulesByCourse[course.id]?.length || 0;
            console.log(`   • ${course.title}: ${count} modules`);
        });

        console.log('\n========================================');
        console.log('✨ Verification Complete!');
        console.log('========================================\n');

        console.log('📝 Next Steps:');
        console.log('  1. Create phases for each course/module');
        console.log('  2. Create topics for each phase');
        console.log('  3. Add topic content and examples');
        console.log('  4. Add practice problems');
        console.log('  5. Auto-generate quizzes\n');

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
    }

    process.exit(0);
}

verifySeeding();
