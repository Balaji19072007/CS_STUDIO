require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkTopicBlocks() {
    const { data, error } = await supabase
        .from('topic_content_blocks')
        .select('*')
        .eq('topic_id', 'c-p1-t5')
        .order('order_index', { ascending: true });

    console.log(JSON.stringify(data, null, 2));
}

checkTopicBlocks();
