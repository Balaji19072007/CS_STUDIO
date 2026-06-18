const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://hubvhqfxlzwkrvpulkqs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function testProgress() {
  const userId = '1bfb0324-cfcb-43dd-abcf-ca09bc3360eb'; // Need a valid user id, let's grab one
  const { data: users } = await supabase.from('users').select('id').limit(1);
  const uId = users[0].id;
  console.log('Testing with user:', uId);

  // 1. Test user_progress update
  const topicId = 'c-p1-t1'; // from the screenshot
  const payload = { status: 'completed', completed_at: new Date().toISOString() };
  
  const { data: up1, error: e1 } = await supabase
    .from('user_progress')
    .update(payload)
    .eq('user_id', uId)
    .eq('topic_id', topicId)
    .select('*');
    
  console.log('Update user_progress error:', e1 ? e1.message : 'NONE');

  // 2. Test user_course_progress count
  const courseId = 'c-programming';
  const queryCourseId = courseId === 'c-programming' ? 'c-lang' : courseId;
  const { count: totalTopics, error: e2 } = await supabase
    .from('topics')
    .select('id, phases!inner(course_id)', { count: 'exact', head: true })
    .eq('phases.course_id', queryCourseId);
    
  console.log('Count topics error:', e2 ? e2.message : 'NONE', 'Count:', totalTopics);

  // 3. Test update user_course_progress
  const cpPayload = { progress_percentage: 10, last_accessed_at: new Date().toISOString() };
  const { data: up2, error: e3 } = await supabase
    .from('user_course_progress')
    .update(cpPayload)
    .eq('user_id', uId)
    .eq('course_id', courseId)
    .select('*');
    
  console.log('Update user_course_progress error:', e3 ? e3.message : 'NONE');
}

testProgress().catch(console.error);
