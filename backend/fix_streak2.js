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

    console.log("Setting current streak to 1 and updating last_streak_update to now");
    const { error } = await supabase.from('users').update({
        current_streak: 1,
        last_streak_update: new Date().toISOString()
    }).eq('id', adminId);

    if (error) {
        console.error("Error fixing streak:", error);
    } else {
        console.log("Streak successfully updated to 1");
    }
}
run();
