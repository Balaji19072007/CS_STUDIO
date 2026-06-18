const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users.find(u => u.email === 'balajireddy9976@gmail.com');
    if (!user) return;
    
    const { data } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', user.id);
        
    console.log(JSON.stringify(data, null, 2));
}

checkUser();
