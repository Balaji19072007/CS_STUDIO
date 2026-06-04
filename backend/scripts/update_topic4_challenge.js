require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateChallenge() {
    const { data, error } = await supabase
        .from('course_challenges')
        .update({
            output_format: 'Hello, World!',
            reference_output: 'Hello, World!',
            solution_code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
        })
        .eq('topic_id', 'c-p1-t4')
        .select('*');

    if (error) {
        console.error('Error updating challenge:', error);
    } else {
        console.log('Successfully updated challenge:', JSON.stringify(data, null, 2));
    }
}

updateChallenge();
