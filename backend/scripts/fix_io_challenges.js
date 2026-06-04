const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixChallenges() {
    // Fix c-p4-t4
    const p4t4Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a character: You entered: C',
        reference_output: 'Enter a character: You entered: A'
    }).eq('topic_id', 'c-p4-t4');
    console.log('Fixed c-p4-t4:', p4t4Update.error ? p4t4Update.error : 'Success');

    // Fix c-p4-t5
    const p4t5Update = await supabase.from('course_challenges').update({
        output_format: 'Enter a string: You entered:\nWelcome To CS Studio',
        reference_output: 'Enter a string: You entered:\nWelcome To CS Studio'
    }).eq('topic_id', 'c-p4-t5');
    console.log('Fixed c-p4-t5:', p4t5Update.error ? p4t5Update.error : 'Success');
}

fixChallenges();
