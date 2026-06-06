const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' }); // Adjust path if needed

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODEzNTY4MiwiZXhwIjoyMDUzNzExNjgyfQ.S-DExnOQjfqyEU-Qk5Fh-5-jJcOhyq0sV-gK3CGFG-8'; // Service Key (Hardcoded for test, usually env)

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDailyLogic(userTimezone = 'UTC') {
    try {
        console.log(`\nTesting with Timezone: ${userTimezone}`);

        // 1. Fetch IDs
        const { data: ids, error } = await supabase.from('problems').select('id').order('id', { ascending: true });
        if (error) throw error;
        console.log(`Fetched ${ids.length} IDs.`);

        // 2. Calculate Date Hash
        const now = new Date();
        const dateStr = new Intl.DateTimeFormat('en-CA', {
            timeZone: userTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(now);
        console.log(`Date String: ${dateStr}`);

        const dateHash = parseInt(dateStr.replace(/-/g, ''), 10);
        console.log(`Date Hash: ${dateHash}`);

        const index = dateHash % ids.length;
        console.log(`Index: ${index}`);

        const problemId = ids[index].id;
        console.log(`Selected Problem ID: ${problemId}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

testDailyLogic('UTC');
testDailyLogic('Asia/Kolkata');
testDailyLogic('Asia/Calcutta');
