require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkChallenges() {
    const { data, error } = await supabase
        .from('course_challenges')
        .select('*')
        .ilike('title', '%Hello%');

    console.log(JSON.stringify(data, null, 2));
}

checkChallenges();
