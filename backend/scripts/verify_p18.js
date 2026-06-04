const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    const { data: quizzes } = await supabase.from('quizzes').select('*').eq('phase_id', 'c-phase-18');
    console.log("Quizzes for c-phase-18:", quizzes);
    
    const { data: quizzes2 } = await supabase.from('quizzes').select('*').eq('phase_id', 'c-p18');
    console.log("Quizzes for c-p18:", quizzes2);

    const { data: topics } = await supabase.from('course_topics').select('*').like('id', '%p18%');
    console.log("Topics for p18:", topics);
}

verify();
