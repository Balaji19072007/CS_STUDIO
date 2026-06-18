const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixVisuals() {
    const update = await supabase.from('course_challenges').update({
        output_format: 'Output\nMenu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: 3\nYou selected Sandwich.',
        reference_output: 'Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: 3\nYou selected Sandwich.'
    }).eq('topic_id', 'c-p5-t5');
    
    console.log('Fixed c-p5-t5 visuals:', update.error ? update.error : 'Success');
}

fixVisuals();
