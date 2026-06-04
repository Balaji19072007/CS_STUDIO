const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function untickTopics() {
    console.log('Fetching user progress...');
    
    // Delete user_progress for any topic that contains p5 through p30
    const phasesToReset = Array.from({ length: 26 }, (_, i) => `c-p${i + 5}-`);
    
    for (const prefix of phasesToReset) {
        const { error } = await supabase
            .from('user_progress')
            .delete()
            .like('topic_id', `${prefix}%`);
            
        if (error) {
            console.error(`Error deleting progress for ${prefix}:`, error);
        } else {
            console.log(`Deleted progress for topics like ${prefix}%`);
        }
    }
    
    let topicIds = [];
    for (const prefix of phasesToReset) {
        const { data } = await supabase
            .from('course_challenges')
            .select('id, topic_id')
            .like('topic_id', `${prefix}%`);
            
        if (data && data.length > 0) {
            for (const row of data) {
                 await supabase
                    .from('course_challenge_status')
                    .delete()
                    .eq('course_challenge_id', row.id);
            }
        }
    }
    
    for (const prefix of phasesToReset) {
        const { error } = await supabase
            .from('course_challenge_status')
            .delete()
            .like('course_challenge_id', `fallback-${prefix}%`);
    }

    console.log('Finished unticking topics after Phase 4.');
}

untickTopics();
