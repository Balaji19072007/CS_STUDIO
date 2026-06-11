const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://hubvhqfxlzwkrvpulkqs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  // Check ratings table structure via a bad insert (error reveals columns)
  const { error: ratInsErr } = await supabase.from('ratings').insert({ _fake: 1 });
  console.log('ratings insert error (reveals structure):', ratInsErr?.message);

  // Check users table for usage tracking fields
  const { data: usersData } = await supabase.from('users').select('*').limit(1);
  if (usersData && usersData[0]) {
    const cols = Object.keys(usersData[0]);
    const ratingFields = cols.filter(c => c.includes('rating') || c.includes('usage') || c.includes('prompt') || c.includes('track'));
    console.log('users ALL columns:', cols.join(', '));
    console.log('users rating/usage fields:', ratingFields.join(', ') || 'NONE FOUND');
  }

  // Check user_progress structure
  const { data: upData } = await supabase.from('user_progress').select('*').limit(2);
  if (upData && upData[0]) {
    console.log('user_progress columns:', Object.keys(upData[0]).join(', '));
  } else {
    // insert error reveals columns
    const { error: upErr } = await supabase.from('user_progress').insert({ _fake: 1 });
    console.log('user_progress insert error:', upErr?.message);
  }

  // Check user_course_progress structure
  const { data: ucpData } = await supabase.from('user_course_progress').select('*').limit(2);
  if (ucpData && ucpData[0]) {
    console.log('user_course_progress columns:', Object.keys(ucpData[0]).join(', '));
  }

  // Count completed topics for a test
  const { count } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');
  console.log('Total completed topics across all users:', count);

  // Check if course_ratings exists
  const tables = ['course_ratings', 'course_reviews', 'ratings'];
  for (const t of tables) {
    const { error } = await supabase.from(t).select('id').limit(1);
    console.log(t + ':', error ? 'MISSING - ' + error.message : 'EXISTS');
  }
}
main().catch(console.error);
