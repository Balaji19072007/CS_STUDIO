const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function completeCourse() {
    console.log('Fetching users to find balajireddy9976@gmail.com...');
    
    // Auth users is in auth schema
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
        console.error('Error fetching users:', error);
        return;
    }
    
    const user = users.find(u => u.email === 'balajireddy9976@gmail.com');
    if (!user) {
        console.log('User not found!');
        return;
    }
    
    console.log('Found user:', user.id);
    
    const { error: updateError } = await supabase
        .from('user_course_progress')
        .update({ progress_percentage: 100, completed_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('course_id', 'c-programming');
        
    if (updateError) {
        console.error('Error updating progress:', updateError);
        return;
    }
    
    console.log('Successfully marked c-programming as 100% completed for', user.email);
}

completeCourse();
