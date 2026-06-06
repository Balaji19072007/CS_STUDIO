require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCategories() {
    const { data, error } = await supabase
        .from('courses')
        .select('id, title, category')
        .order('category, title');

    if (error) {
        console.error('Error:', error);
        return;
    }

    // Group by category
    const byCategory = {};
    data.forEach(course => {
        const cat = course.category || 'No Category';
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(course);
    });

    console.log('\n📚 Courses by Category:\n');
    Object.keys(byCategory).sort().forEach(cat => {
        console.log(`\n${cat}:`);
        byCategory[cat].forEach(c => {
            console.log(`  - ${c.title} (${c.id})`);
        });
    });
}

checkCategories();
