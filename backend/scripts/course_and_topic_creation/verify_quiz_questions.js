const { supabase } = require('../config/supabase');

async function verifyQuizQuestions() {
    console.log('🔍 Verifying Quiz Questions...\n');

    try {
        // Total questions
        const { count: totalQuestions } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true });

        console.log(`✅ Total Questions: ${totalQuestions}\n`);

        // Questions by type
        const { data: byType } = await supabase
            .from('quiz_questions')
            .select('question_type');

        const typeCounts = {};
        byType.forEach(q => {
            typeCounts[q.question_type] = (typeCounts[q.question_type] || 0) + 1;
        });

        console.log('📊 Questions by Type:');
        Object.entries(typeCounts).forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });

        // Total options
        const { count: totalOptions } = await supabase
            .from('quiz_question_options')
            .select('*', { count: 'exact', head: true });

        console.log(`\n✅ Total Options: ${totalOptions}\n`);

        // Quizzes with questions
        const { data: quizzes } = await supabase
            .from('quizzes')
            .select('id, title, phase_id');

        let quizzesWithQuestions = 0;
        let minQuestions = Infinity;
        let maxQuestions = 0;
        let totalQuestionsCount = 0;

        for (const quiz of quizzes) {
            const { count } = await supabase
                .from('quiz_questions')
                .select('*', { count: 'exact', head: true })
                .eq('quiz_id', quiz.id);

            if (count > 0) {
                quizzesWithQuestions++;
                minQuestions = Math.min(minQuestions, count);
                maxQuestions = Math.max(maxQuestions, count);
                totalQuestionsCount += count;
            }
        }

        console.log('📈 Quiz Coverage:');
        console.log(`  Quizzes with questions: ${quizzesWithQuestions}/${quizzes.length}`);
        console.log(`  Questions per quiz: ${minQuestions}-${maxQuestions}`);
        console.log(`  Average: ${Math.round(totalQuestionsCount / quizzesWithQuestions)}\n`);

        console.log('========================================');
        console.log('✨ Verification Complete!');
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    process.exit(0);
}

verifyQuizQuestions();
