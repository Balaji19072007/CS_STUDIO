const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixChallenge() {
    console.log('Fixing Phase 5 Topic 5 challenge reference_output...');
    
    // Removing test_input since it doesn't exist in the schema.
    // The fallback logic will pick it up from cProgrammingChallengeFallbacks.js
    const { error: updateError } = await supabase
        .from('course_challenges')
        .update({ 
            reference_output: 'Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: You selected Sandwich.'
        })
        .eq('topic_id', 'c-p5-t5');
        
    if (updateError) {
        console.error('Error updating challenge:', updateError);
    } else {
        console.log('Challenge reference_output fixed successfully in the database.');
    }
}

fixChallenge();
