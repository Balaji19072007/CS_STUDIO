const { supabase } = require('../config/supabase');

async function checkQuizConfig() {
    console.log('🔍 Checking quiz_config table...\n');

    try {
        const { data, error } = await supabase
            .from('quiz_config')
            .select('*');

        if (error) {
            console.error('❌ Error:', error.message);
        } else {
            console.log(`✅ Found ${data.length} config entries:\n`);
            data.forEach(config => {
                console.log(`  ${config.config_key}: ${config.config_value}`);
            });
        }
    } catch (err) {
        console.error('Fatal error:', err.message);
    }

    process.exit(0);
}

checkQuizConfig();
