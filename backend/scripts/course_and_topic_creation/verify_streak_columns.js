const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const checkColumns = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('current_streak, last_streak_update')
        .limit(1);

    if (error) {
        console.error('Column Verification Failed:', error.message);
    } else {
        console.log('Column Verification Success:', data);
    }
};

checkColumns();
