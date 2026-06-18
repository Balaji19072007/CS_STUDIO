const { supabase } = require('../config/supabase');

async function testConnection() {
    console.log('🔍 Testing Supabase Connection...\n');

    try {
        // Try to query a system table
        const { data, error } = await supabase
            .from('courses')
            .select('count');

        if (error) {
            if (error.message.includes('does not exist')) {
                console.log('✅ Connection successful!');
                console.log('⚠️  Tables not created yet.');
                console.log('\n📝 Next step: Run the SQL schema in Supabase SQL Editor');
                console.log('   File: scripts/schema_complete_with_quizzes.sql\n');
            } else {
                console.error('❌ Connection error:', error.message);
            }
        } else {
            console.log('✅ Connection successful!');
            console.log('✅ Tables already exist!');
            console.log('\n📊 Ready to seed data!\n');
        }
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
    }

    process.exit(0);
}

testConnection();
