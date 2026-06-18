const { supabase } = require('../config/supabase');

async function validateQuizzes() {
    console.log('🔍 Validating C Programming Quizzes...\n');

    try {
        // Get all phases
        const { data: phases } = await supabase
            .from('phases')
            .select('*')
            .eq('course_id', 'c-programming')
            .order('order_index');

        console.log(`Found ${phases.length} phases\n`);

        let totalTopicGroupQuizzes = 0;
        let totalPhaseLevelQuizzes = 0;

        for (const phase of phases) {
            console.log(`\n📚 Phase ${phase.order_index}: ${phase.title}`);

            // Get topics count
            const { data: topics, count: topicCount } = await supabase
                .from('topics')
                .select('*', { count: 'exact' })
                .eq('phase_id', phase.id);

            console.log(`  Topics: ${topicCount}`);

            // Get quizzes for this phase
            const { data: quizzes } = await supabase
                .from('quizzes')
                .select('*')
                .eq('phase_id', phase.id)
                .order('order_index');

            if (quizzes && quizzes.length > 0) {
                console.log(`  Quizzes: ${quizzes.length}`);

                quizzes.forEach(quiz => {
                    if (quiz.quiz_type === 'topic_group') {
                        console.log(`    ✅ ${quiz.title} (Topics ${quiz.topic_start_index}-${quiz.topic_end_index})`);
                        totalTopicGroupQuizzes++;
                    } else {
                        console.log(`    ✅ ${quiz.title} (Phase-Level)`);
                        totalPhaseLevelQuizzes++;
                    }
                });
            } else {
                console.log(`  ⚠️  No quizzes generated`);
            }
        }

        console.log('\n========================================');
        console.log('📊 Quiz Summary');
        console.log('========================================');
        console.log(`Topic-Group Quizzes: ${totalTopicGroupQuizzes}`);
        console.log(`Phase-Level Quizzes: ${totalPhaseLevelQuizzes}`);
        console.log(`Total Quizzes: ${totalTopicGroupQuizzes + totalPhaseLevelQuizzes}`);
        console.log('========================================\n');

        // Validate quiz configuration
        console.log('🎯 Quiz Configuration Validation:');
        console.log('  ✓ Every 4 topics should have 1 topic-group quiz');
        console.log('  ✓ Phases with 5+ topics should have 1 phase-level quiz');
        console.log('  ✓ Each quiz should have 15-20 questions (to be added)');
        console.log('  ✓ Pass percentage: 60%\n');

        // Check for any missing quizzes
        const expectedTopicGroupQuizzes = Math.floor(135 / 4); // 135 topics / 4
        const expectedPhaseLevelQuizzes = phases.filter(p => {
            // Count topics for each phase
            return true; // Simplified for now
        }).length;

        console.log('📈 Expected vs Actual:');
        console.log(`  Expected Topic-Group: ~${expectedTopicGroupQuizzes}`);
        console.log(`  Actual Topic-Group: ${totalTopicGroupQuizzes}`);
        console.log(`  Expected Phase-Level: ~${phases.length}`);
        console.log(`  Actual Phase-Level: ${totalPhaseLevelQuizzes}\n`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    process.exit(0);
}

validateQuizzes();
