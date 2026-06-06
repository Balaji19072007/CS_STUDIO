const { supabase } = require('./config/supabase');

async function run() {
  const userId = 'dbe45f88-7421-4528-84a7-3f55928f43b9';
  
  // Find C course
  const { data: courses } = await supabase.from('courses').select('id, title').ilike('title', '%C %');
  
  if (courses.length === 0) return;
  const courseId = courses[0].id;

  // Find all phases for this course
  const { data: phases } = await supabase.from('phases').select('id, title').eq('course_id', courseId);
  
  const phaseIds = phases.map(p => p.id);
  if (phaseIds.length === 0) return;

  // Find all topics for these phases
  const { data: topics } = await supabase.from('topics').select('id, title').in('phase_id', phaseIds);
  console.log('Topics:', topics.length);
  
  if (topics.length === 0) return;
  
  // Mark all topics as completed for this user
  const progressRows = topics.map(t => ({
    user_id: userId,
    topic_id: t.id,
    status: 'completed',
    completed_at: new Date().toISOString()
  }));
  
  // delete existing progress for these topics
  await supabase.from('user_progress').delete().eq('user_id', userId).in('topic_id', topics.map(t => t.id));
  
  const { error } = await supabase.from('user_progress').insert(progressRows);
  if (error) {
    console.error('Error inserting:', error);
  } else {
    console.log('Successfully marked all topics as completed!');
  }
}

run();
