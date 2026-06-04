const { supabase } = require('./config/supabase');

async function run() {
  const { data: courses } = await supabase.from('courses').select('id, title').ilike('title', '%C %');
  if (!courses || courses.length === 0) return console.log('C course not found');
  const courseId = courses[0].id;
  
  const { data: phases } = await supabase.from('phases').select('id, title').eq('course_id', courseId).order('order_index');
  if (!phases) return console.log('No phases found');
  
  const phaseIds = phases.map(p => p.id);
  
  const { data: quizzes, error } = await supabase.from('quizzes').select('*').in('phase_id', phaseIds);
  if (error) {
    console.error('Error fetching quizzes:', error);
  } else {
    console.log('Found quizzes:', quizzes.length);
    console.log(quizzes.map(q => ({ id: q.id, title: q.title, phase_id: q.phase_id })));
  }
}

run();
