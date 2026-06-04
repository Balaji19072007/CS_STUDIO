const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const inputFormat = `A single integer.`;

async function updateInput() {
    console.log('Updating Phase 5 Topic 1 input_format...');
    
    const { error: updateError } = await supabase
        .from('course_challenges')
        .update({ input_format: inputFormat })
        .eq('topic_id', 'c-p5-t1');
        
    if (updateError) {
        console.error('Error updating challenge:', updateError);
    } else {
        console.log('Challenge input format updated successfully in the database.');
    }
}

updateInput();
