const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'c:/files/projects/CS studio/backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    console.log("Testing login for admin@csstudio.com");
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@csstudio.com',
        password: 'Admin123!'
    });
    
    if (error) {
        console.error("Login failed with Admin123! :", error.message);
    } else {
        console.log("Login successful with Admin123!");
    }
    
    const { data: data2, error: error2 } = await supabase.auth.signInWithPassword({
        email: 'admin@csstudio.com',
        password: 'Admin1231'
    });
    
    if (error2) {
        console.error("Login failed with Admin1231 :", error2.message);
    } else {
        console.log("Login successful with Admin1231");
    }
}

testLogin();
