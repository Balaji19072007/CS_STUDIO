require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateTitle() {
    const { data, error } = await supabase
        .from('course_challenges')
        .update({
            title: 'Hello, World!'
        })
        .eq('id', 189005)
        .select('*');

    if (error) {
        console.error('Error updating challenge title:', error);
    } else {
        console.log('Successfully updated challenge title:', JSON.stringify(data, null, 2));
    }
}

updateTitle();
