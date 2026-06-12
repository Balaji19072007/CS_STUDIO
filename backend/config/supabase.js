require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('⚠️  Supabase URL or Service Key is missing. Check .env file.');
    console.warn('   Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.');
}

// Initialize the Supabase client with the Service Role Key
// precise auth options to persist session on backend if needed, though usually for admin tasks we don't need persistance
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

console.log('✅ Supabase Admin Client Initialized');

module.exports = { supabase };
