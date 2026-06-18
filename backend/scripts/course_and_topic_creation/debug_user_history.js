const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const debugHistory = async () => {
    try {
        // 1. Get User
        const { data: users, error: userError } = await supabase
            .from('users')
            .select('id, email')
            .limit(5);

        if (userError) {
            console.error('Error fetching users:', userError);
            return;
        }

        console.log('Available Users:', users);

        const targetUser = users.find(u => u.email === 'balajireddy9976@gmail.com') || users[0];
        if (!targetUser) {
            console.error('No users found.');
            return;
        }

        const user = targetUser;
        console.log(`Checking history for user: ${user.email} (${user.id})`);

        // 2. Fetch Progress (Specifically for Problem 34)
        const { data: progress34, error: error34 } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('problem_id', 34);

        if (error34) {
            console.error('Error fetching problem 34:', error34);
        } else if (progress34 && progress34.length > 0) {
            const p = progress34[0];
            console.log(`Problem 34 Status: [${p.status}]`);
            console.log(`Solved At: ${p.solved_at}`);
            console.log(`Last Submission: ${p.last_submission}`);
        } else {
            console.log('Problem 34 NOT FOUND in progress table.');
        }

        // 3. Check Test Cases in DB
        const { data: prob34, error: probError } = await supabase
            .from('problems')
            .select('test_cases')
            .eq('id', 34)
            .single();

        if (probError) console.error('Error fetching problem definition:', probError);
        else {
            console.log('Problem 34 Test Cases in DB:');
            console.log(JSON.stringify(prob34.test_cases, null, 2));
        }

    } catch (err) {
        console.error('Script Error:', err);
    }
};

debugHistory();
