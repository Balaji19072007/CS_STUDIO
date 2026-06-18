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

const markStatsSolved = async () => {
    try {
        // 1. Get User
        const { data: users, error: userError } = await supabase
            .from('users')
            .select('id, email')
            .limit(5);

        const targetUser = users.find(u => u.email === 'balajireddy9976@gmail.com');
        if (!targetUser) {
            console.error('User not found');
            return;
        }

        console.log(`Updating progress for user: ${targetUser.email}`);

        // 2. Update Progress to 'solved'
        const { data, error } = await supabase
            .from('progress')
            .update({
                status: 'solved',
                solved_at: new Date().toISOString(),
                best_accuracy: 100
            })
            .eq('user_id', targetUser.id)
            .eq('problem_id', 34)
            .select();

        if (error) {
            console.error('Update Error:', error);
        } else {
            console.log('✅ Successfully marked Problem 34 as SOLVED:', data);
        }

    } catch (err) {
        console.error('Script Error:', err);
    }
};

markStatsSolved();
