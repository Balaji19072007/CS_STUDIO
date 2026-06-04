require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const topicId = 'c-p1-t3';
    
    // First, delete existing challenge for this topic
    const { error: deleteError } = await supabase
        .from('course_challenges')
        .delete()
        .eq('topic_id', topicId);
        
    if (deleteError) {
        console.error("Delete Error:", deleteError);
        return;
    }

    console.log("Successfully removed mastery challenge for c-p1-t3!");
}
run();
