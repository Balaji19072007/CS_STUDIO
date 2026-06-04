import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    console.log('Fetching phases for c and c-programming...');
    const { data: phases } = await supabase
      .from('phases')
      .select('id')
      .in('course_id', ['c', 'c-programming']);

    if (phases && phases.length > 0) {
      const phaseIds = phases.map(p => p.id);
      console.log('Deleting topics for phases:', phaseIds);
      await supabase.from('topics').delete().in('phase_id', phaseIds);
      
      console.log('Deleting quizzes for phases:', phaseIds);
      await supabase.from('quizzes').delete().in('phase_id', phaseIds);
    }

    console.log('Deleting phases for c and c-programming...');
    const { error } = await supabase.from('phases').delete().in('course_id', ['c', 'c-programming']);
    if (error) throw error;

    console.log('Successfully deleted all old data for C course.');
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
