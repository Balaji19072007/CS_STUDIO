const { supabase } = require('../config/supabase');

// ================================================
// AUTOMATIC QUIZ GENERATION
// Based on topic count and quiz configuration
// ================================================

async function generateQuizzes() {
    console.log('🎯 Auto-Generating Quizzes for C Programming...\n');

    const stats = {
        topicGroupQuizzes: 0,
        phaseLevelQuizzes: 0,
        errors: 0
    };

    try {
        // Get quiz configuration
        const { data: config } = await supabase
            .from('quiz_config')
            .select('*');

        const configMap = {};
        config.forEach(c => {
            configMap[c.config_key] = JSON.parse(c.config_value);
        });

        const TOPIC_GROUP_FREQUENCY = parseInt(configMap.topic_group_frequency || 4);
        const MIN_QUESTIONS = parseInt(configMap.min_questions_per_quiz || 15);
        const MAX_QUESTIONS = parseInt(configMap.max_questions_per_quiz || 20);
        const PASS_PERCENTAGE = parseInt(configMap.default_pass_percentage || 60);

        console.log('📋 Quiz Configuration:');
        console.log(`  • Topic Group Frequency: Every ${TOPIC_GROUP_FREQUENCY} topics`);
        console.log(`  • Questions per Quiz: ${MIN_QUESTIONS}-${MAX_QUESTIONS}`);
        console.log(`  • Pass Percentage: ${PASS_PERCENTAGE}%\n`);

        // Get all C Programming phases
        const { data: phases } = await supabase
            .from('phases')
            .select('*')
            .eq('course_id', 'c-programming')
            .order('order_index');

        for (const phase of phases) {
            console.log(`\n📚 Phase ${phase.order_index}: ${phase.title}`);

            // Get topics for this phase
            const { data: topics } = await supabase
                .from('topics')
                .select('*')
                .eq('phase_id', phase.id)
                .order('order_index');

            console.log(`  ${topics.length} topics found`);

            let quizOrderIndex = 1000; // Start after topics

            // Generate topic-group quizzes (every 4 topics)
            const numTopicGroupQuizzes = Math.floor(topics.length / TOPIC_GROUP_FREQUENCY);

            for (let i = 0; i < numTopicGroupQuizzes; i++) {
                const startIdx = i * TOPIC_GROUP_FREQUENCY;
                const endIdx = startIdx + TOPIC_GROUP_FREQUENCY - 1;
                const startTopic = topics[startIdx];
                const endTopic = topics[endIdx];

                const quiz = {
                    id: `${phase.id}-quiz-${i + 1}`,
                    phase_id: phase.id,
                    quiz_type: 'topic_group',
                    title: `Quiz ${i + 1} – Topics ${startIdx + 1} to ${endIdx + 1}`,
                    topic_start_index: startTopic.order_index,
                    topic_end_index: endTopic.order_index,
                    order_index: quizOrderIndex++,
                    min_questions: MIN_QUESTIONS,
                    max_questions: MAX_QUESTIONS,
                    pass_percentage: PASS_PERCENTAGE,
                    is_mandatory: true,
                    max_attempts: null
                };

                const { error } = await supabase
                    .from('quizzes')
                    .insert(quiz);

                if (error) {
                    console.error(`    ❌ Error creating quiz:`, error.message);
                    stats.errors++;
                } else {
                    console.log(`    ✅ Topic-Group Quiz ${i + 1}: Topics ${startIdx + 1}-${endIdx + 1}`);
                    stats.topicGroupQuizzes++;
                }
            }

            // Generate phase-level quiz (if phase has 5+ topics)
            if (topics.length >= 5) {
                const phaseLevelQuiz = {
                    id: `${phase.id}-final-quiz`,
                    phase_id: phase.id,
                    quiz_type: 'phase_level',
                    title: `${phase.title} – Final Quiz`,
                    topic_start_index: null,
                    topic_end_index: null,
                    order_index: quizOrderIndex++,
                    min_questions: MIN_QUESTIONS,
                    max_questions: MAX_QUESTIONS,
                    pass_percentage: PASS_PERCENTAGE,
                    is_mandatory: true,
                    max_attempts: null
                };

                const { error } = await supabase
                    .from('quizzes')
                    .insert(phaseLevelQuiz);

                if (error) {
                    console.error(`    ❌ Error creating phase quiz:`, error.message);
                    stats.errors++;
                } else {
                    console.log(`    ✅ Phase-Level Quiz: ${phase.title}`);
                    stats.phaseLevelQuizzes++;
                }
            }
        }

        console.log('\n========================================');
        console.log('✨ Quiz Generation Complete!');
        console.log('========================================');
        console.log(`Topic-Group Quizzes: ${stats.topicGroupQuizzes}`);
        console.log(`Phase-Level Quizzes: ${stats.phaseLevelQuizzes}`);
        console.log(`Total Quizzes: ${stats.topicGroupQuizzes + stats.phaseLevelQuizzes}`);
        console.log(`Errors: ${stats.errors}`);
        console.log('========================================\n');

        console.log('📊 Quiz Distribution:');
        console.log(`  • Every ${TOPIC_GROUP_FREQUENCY} topics = 1 quiz`);
        console.log(`  • Each phase (5+ topics) = 1 final quiz`);
        console.log(`  • Total: ~${stats.topicGroupQuizzes + stats.phaseLevelQuizzes} quizzes for 135 topics\n`);

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }

    process.exit(0);
}

generateQuizzes();
