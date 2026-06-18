const { supabase } = require('../config/supabase');

// ================================================
// QUIZ QUESTION GENERATION
// Generates 15-20 questions per quiz
// Question types: multiple_choice, true_false, code_output
// ================================================

// Question templates by topic/phase
const QUESTION_TEMPLATES = {
    // Phase 1: Introduction to C Programming
    'What is C Programming?': [
        {
            type: 'multiple_choice',
            question: 'Who developed the C programming language?',
            options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling', 'Guido van Rossum'],
            correct: 0,
            explanation: 'Dennis Ritchie developed C at Bell Labs in 1972.'
        },
        {
            type: 'true_false',
            question: 'C is an interpreted language.',
            correct: false,
            explanation: 'C is a compiled language, not interpreted.'
        },
        {
            type: 'multiple_choice',
            question: 'Which of the following is NOT a feature of C?',
            options: ['Low-level memory access', 'Automatic garbage collection', 'Procedural programming', 'Portability'],
            correct: 1,
            explanation: 'C requires manual memory management; it does not have automatic garbage collection.'
        }
    ],

    'Structure of a C Program': [
        {
            type: 'multiple_choice',
            question: 'Which function is the entry point of a C program?',
            options: ['start()', 'main()', 'begin()', 'execute()'],
            correct: 1,
            explanation: 'main() is the mandatory entry point for all C programs.'
        },
        {
            type: 'true_false',
            question: 'A C program can have multiple main() functions.',
            correct: false,
            explanation: 'Every C program must have exactly one main() function.'
        },
        {
            type: 'code_output',
            question: 'What is the output of this program?',
            code: '#include <stdio.h>\nint main() {\n    printf("Hello");\n    printf("World");\n    return 0;\n}',
            options: ['Hello World', 'HelloWorld', 'Hello\\nWorld', 'Compilation Error'],
            correct: 1,
            explanation: 'The two printf statements print consecutively without spaces or newlines.'
        }
    ],

    'Variable Declaration and Initialization': [
        {
            type: 'multiple_choice',
            question: 'Which is a valid variable name in C?',
            options: ['2variable', 'variable_2', 'variable-2', 'int'],
            correct: 1,
            explanation: 'Variable names can contain letters, digits, and underscores, but cannot start with a digit or be a keyword.'
        },
        {
            type: 'code_output',
            question: 'What is the output?',
            code: 'int x;\nprintf("%d", x);',
            options: ['0', 'Garbage value', 'Compilation error', 'NULL'],
            correct: 1,
            explanation: 'Uninitialized variables contain garbage values (unpredictable).'
        }
    ]
};

// Generic question generator for topics without specific templates
function generateGenericQuestions(topic, phase, count = 15) {
    const questions = [];
    const topicName = topic.title;

    // Generate mix of question types
    for (let i = 0; i < count; i++) {
        if (i % 3 === 0) {
            // Multiple choice
            questions.push({
                type: 'multiple_choice',
                question: `Which statement about ${topicName.toLowerCase()} is correct?`,
                options: [
                    'Option A - Correct answer',
                    'Option B - Incorrect',
                    'Option C - Incorrect',
                    'Option D - Incorrect'
                ],
                correct: 0,
                explanation: `This is the correct answer for ${topicName.toLowerCase()}.`
            });
        } else if (i % 3 === 1) {
            // True/False
            questions.push({
                type: 'true_false',
                question: `${topicName} is an important concept in C programming.`,
                correct: true,
                explanation: `True. ${topicName} is fundamental to C programming.`
            });
        } else {
            // Code output
            questions.push({
                type: 'code_output',
                question: `What is the output of this code related to ${topicName.toLowerCase()}?`,
                code: '#include <stdio.h>\nint main() {\n    printf("Example");\n    return 0;\n}',
                options: ['Example', 'Error', 'Nothing', 'Undefined'],
                correct: 0,
                explanation: 'The code prints "Example" to the console.'
            });
        }
    }

    return questions;
}

