const { supabase } = require('./config/supabase');

async function run() {
  console.log('Generating quizzes for C Programming course...');
  
  // 1. Get C course ID
  const { data: courses } = await supabase.from('courses').select('id, title').ilike('title', '%C %');
  if (!courses || courses.length === 0) return console.log('C course not found');
  const courseId = courses[0].id;
  
  // 2. Get all phases
  const { data: phases, error: phasesError } = await supabase.from('phases')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index');
    
  if (phasesError) throw phasesError;
  
  for (const phase of phases) {
    console.log(`\nProcessing Phase: ${phase.title}`);
    
    // Count topics
    const { data: topics, error: topicsError } = await supabase.from('topics')
      .select('id')
      .eq('phase_id', phase.id)
      .order('order_index');
      
    if (topicsError) throw topicsError;
    const topicCount = topics.length;
    
    let quizOrder = 1000;
    const numQuizzes = Math.floor(topicCount / 4);
    const quizzesToInsert = [];
    
    // Generate topic-group quizzes
    for (let i = 1; i <= numQuizzes; i++) {
      const startIdx = (i - 1) * 4 + 1;
      const endIdx = startIdx + 3;
      quizzesToInsert.push({
        id: `${phase.id}-quiz-${i}`,
        phase_id: phase.id,
        quiz_type: 'topic_group',
        title: `Quiz ${i} - Topics ${startIdx} to ${endIdx}`,
        topic_start_index: startIdx,
        topic_end_index: endIdx,
        order_index: quizOrder++,
        min_questions: 15,
        max_questions: 20,
        pass_percentage: 60,
        is_mandatory: true
      });
    }
    
    // Generate phase-level quiz
    if (topicCount >= 5) {
      quizzesToInsert.push({
        id: `${phase.id}-final-quiz`,
        phase_id: phase.id,
        quiz_type: 'phase_level',
        title: `${phase.title} - Final Quiz`,
        topic_start_index: null,
        topic_end_index: null,
        order_index: quizOrder++,
        min_questions: 15,
        max_questions: 20,
        pass_percentage: 60,
        is_mandatory: true
      });
    }
    
    // Insert Quizzes
    for (const quiz of quizzesToInsert) {
      // First delete existing just in case
      await supabase.from('quizzes').delete().eq('id', quiz.id);
      
      const { error: insertQuizError } = await supabase.from('quizzes').insert(quiz);
      if (insertQuizError) {
        console.error('Failed to insert quiz', quiz.title, insertQuizError);
        continue;
      }
      
      console.log(`  Created quiz: ${quiz.title}`);
      
      // Generate Questions
      const numQuestions = 15 + Math.floor(Math.random() * 6); // 15-20
      const questionTypes = ['multiple_choice', 'true_false', 'code_output'];
      
      for (let j = 1; j <= numQuestions; j++) {
        const qType = questionTypes[j % 3];
        
        let qText = `Question ${j}: Which of the following is correct?`;
        if (qType === 'true_false') qText = `Question ${j}: This statement is true.`;
        if (qType === 'code_output') qText = `Question ${j}: What is the output of this code?`;
        
        let codeSnippet = null;
        if (qType === 'code_output') {
          codeSnippet = '#include <stdio.h>\\nint main() {\\n    printf("Output");\\n    return 0;\\n}';
        }
        
        const correctAns = qType === 'true_false' ? true : 0;
        
        const { data: insertedQ, error: qError } = await supabase.from('quiz_questions').insert({
          quiz_id: quiz.id,
          question_type: qType,
          question_text: qText,
          code_snippet: codeSnippet,
          correct_answer: correctAns,
          explanation: 'This is the correct answer explanation.',
          order_index: j
        }).select('id').single();
        
        if (qError) {
          console.error('Failed to insert question', qError);
          continue;
        }
        
        // Insert options
        if (qType === 'multiple_choice' || qType === 'code_output') {
          const options = [
            { question_id: insertedQ.id, option_text: 'Option A (Correct)', is_correct: true, order_index: 1 },
            { question_id: insertedQ.id, option_text: 'Option B', is_correct: false, order_index: 2 },
            { question_id: insertedQ.id, option_text: 'Option C', is_correct: false, order_index: 3 },
            { question_id: insertedQ.id, option_text: 'Option D', is_correct: false, order_index: 4 },
          ];
          
          await supabase.from('quiz_question_options').insert(options);
        }
      }
      
      console.log(`    Generated ${numQuestions} questions`);
    }
  }
  
  console.log('Finished generating quizzes for C Programming course!');
}

run();
