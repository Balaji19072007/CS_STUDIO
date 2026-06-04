const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertTopics() {
    console.log('Upserting Phase 18...');
    const { error: phaseError } = await supabase.from('course_phases').upsert({
        id: 'c-p18',
        course_id: 'c-programming',
        title: 'Best Practices and Projects',
        order_index: 18
    });
    if (phaseError) console.error(phaseError);

    const topics = [
        { id: 'c-p18-t1', phase_id: 'c-p18', title: 'Coding Standards', order_index: 1 },
        { id: 'c-p18-t2', phase_id: 'c-p18', title: 'Debugging Techniques', order_index: 2 },
        { id: 'c-p18-t3', phase_id: 'c-p18', title: 'Common Programming Errors', order_index: 3 },
        { id: 'c-p18-t4', phase_id: 'c-p18', title: 'Code Optimization', order_index: 4 }
    ];

    console.log('Upserting Topics...');
    const { error: topicsError } = await supabase.from('course_topics').upsert(topics);
    if (topicsError) console.error(topicsError);
    
    console.log("Topics inserted into course_topics!");
}

insertTopics();
