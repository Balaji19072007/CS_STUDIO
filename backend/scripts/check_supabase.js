require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    console.log("Fetching topics...");
    const { data: topics, error } = await supabase
        .from('topics')
        .select('*')
        .eq('title', 'What is C Programming?');
    
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Topics:", topics);
    
    if (topics.length > 0) {
        const { data: content, error: contentError } = await supabase
            .from('topic_content')
            .select('*')
            .eq('topic_id', topics[0].id);
        
        if (contentError) {
            console.error("Content Error:", contentError);
        } else {
            console.log("Topic Content:", content);
        }
    }
}
run();
