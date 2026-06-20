const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const env = fs.readFileSync(envPath, 'utf-8').split('\n').reduce((acc, line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        if (key && !key.startsWith('#')) acc[key] = val;
    }
    return acc;
}, {});

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    let { data: users } = await supabase.from('users').select('*').ilike('username', 'admin').limit(1);
    if (!users || users.length === 0) users = (await supabase.from('users').select('*').ilike('email', 'admin%').limit(1)).data;
    const adminId = users[0].id;

    console.log("Admin details:");
    console.log("Current Streak:", users[0].current_streak);
    console.log("Last Streak Update:", users[0].last_streak_update);
}
run();
