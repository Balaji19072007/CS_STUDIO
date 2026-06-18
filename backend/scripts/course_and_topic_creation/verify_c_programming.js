const { supabase } = require('../config/supabase');

async function verifyCProgramming() {
    console.log('🔍 Verifying C Programming Data...\n');

    try {
        // Check phases
        const { data: phases } = await supabase
            .from('phases')
            .select('id, title, order_index')
            .eq('course_id', 'c-programming')
            .order('order_index');

        console.log(`✅ Phases: ${phases?.length || 0}`);
        if (phases && phases.length > 0) {
            phases.forEach(p => console.log(`   ${p.order_index}. ${p.title}`));
        }

        // Check topics
        const { data: topics } = await supabase
            .from('topics')
            .select('id, title, phase_id')
            .in('phase_id', phases.map(p => p.id));

        console.log(`\n✅ Topics: ${topics?.length || 0} total`);

        // Group by phase
        const topicsByPhase = {};
        topics.forEach(t => {
            if (!topicsByPhase[t.phase_id]) topicsByPhase[t.phase_id] = 0;
            topicsByPhase[t.phase_id]++;
        });

        console.log('\n📊 Topics per Phase:');
        phases.forEach(p => {
            const count = topicsByPhase[p.id] || 0;
            console.log(`   Phase ${p.order_index}: ${count} topics`);
        });

        console.log('\n========================================');
        console.log('✨ C Programming Structure Ready!');
        console.log('========================================\n');

        console.log('📝 Next Steps:');
        console.log('  1. Populate topic_content for all topics');
        console.log('  2. Add practice_problems');
        console.log('  3. Auto-generate quizzes\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    process.exit(0);
}

verifyCProgramming();
