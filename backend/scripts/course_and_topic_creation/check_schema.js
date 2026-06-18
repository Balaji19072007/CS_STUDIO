const { supabase } = require('../config/supabase');

async function checkSchema() {
    console.log('🔍 Checking Database Schema...\n');

    const tables = [
        'courses',
        'course_modules',
        'phases',
        'topics',
        'topic_content',
        'practice_problems',
        'quizzes',
        'quiz_questions',
        'quiz_question_options',
        'user_progress',
        'user_course_progress',
        'user_quiz_attempts',
        'user_quiz_answers',
        'quiz_config'
    ];

    for (const table of tables) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`❌ ${table}: Does not exist`);
            } else {
                console.log(`✅ ${table}: Exists (${count || 0} rows)`);
            }
        } catch (err) {
            console.log(`❌ ${table}: Error - ${err.message}`);
        }
    }

    console.log('\n========================================\n');
    process.exit(0);
}

checkSchema();
