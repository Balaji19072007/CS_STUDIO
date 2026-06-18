require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkTopic() {
    const { data, error } = await supabase
        .from('topics')
        .select('*')
        .ilike('title', '%Basic Data Types%');

    console.log(JSON.stringify(data, null, 2));
}

checkTopic();
