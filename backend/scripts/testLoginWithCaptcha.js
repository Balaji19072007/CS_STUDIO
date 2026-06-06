const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'c:/files/projects/CS studio/backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLoginWithCaptcha() {
    console.log("Testing login with dummy captcha token");
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@csstudio.com',
        password: 'Admin123!',
        options: {
            captchaToken: 'dummy_token'
        }
    });
    
    if (error) {
        console.error("Login failed:", error.message);
    } else {
        console.log("Login successful!");
    }
}

testLoginWithCaptcha();
