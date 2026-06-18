const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const checkUserColumns = async () => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, streak, last_active_at') // Trying likely candidates
            .limit(1);

        if (error) {
            console.error('Error fetching users:', error);
            // Try fallback if specific columns fail
            if (error.message.includes('does not exist')) {
                console.log('Column mismatch. Fetching all columns to see names...');
                const { data: allUsers } = await supabase.from('users').select('*').limit(1);
                if (allUsers && allUsers.length > 0) {
                    console.log('ACTUAL COLUMNS:', Object.keys(allUsers[0]));
                }
            }
            return;
        }

        if (users && users.length > 0) {
            console.log('User Data:', users[0]);
        }
    } catch (err) {
        console.error('Script Error:', err);
    }
};

checkUserColumns();
