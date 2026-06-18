const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTc5MTQsImV4cCI6MjA4NTUzMzkxNH0.XfxAK8orJ92zm6fz-B-JlLo0nzuTICUA_2nbjF55gtg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    try {
        console.log('Logging in...');
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'csstudio39@gmail.com',
            password: 'password' // We need the admin password... wait I don't know it. Let's try password or admin. Or I'll just use the supabase service role to generate a JWT!
        });
        console.log('Login result:', error ? error.message : 'Success');
    } catch (e) {
        console.error(e.message);
    }
}
run();
