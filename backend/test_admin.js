require('dotenv').config();
const { supabase } = require('./config/supabase');

async function test() {
    try {
        console.log("Testing users table...");
        const { data: users, error: err1 } = await supabase.from('users').select('role').limit(1);
        if (err1) console.error("Users error:", err1.message);

        console.log("Testing user_progress table...");
        const { data: progress, error: err2 } = await supabase.from('user_progress').select('id').limit(1);
        if (err2) console.error("User_progress error:", err2.message);

        console.log("Testing problems table...");
        const { data: problems, error: err3 } = await supabase.from('problems').select('id').limit(1);
        if (err3) console.error("Problems error:", err3.message);

        console.log("Testing audit_logs table...");
        const { data: audit, error: err4 } = await supabase.from('audit_logs').select('id').limit(1);
        if (err4) console.error("Audit_logs error:", err4.message);

        console.log("Done testing tables.");
    } catch (err) {
        console.error("Test script failed:", err);
    }
}
test();
