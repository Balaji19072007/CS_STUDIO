require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCourses() {
    const { data, error } = await supabase
        .from('courses')
        .select('id, title, category')
        .order('title');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('\n📚 All Courses in Supabase:\n');
    data.forEach(course => {
        console.log(`  - ${course.title} (${course.id})`);
        console.log(`    Category: ${course.category || 'No category'}\n`);
    });

    console.log(`Total: ${data.length} courses`);
}

checkCourses();
