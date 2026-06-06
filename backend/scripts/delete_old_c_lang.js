const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteOldCourse() {
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users.find(u => u.email === 'balajireddy9976@gmail.com');
    if (!user) return;
    
    // Delete c-lang
    const { error } = await supabase
        .from('user_course_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', 'c-lang');
        
    if (error) {
        console.error('Error deleting c-lang:', error);
    } else {
        console.log('Successfully deleted old c-lang course progress.');
    }
}

deleteOldCourse();
