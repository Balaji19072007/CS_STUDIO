const { supabase } = require('../config/supabase');

async function checkPhasesSchema() {
    console.log('🔍 Checking phases table schema...\n');

    try {
        // Try to insert a test phase to see what columns are expected
        const testPhase = {
            id: 'test-phase',
            course_id: 'c-programming',
            title: 'Test Phase',
            description: 'Test',
            order_index: 999,
            estimated_hours: 1
        };

        const { data, error } = await supabase
            .from('phases')
            .insert(testPhase)
            .select();

        if (error) {
            console.log('❌ Error:', error.message);
            console.log('Error details:', JSON.stringify(error, null, 2));
        } else {
            console.log('✅ Test phase inserted successfully');
            console.log('Returned data:', data);

            // Clean up
            await supabase.from('phases').delete().eq('id', 'test-phase');
            console.log('✅ Test phase deleted');
        }

    } catch (err) {
        console.error('Fatal error:', err.message);
    }

    process.exit(0);
}

checkPhasesSchema();
