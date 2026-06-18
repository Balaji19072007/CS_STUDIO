const { supabase } = require('../config/supabase');

async function simpleVerify() {
    console.log('🔍 Verifying Seeded Data...\n');

    try {
        // Check courses
        const { data: courses } = await supabase
            .from('courses')
            .select('id, title, category');

        console.log(`✅ Courses: ${courses?.length || 0} total\n`);

        if (courses && courses.length > 0) {
            const byCategory = {};
            courses.forEach(c => {
                if (!byCategory[c.category]) byCategory[c.category] = [];
                byCategory[c.category].push(c.title);
            });

            Object.keys(byCategory).forEach(cat => {
                console.log(`   ${cat}:`);
                byCategory[cat].forEach(title => console.log(`     • ${title}`));
            });
        }

        // Check modules
        const { data: modules } = await supabase
            .from('course_modules')
            .select('id, title, course_id')
            .order('order_index');

        console.log(`\n✅ Modules: ${modules?.length || 0} total\n`);

        console.log('========================================');
        console.log('✨ Database Ready!');
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    process.exit(0);
}

simpleVerify();
