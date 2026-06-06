require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const serviceClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// We need the ANON key. Usually in .env, but let's check .env file or headers
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
// Wait, backend .env might not have VITE_ prefix. Let's check frontend .env 
// But I can't read frontend .env from here easily unless I use fs. 
// I will just use the hardcoded key from the artifacts or assume the user has it.
// Actually, I can use the `headers` of the service client or just try to find the key.
// Let's first try with SERVICE key to ensure data exists.
// Then I'll try to simulate an anon request by not using the service key? No, I need the key.

// Let's assume I can read the frontend .env file.
const fs = require('fs');
const path = require('path');
const frontendEnvPath = path.join(__dirname, '../frontend/.env');
const frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');

const anonKeyMatch = frontendEnv.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
const realAnonKey = anonKeyMatch ? anonKeyMatch[1].trim() : null;

if (!realAnonKey) {
    console.error('Could not find ANON key in frontend .env');
    process.exit(1);
}

const anonClient = createClient(
    process.env.SUPABASE_URL,
    realAnonKey
);

async function testFetch() {
    console.log('Testing fetch with SERVICE KEY:');
    const { data: serviceData, error: serviceError } = await serviceClient
        .from('phases')
        .select('id, title')
        .eq('course_id', 'c-programming')
        .limit(1);

    if (serviceError) console.error('Service Error:', serviceError);
    else console.log('Service Data:', serviceData);

    console.log('\nTesting fetch with ANON KEY:');
    const { data: anonData, error: anonError } = await anonClient
        .from('phases')
        .select('id, title')
        .eq('course_id', 'c-programming')
        .limit(1);

    if (anonError) console.error('Anon Error:', anonError);
    else console.log('Anon Data:', anonData);
}

testFetch();
