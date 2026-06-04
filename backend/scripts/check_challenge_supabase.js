require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t1';
    
    // Check tables: course_challenges, practice_problems
    const { data: challenges, error: chalError } = await supabase
        .from('course_challenges')
        .select('*')
        .eq('topic_id', topicId);
        
    console.log("Course Challenges:", challenges, chalError);

    const { data: practice, error: pracError } = await supabase
        .from('practice_problems')
        .select('*')
        .eq('topic_id', topicId);
        
    console.log("Practice Problems:", practice, pracError);
}
run();
