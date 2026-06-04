require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkChallenge() {
    const { data, error } = await supabase
        .from('course_challenges')
        .select('*')
        .eq('topic_id', 'c-p1-t4');

    if (error) {
        console.error('Error fetching challenge:', error);
    } else {
        console.log('Challenge:', JSON.stringify(data, null, 2));
    }
}

checkChallenge();
