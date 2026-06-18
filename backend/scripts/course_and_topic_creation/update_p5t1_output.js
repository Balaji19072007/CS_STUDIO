const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const outputFormat = `Output 1
Enter a number: 10
The number is positive.

Output 2
Enter a number: 0

Output 3
Enter a number: -5

(For 0 or negative numbers, no output is displayed because the if condition is false.)`;

async function updateOutput() {
    console.log('Updating Phase 5 Topic 1 output_format...');
    
    const { error: updateError } = await supabase
        .from('course_challenges')
        .update({ output_format: outputFormat })
        .eq('topic_id', 'c-p5-t1');
        
    if (updateError) {
        console.error('Error updating challenge:', updateError);
    } else {
        console.log('Challenge output format updated successfully in the database.');
    }
}

updateOutput();