async function generateQuizQuestions() {
    console.log('🎯 Generating Quiz Questions...\n');
    console.log('This will create 15-20 questions for each of the 45 quizzes.\n');

    const stats = {
        quizzesProcessed: 0,
        questionsCreated: 0,
        optionsCreated: 0,
        errors: 0
    };

    try {
        // Get all quizzes
        const { data: quizzes } = await supabase
            .from('quizzes')
            .select('*, phases!inner(course_id, title)')
            .eq('phases.course_id', 'c-programming')
            .order('order_index');

        console.log(`Found ${quizzes.length} quizzes to populate\n`);

        for (const quiz of quizzes) {
            console.log(`📝 ${quiz.title}`);

            // Determine number of questions (15-20)
            const numQuestions = Math.floor(Math.random() * 6) + 15; // 15-20

            // Get topics covered by this quiz
            let topicsForQuiz = [];
            if (quiz.quiz_type === 'topic_group') {
                const { data: topics } = await supabase
                    .from('topics')
                    .select('*')
                    .eq('phase_id', quiz.phase_id)
                    .gte('order_index', quiz.topic_start_index)
                    .lte('order_index', quiz.topic_end_index);
                topicsForQuiz = topics || [];
            } else {
                const { data: topics } = await supabase
                    .from('topics')
                    .select('*')
                    .eq('phase_id', quiz.phase_id);
                topicsForQuiz = topics || [];
            }

            // Generate questions
            let questions = [];
            for (let i = 0; i < numQuestions; i++) {
                const topic = topicsForQuiz[i % topicsForQuiz.length];
                const templateQuestions = QUESTION_TEMPLATES[topic?.title];

                let questionData;
                if (templateQuestions && templateQuestions.length > 0) {
                    // Use template
                    questionData = templateQuestions[i % templateQuestions.length];
                } else {
                    // Generate generic
                    const generic = generateGenericQuestions(topic || { title: 'C Programming' }, null, 1);
                    questionData = generic[0];
                }

                questions.push({
                    quiz_id: quiz.id,
                    question_type: questionData.type,
                    question_text: questionData.question,
                    code_snippet: questionData.code || null,
                    correct_answer: JSON.stringify(
                        questionData.type === 'true_false'
                            ? questionData.correct
                            : questionData.correct
                    ),
                    explanation: questionData.explanation,
                    order_index: i + 1
                });
            }

            // Insert questions
            for (const q of questions) {
                const { data: insertedQuestion, error: qError } = await supabase
                    .from('quiz_questions')
                    .insert(q)
                    .select()
                    .single();

                if (qError) {
                    console.error(`  ❌ Error creating question:`, qError.message);
                    stats.errors++;
                    continue;
                }

                stats.questionsCreated++;

                // Insert options for multiple choice questions
                if (q.question_type === 'multiple_choice' || q.question_type === 'code_output') {
                    const questionData = questions.find(qu => qu.order_index === q.order_index);
                    const templateQuestion = QUESTION_TEMPLATES[topicsForQuiz[0]?.title]?.[0];
                    const options = templateQuestion?.options || ['Option A', 'Option B', 'Option C', 'Option D'];

                    for (let optIdx = 0; optIdx < options.length; optIdx++) {
                        const { error: optError } = await supabase
                            .from('quiz_question_options')
                            .insert({
                                question_id: insertedQuestion.id,
                                option_text: options[optIdx],
                                is_correct: optIdx === parseInt(q.correct_answer),
                                order_index: optIdx + 1
                            });

                        if (!optError) stats.optionsCreated++;
                        else stats.errors++;
                    }
                }
            }

            console.log(`  ✅ Created ${questions.length} questions`);
            stats.quizzesProcessed++;
        }

        console.log('\n========================================');
        console.log('✨ Quiz Question Generation Complete!');
        console.log('========================================');
        console.log(`Quizzes Processed: ${stats.quizzesProcessed}`);
        console.log(`Questions Created: ${stats.questionsCreated}`);
        console.log(`Options Created: ${stats.optionsCreated}`);
        console.log(`Errors: ${stats.errors}`);
        console.log('========================================\n');

        console.log('📊 Summary:');
        console.log(`  • Average: ${Math.round(stats.questionsCreated / stats.quizzesProcessed)} questions/quiz`);
        console.log(`  • Total quiz questions: ${stats.questionsCreated}`);
        console.log(`  • Ready for UI testing\n`);

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }

    process.exit(0);
}

generateQuizQuestions();
